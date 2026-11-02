const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const Event = require('../models/Event');
const EventParticipation = require('../models/EventParticipation');
const Task = require('../models/Task');
const TaskSubmission = require('../models/TaskSubmission');
const User = require('../models/User');
const DonationCampaign = require('../models/DonationCampaign');

const router = Router();

// GET /api/reports/event/:eventId
router.get('/event/:eventId', requireAuth, async (req, res, next) => {
  try {
    const { eventId } = req.params;

    // Fetch event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    // Only organizer can generate report
    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the event organizer can generate a report.' });
    }

    // Fetch participations with user details
    const participations = await EventParticipation.find({ eventId })
      .populate('userId', 'name location')
      .lean();

    // Fetch tasks
    const tasks = await Task.find({ eventId }).lean();

    // Fetch submissions with volunteer info
    const submissions = await TaskSubmission.find({ eventId })
      .populate('volunteerId', 'name')
      .populate('taskId', 'title category')
      .lean();

    // Build report data
    const totalXp = submissions
      .filter((s) => s.status === 'approved')
      .reduce((acc, s) => acc + (s.awardedXp || 0), 0);

    const approved = submissions.filter((s) => s.status === 'approved').length;
    const pending = submissions.filter((s) => s.status === 'submitted').length;
    const rejected = submissions.filter((s) => s.status === 'rejected').length;

    const uniqueSkills = [
      ...new Set(
        tasks
          .map((t) => t.category)
          .filter(Boolean)
      ),
    ];

    const fillRate =
      event.capacity > 0
        ? Math.round((participations.length / event.capacity) * 100)
        : 0;

    const completionRate =
      submissions.length > 0
        ? Math.round((approved / submissions.length) * 100)
        : 0;

    // Compute event status
    const eventDate = new Date(`${event.date}T00:00:00`);
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const status =
      eventDate.getTime() < todayDate.getTime()
        ? 'Completed'
        : eventDate.getTime() === todayDate.getTime()
          ? 'Ongoing'
          : 'Upcoming';

    const report = {
      generatedAt: new Date().toISOString(),
      generatedBy: event.organizer,
      event: {
        id: event._id.toString(),
        title: event.title,
        category: event.category,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        status,
        organizer: event.organizer,
        capacity: event.capacity,
        skills: event.skills,
      },
      volunteers: {
        registered: participations.length,
        capacity: event.capacity,
        fillRate,
        list: participations.map((p) => ({
          name: p.userId?.name || 'Unknown',
          assignment: p.assignment || 'Volunteer',
          location: p.userId?.location || '—',
          joinedAt: p.createdAt,
        })),
      },
      tasks: {
        total: tasks.length,
        submissionsReceived: submissions.length,
        approved,
        pending,
        rejected,
        list: tasks.map((t) => ({
          id: t._id.toString(),
          title: t.title,
          category: t.category,
          points: t.points,
          volunteers: t.volunteers,
          status: 'Active',
        })),
      },
      proofSubmissions: submissions.map((s) => ({
        volunteerName: s.volunteerId?.name || 'Unknown',
        taskTitle: s.taskId?.title || '—',
        gps: s.proof?.coordinates || '—',
        capturedAt: s.proof?.capturedAt || '—',
        status: s.status,
      })),
      impact: {
        totalXpAwarded: totalXp,
        uniqueSkills,
        completionRate,
      },
    };

    res.json({ report });
  } catch (err) {
    next(err);
  }
});

// GET /api/reports/campaign/:campaignId
router.get('/campaign/:campaignId', requireAuth, async (req, res, next) => {
  try {
    const { campaignId } = req.params;

    // Support both MongoDB _id and custom campaignId field
    const campaign = await DonationCampaign.findOne({
      $or: [{ _id: campaignId.match(/^[a-f\d]{24}$/i) ? campaignId : null }, { campaignId }],
    });

    if (!campaign) return res.status(404).json({ message: 'Campaign not found.' });

    // Check organizer
    if (
      campaign.organizerId &&
      campaign.organizerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Only the campaign organizer can generate a report.' });
    }

    const totalSpent = campaign.expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
    const budgetUtilization =
      campaign.targetAmount > 0
        ? Math.round((totalSpent / campaign.targetAmount) * 100)
        : 0;

    const fundingProgress =
      campaign.targetAmount > 0
        ? Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)
        : 0;

    const report = {
      generatedAt: new Date().toISOString(),
      campaign: {
        title: campaign.title,
        category: campaign.category,
        campaignId: campaign.campaignId,
        organizer: campaign.organizer,
        location: campaign.location,
        status: campaign.status,
        currentStage: campaign.currentStage,
        description: campaign.description,
        beneficiaryGroup: campaign.beneficiaryGroup,
      },
      financial: {
        targetAmount: campaign.targetAmount,
        raisedAmount: campaign.raisedAmount,
        targetUnits: campaign.targetUnits,
        raisedUnits: campaign.raisedUnits,
        unitCost: campaign.unitCost,
        donationItem: campaign.donationItem,
        fundingProgress,
      },
      donors: {
        total: campaign.donors.length,
        list: campaign.donors.map((d) => ({
          donorName: d.donorName,
          units: d.units,
          amount: d.amount,
          ticketId: d.ticketId,
          timestamp: d.timestamp,
        })),
      },
      expenses: {
        totalSpent,
        budgetUtilization,
        list: campaign.expenses.map((e) => ({
          item: e.item,
          vendor: e.vendor,
          amount: e.amount,
          date: e.date,
        })),
      },
      stages: campaign.stages.map((s) => ({
        stage: s.stage,
        title: s.title,
        status: s.completed ? 'Completed' : 'Pending',
        gps: s.geoTag?.coordinates || '—',
        location: s.geoTag?.location || '—',
        date: s.timestamp,
        photoUrl: s.photoUrl,
        notes: s.description,
      })),
      impact: {
        unitsDistributed: campaign.raisedUnits,
        targetUnits: campaign.targetUnits,
        netRaised: campaign.raisedAmount,
        totalSpent,
        beneficiariesTargeted: campaign.beneficiaryGroup,
      },
    };

    res.json({ report });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

