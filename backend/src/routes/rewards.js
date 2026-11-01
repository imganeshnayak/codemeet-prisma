const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const Task = require('../models/Task');
const TaskSubmission = require('../models/TaskSubmission');
const UserBadge = require('../models/UserBadge');
const ArenaProgress = require('../models/ArenaProgress');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function badgeForCount(count) {
  if (count >= 10) return { id: 'seva-champion', name: 'Seva Champion', description: 'Completed 10 approved tasks.', icon: '🏆' };
  if (count >= 5) return { id: 'impact-builder', name: 'Impact Builder', description: 'Completed 5 approved tasks.', icon: '🌟' };
  if (count >= 3) return { id: 'community-helper', name: 'Community Helper', description: 'Completed 3 approved tasks.', icon: '🤝' };
  return { id: 'first-step', name: 'First Step', description: 'Completed your first approved task.', icon: '🌱' };
}

function unlockedLevelsForXp(totalXp) {
  return Array.from({ length: Math.min(6, Math.floor(totalXp / 50) + 1) }, (_, index) => index + 1);
}

function progressJSON(progress, badges) {
  return {
    totalXp: progress.totalXp,
    completedTasks: progress.completedTasks,
    approvedTasks: progress.approvedTasks,
    currentLevel: progress.currentLevel,
    unlockedLevels: progress.unlockedLevels,
    badges: badges.map((badge) => ({
      id: badge.badgeId,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      awardedAt: badge.awardedAt,
    })),
  };
}

router.get('/progress', async (req, res) => {
  const progress = await ArenaProgress.findOneAndUpdate(
    { userId: req.user._id },
    { $setOnInsert: { userId: req.user._id } },
    { new: true, upsert: true },
  );
  const badges = await UserBadge.find({ userId: req.user._id }).sort({ awardedAt: -1 });
  const unlockedLevels = unlockedLevelsForXp(progress.totalXp);
  progress.unlockedLevels = unlockedLevels;
  progress.currentLevel = unlockedLevels[unlockedLevels.length - 1];
  await progress.save();
  return res.json({ progress: progressJSON(progress, badges) });
});

router.get('/leaderboard', async (req, res) => {
  const entries = await ArenaProgress.find({ totalXp: { $gt: 0 } })
    .sort({ totalXp: -1, updatedAt: 1 })
    .limit(10)
    .populate('userId', 'name');

  const leaderboard = entries.map((entry, index) => ({
    rank: index + 1,
    userId: entry.userId ? entry.userId._id.toString() : '',
    name: entry.userId ? entry.userId.name : 'Volunteer',
    totalXp: entry.totalXp,
    level: entry.currentLevel,
  }));

  const mine = await ArenaProgress.findOne({ userId: req.user._id });
  let me = null;
  if (mine) {
    const ahead = await ArenaProgress.countDocuments({
      totalXp: { $gt: mine.totalXp },
    });
    me = {
      userId: req.user._id.toString(),
      rank: ahead + 1,
      name: req.user.name,
      totalXp: mine.totalXp,
      level: mine.currentLevel,
    };
  }

  return res.json({ leaderboard, me });
});

router.get('/leaderboard/:userId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).json({ message: 'Invalid volunteer.' });
  }
  const user = await User.findById(req.params.userId).select('name');
  if (!user) {
    return res.status(404).json({ message: 'Volunteer not found.' });
  }
  const progress = await ArenaProgress.findOne({ userId: user._id });
  const badges = await UserBadge.find({ userId: user._id }).sort({ awardedAt: -1 });
  return res.json({
    volunteer: {
      id: user._id.toString(),
      name: user.name,
      totalXp: progress ? progress.totalXp : 0,
      currentLevel: progress ? progress.currentLevel : 1,
      approvedTasks: progress ? progress.approvedTasks : 0,
      badges: badges.map((badge) => ({
        id: badge.badgeId,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        awardedAt: badge.awardedAt,
      })),
    },
  });
});

router.get('/approved', async (req, res) => {
  try {
    const eventId = typeof req.query.eventId === 'string'
      ? req.query.eventId.trim()
      : '';
    const articleId = typeof req.query.articleId === 'string'
      ? req.query.articleId.trim()
      : '';
    const eventTitle = typeof req.query.eventTitle === 'string'
      ? req.query.eventTitle.trim()
      : '';
    if (articleId && mongoose.Types.ObjectId.isValid(articleId)) {
      const submissions = await TaskSubmission.find({
        articleId,
        status: { $in: ['submitted', 'approved'] },
      }).populate('volunteerId', 'name').sort({ updatedAt: -1 }).exec();
      return res.json({
        proofs: submissions.map((submission) => ({
          ...submission.toPublicJSON(),
          volunteerName: submission.volunteerId?.name || 'Volunteer',
        })),
      });
    }
    if (!eventId && !eventTitle) {
      return res.status(400).json({ message: 'Event ID or title is required.' });
    }

    const event = eventId && mongoose.Types.ObjectId.isValid(eventId)
      ? await Event.findById(eventId).select('_id').exec()
      : await Event.findOne({ title: eventTitle }).select('_id').exec();
    if (!event) return res.json({ proofs: [] });

    const submissions = await TaskSubmission.find({
      eventId: event._id,
      articleId: { $exists: false },
      status: { $in: ['submitted', 'approved'] },
    })
      .populate('volunteerId', 'name')
      .sort({ updatedAt: -1 })
      .exec();

    return res.json({
      proofs: submissions.map((submission) => ({
        ...submission.toPublicJSON(),
        volunteerName: submission.volunteerId?.name || 'Volunteer',
      })),
    });
  } catch (error) {
    console.error('Failed to list approved proofs:', error);
    return res.status(500).json({ message: 'Failed to load approved proofs.' });
  }
});

router.get('/submissions', async (req, res) => {
  const query = {};
  if (req.query.eventId && mongoose.Types.ObjectId.isValid(req.query.eventId)) {
    const event = await Event.findOne({ _id: req.query.eventId, organizerId: req.user._id });
    if (!event) return res.status(403).json({ message: 'Only the event organizer can view submissions.' });
    query.eventId = event._id;
  } else {
    query.volunteerId = req.user._id;
  }
  const submissions = await TaskSubmission.find(query).sort({ createdAt: -1 });
  return res.json({ submissions: submissions.map((submission) => submission.toPublicJSON()) });
});

router.post('/tasks/:taskId/submit', async (req, res) => {
  try {
    let task = null;
    if (mongoose.Types.ObjectId.isValid(req.params.taskId)) {
      task = await Task.findById(req.params.taskId);
      if (!task) {
        // Check if taskId was actually an eventId
        const event = await Event.findById(req.params.taskId);
        if (event) {
          task = await Task.findOne({ eventId: event._id });
          if (!task) {
            task = await Task.create({
              eventId: event._id,
              creatorId: event.organizerId,
              title: `${event.title} - Field Proof`,
              description: `Geo-tagged field proof submission for ${event.title}`,
              category: event.category || 'Community',
              location: event.location,
              date: event.date,
              time: event.time,
              points: '50',
            });
          }
        }
      }
    }

    if (!task) {
      task = await Task.findOne().sort({ createdAt: -1 });
    }

    if (!task) {
      let ev = await Event.findOne().sort({ createdAt: -1 });
      if (!ev) {
        ev = await Event.create({
          organizerId: req.user._id,
          organizer: req.user.name,
          title: 'Community Action Drive',
          description: 'General community volunteer verification',
          category: 'Community',
          date: new Date().toISOString().slice(0, 10),
          time: '10:00 AM - 1:00 PM',
          location: 'Mangaluru, Karnataka',
          capacity: 25,
          image: '/assets/task-tree.jpg',
        });
      }
      task = await Task.create({
        eventId: ev._id,
        creatorId: ev.organizerId,
        title: `${ev.title} - Geo Verification`,
        description: 'Volunteer Geo-Tag Proof Verification',
        category: ev.category,
        location: ev.location,
        date: ev.date,
        time: ev.time,
        points: '50',
      });
    }

    const proof = req.body?.proof || {};
    const articleId = mongoose.Types.ObjectId.isValid(req.body?.articleId)
      ? req.body.articleId
      : undefined;
    if (typeof proof.imageUrl !== 'string' || !proof.imageUrl) {
      return res.status(400).json({ message: 'Proof image is required.' });
    }

    const existing = await TaskSubmission.findOne({ taskId: task._id, volunteerId: req.user._id });
    if (existing && existing.status === 'approved') {
      return res.status(409).json({ message: 'This task has already been approved.' });
    }

    const submission = existing
      ? await TaskSubmission.findByIdAndUpdate(
        existing._id,
        { status: 'submitted', proof, review: { note: '' }, articleId },
        { new: true },
      )
      : await TaskSubmission.create({
        taskId: task._id,
        eventId: task.eventId,
        volunteerId: req.user._id,
        articleId,
        proof,
      });

    return res.status(existing ? 200 : 201).json({ submission: submission.toPublicJSON() });
  } catch (err) {
    console.error('Failed to submit proof:', err);
    return res.status(500).json({ message: 'Failed to submit proof. Please try again.' });
  }
});

router.post('/submissions/:submissionId/review', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.submissionId)) {
    return res.status(400).json({ message: 'Invalid submission.' });
  }
  const submission = await TaskSubmission.findById(req.params.submissionId);
  if (!submission) return res.status(404).json({ message: 'Submission not found.' });
  const event = await Event.findOne({ _id: submission.eventId, organizerId: req.user._id });
  if (!event) return res.status(403).json({ message: 'Only the event organizer can review this proof.' });
  const status = ['approved', 'rejected', 'resubmission_requested'].includes(req.body?.status)
    ? req.body.status
    : null;
  if (!status) return res.status(400).json({ message: 'Invalid review status.' });

  submission.status = status;
  submission.review = {
    reviewedBy: req.user._id,
    reviewedAt: new Date(),
    note: typeof req.body?.note === 'string' ? req.body.note.trim() : '',
  };

  if (status === 'approved') {
    submission.awardedXp = 50;
    const progress = await ArenaProgress.findOneAndUpdate(
      { userId: submission.volunteerId },
      {
        $inc: { totalXp: 50, completedTasks: 1, approvedTasks: 1 },
        $setOnInsert: { userId: submission.volunteerId },
      },
      { new: true, upsert: true },
    );
    const badge = badgeForCount(progress.approvedTasks);
    submission.badgeId = badge.id;
    await UserBadge.findOneAndUpdate(
      { userId: submission.volunteerId, badgeId: badge.id },
      { $setOnInsert: { userId: submission.volunteerId, badgeId: badge.id, name: badge.name, description: badge.description, icon: badge.icon, awardedAt: new Date() } },
      { upsert: true },
    );
    progress.unlockedLevels = unlockedLevelsForXp(progress.totalXp);
    progress.currentLevel = progress.unlockedLevels[progress.unlockedLevels.length - 1];
    await progress.save();
  }

  await submission.save();
  return res.json({ submission: submission.toPublicJSON() });
});

module.exports = router;
