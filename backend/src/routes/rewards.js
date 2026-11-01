const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const Task = require('../models/Task');
const TaskSubmission = require('../models/TaskSubmission');
const UserBadge = require('../models/UserBadge');
const ArenaProgress = require('../models/ArenaProgress');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function badgeForCount(count) {
  if (count >= 10) return { id: 'seva-champion', name: 'Seva Champion', description: 'Completed 10 approved tasks.', icon: '🏆' };
  if (count >= 5) return { id: 'impact-builder', name: 'Impact Builder', description: 'Completed 5 approved tasks.', icon: '🌟' };
  if (count >= 3) return { id: 'community-helper', name: 'Community Helper', description: 'Completed 3 approved tasks.', icon: '🤝' };
  return { id: 'first-step', name: 'First Step', description: 'Completed your first approved task.', icon: '🌱' };
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
  return res.json({ progress: progressJSON(progress, badges) });
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
  if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
    return res.status(400).json({ message: 'Invalid task.' });
  }
  const task = await Task.findById(req.params.taskId);
  if (!task) return res.status(404).json({ message: 'Task not found.' });
  const existing = await TaskSubmission.findOne({ taskId: task._id, volunteerId: req.user._id });
  if (existing && existing.status === 'approved') {
    return res.status(409).json({ message: 'This task has already been approved.' });
  }
  const proof = req.body?.proof || {};
  if (typeof proof.imageUrl !== 'string' || !proof.imageUrl) {
    return res.status(400).json({ message: 'Proof image is required.' });
  }
  const submission = existing
    ? await TaskSubmission.findByIdAndUpdate(
      existing._id,
      { status: 'submitted', proof, review: { note: '' } },
      { new: true },
    )
    : await TaskSubmission.create({
      taskId: task._id,
      eventId: task.eventId,
      volunteerId: req.user._id,
      proof,
    });
  return res.status(existing ? 200 : 201).json({ submission: submission.toPublicJSON() });
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
  if (submission.status === 'approved') {
    return res.status(409).json({ message: 'This submission has already been approved.' });
  }
  submission.status = status;
  submission.review = {
    reviewedBy: req.user._id,
    reviewedAt: new Date(),
    note: typeof req.body.note === 'string' ? req.body.note.trim() : '',
  };
  if (status === 'approved') {
    const progress = await ArenaProgress.findOneAndUpdate(
      { userId: submission.volunteerId },
      { $setOnInsert: { userId: submission.volunteerId }, $inc: { totalXp: 50, approvedTasks: 1, completedTasks: 1 } },
      { new: true, upsert: true },
    );
    const nextLevel = Math.min(10, Math.floor(progress.approvedTasks / 3) + 1);
    progress.currentLevel = Math.max(progress.currentLevel, nextLevel);
    progress.unlockedLevels = Array.from({ length: progress.currentLevel }, (_, index) => index + 1);
    await progress.save();
    const badge = badgeForCount(progress.approvedTasks);
    await UserBadge.updateOne(
      { userId: submission.volunteerId, badgeId: badge.id },
      {
        $setOnInsert: {
          userId: submission.volunteerId,
          badgeId: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          taskId: submission.taskId,
          eventId: submission.eventId,
        },
      },
      { upsert: true },
    );
    submission.awardedXp = 50;
    submission.badgeId = badge.id;
  }
  await submission.save();
  return res.json({ submission: submission.toPublicJSON() });
});

module.exports = router;
