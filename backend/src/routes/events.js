const express = require('express');
const Event = require('../models/Event');
const EventParticipation = require('../models/EventParticipation');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

function readEventInput(body = {}) {
  return {
    title: typeof body.title === 'string' ? body.title.trim() : '',
    description: typeof body.description === 'string' ? body.description.trim() : '',
    category: typeof body.category === 'string' ? body.category.trim() : '',
    date: typeof body.date === 'string' ? body.date : '',
    time: typeof body.time === 'string' ? body.time.trim() : '',
    location: typeof body.location === 'string' ? body.location.trim() : '',
    capacity: Number(body.capacity),
    skills: typeof body.skills === 'string' ? body.skills.trim() : '',
    image: typeof body.image === 'string' ? body.image : '',
  };
}

function parseTimeRange(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const parts = timeStr.split(/\s*(?:–|—|-|to)\s*/i);
  function parseSingleTime(str) {
    if (!str) return null;
    const clean = str.trim().toUpperCase();
    const isPM = clean.includes('PM');
    const isAM = clean.includes('AM');
    const match = clean.match(/(\d{1,2})(?::(\d{2}))?/);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }
  const start = parseSingleTime(parts[0]);
  if (start === null) return null;
  const end = parts.length > 1 && parseSingleTime(parts[1]) !== null
    ? parseSingleTime(parts[1])
    : start + 120;
  return { start, end: end < start ? end + 1440 : end };
}

function doSchedulesClash(date1, time1, date2, time2) {
  if (!date1 || !date2) return false;
  const d1 = String(date1).slice(0, 10);
  const d2 = String(date2).slice(0, 10);
  if (d1 !== d2) return false;

  const r1 = parseTimeRange(time1);
  const r2 = parseTimeRange(time2);
  if (!r1 || !r2) {
    return String(time1).trim().toLowerCase() === String(time2).trim().toLowerCase();
  }
  return r1.start < r2.end && r2.start < r1.end;
}

// GET /api/events - List ALL events/tasks from all users for discovery & swipe tasks (Public / Optional Auth)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const allEvents = await Event.find().sort({ createdAt: -1 }).exec();
    const userId = req.user ? req.user._id : null;

    let participations = [];
    if (userId) {
      participations = await EventParticipation.find({ userId })
        .select('eventId assignment')
        .exec();
    }
    const participationMap = new Map(
      participations.map((p) => [p.eventId?.toString(), p.assignment || 'Volunteer'])
    );

    const events = allEvents.map((event) => {
      const isOrganizer = userId && event.organizerId && event.organizerId.equals(userId);
      const assignment = participationMap.get(event._id.toString());
      const role = isOrganizer ? 'organizing' : assignment ? 'attending' : 'explore';
      return event.toPublicJSON(role, assignment);
    });

    return res.json({ events });
  } catch (err) {
    console.error('Failed to list public events:', err);
    return res.status(500).json({ message: 'Failed to fetch community events.' });
  }
});

router.use(requireAuth);

// GET /api/events/mine - List only current user's organized or joined events
router.get('/mine', async (req, res) => {
  try {
    const organizedEvents = await Event.find({ organizerId: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    const participations = await EventParticipation.find({ userId: req.user._id })
      .populate('eventId')
      .sort({ createdAt: -1 })
      .exec();

    const organizedIds = new Set(organizedEvents.map((event) => event._id.toString()));
    const events = [
      ...organizedEvents.map((event) => event.toPublicJSON('organizing')),
      ...participations
        .filter(
          (participation) =>
            participation.eventId &&
            !organizedIds.has(participation.eventId._id.toString()),
        )
        .map((participation) =>
          participation.eventId.toPublicJSON('attending', participation.assignment),
        ),
    ];

    return res.json({ events });
  } catch (err) {
    console.error('Failed to list user events:', err);
    return res.status(500).json({ message: 'Failed to fetch your events.' });
  }
});

// GET /api/events/:id/volunteers - List volunteers for organizers and joined volunteers
router.get('/:id/volunteers', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const isOrganizer = event.organizerId.equals(req.user._id);
    const isVolunteer = await EventParticipation.exists({
      eventId: event._id,
      userId: req.user._id,
    });
    if (!isOrganizer && !isVolunteer) {
      return res.status(403).json({ message: 'Join this event to view its volunteers.' });
    }

    const participations = await EventParticipation.find({ eventId: event._id })
      .populate('userId', 'name photoUrl location')
      .sort({ createdAt: 1 })
      .exec();

    return res.json({
      volunteers: participations
        .filter((participation) => participation.userId)
        .map((participation) => ({
          id: participation.userId._id.toString(),
          name: participation.userId.name,
          photoUrl: participation.userId.photoUrl || '',
          location: participation.userId.location || '',
          assignment: participation.assignment || 'Volunteer',
          joinedAt: participation.createdAt,
        })),
    });
  } catch (err) {
    console.error('Failed to list event volunteers:', err);
    return res.status(500).json({ message: 'Failed to fetch event volunteers.' });
  }
});

// POST /api/events - Create a new volunteer event
router.post('/', async (req, res) => {
  try {
    const input = readEventInput(req.body);

    if (!Number.isInteger(input.capacity) || input.capacity < 1) {
      return res.status(400).json({ message: 'Volunteer capacity must be a whole number of at least 1.' });
    }

    const event = await Event.create({
      ...input,
      organizerId: req.user._id,
      organizer: req.user.name,
    });

    return res.status(201).json({ event: event.toPublicJSON() });
  } catch (err) {
    console.error('Failed to create event:', err);
    return res.status(500).json({ message: 'Failed to create event.' });
  }
});

// POST /api/events/:id/join - Join an event as a volunteer with strict clash prevention
router.post('/:id/join', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    // 1. Organizers cannot join their own event
    if (event.organizerId.equals(req.user._id)) {
      return res.status(400).json({ message: 'Organizers cannot join their own event.' });
    }

    // 2. Prevent duplicate joining
    const existingParticipation = await EventParticipation.exists({
      eventId: event._id,
      userId: req.user._id,
    });
    if (existingParticipation) {
      return res.status(409).json({ message: 'You have already joined this event.' });
    }

    // 3. Capacity limit check
    if (event.volunteers >= event.capacity) {
      return res.status(409).json({ message: 'This event has reached its volunteer capacity.' });
    }

    // 4. Schedule clash check against existing joined events
    const userParticipations = await EventParticipation.find({ userId: req.user._id })
      .populate('eventId')
      .exec();

    for (const part of userParticipations) {
      if (
        part.eventId &&
        doSchedulesClash(event.date, event.time, part.eventId.date, part.eventId.time)
      ) {
        return res.status(409).json({
          message: `Schedule Clash: You are already committed to "${part.eventId.title}" on ${part.eventId.date} (${part.eventId.time}). A volunteer cannot join multiple events at the same date and time.`,
        });
      }
    }

    // 5. Schedule clash check against events the user organizes
    const userOrganized = await Event.find({ organizerId: req.user._id }).exec();
    for (const orgEvent of userOrganized) {
      if (doSchedulesClash(event.date, event.time, orgEvent.date, orgEvent.time)) {
        return res.status(409).json({
          message: `Schedule Clash: You are hosting "${orgEvent.title}" on ${orgEvent.date} (${orgEvent.time}). You cannot join another event that conflicts with your schedule.`,
        });
      }
    }

    // Create participation record
    const participation = await EventParticipation.create({
      eventId: event._id,
      userId: req.user._id,
      assignment: 'Volunteer',
    });
    event.volunteers += 1;
    await event.save();

    return res.status(201).json({
      event: event.toPublicJSON('attending', participation.assignment),
    });
  } catch (err) {
    console.error('Failed to join event:', err);
    return res.status(500).json({ message: 'Failed to join event.' });
  }
});

module.exports = router;
