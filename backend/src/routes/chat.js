const express = require('express');
const Event = require('../models/Event');
const EventParticipation = require('../models/EventParticipation');
const ChatMessage = require('../models/ChatMessage');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

async function getEventOr404(req, res) {
  const event = await Event.findById(req.params.eventId).select('organizerId');
  if (!event) {
    res.status(404).json({ message: 'Event not found.' });
    return null;
  }
  return event;
}

async function getMembership(event, userId) {
  const [participation] = await Promise.all([
    EventParticipation.exists({ eventId: event._id, userId }),
    EventParticipation.countDocuments({ eventId: event._id, userId }),
  ]);
  return Boolean(participation) || event.organizerId.equals(userId);
}

router.get('/:eventId', requireAuth, async (req, res) => {
  const event = await getEventOr404(req, res);
  if (!event) return;

  const isMember =
    event.organizerId.equals(req.user._id) ||
    (await EventParticipation.exists({ eventId: event._id, userId: req.user._id }));

  if (!isMember) {
    return res
      .status(403)
      .json({ message: 'Join this event to see the community chat.' });
  }

  const messages = await ChatMessage.find({ eventId: event._id })
    .sort({ createdAt: 1 })
    .limit(200);

  return res.json({ messages: messages.map((m) => m.toPublicJSON(req.user._id)) });
});

router.post('/:eventId', requireAuth, async (req, res) => {
  const event = await getEventOr404(req, res);
  if (!event) return;

  const isMember =
    event.organizerId.equals(req.user._id) ||
    (await EventParticipation.exists({ eventId: event._id, userId: req.user._id }));

  if (!isMember) {
    return res
      .status(403)
      .json({ message: 'Join this event to chat with the community.' });
  }

  const text = String(req.body?.text ?? '').trim();
  if (!text) {
    return res.status(400).json({ message: 'Message cannot be empty.' });
  }

  const chatMessage = await ChatMessage.create({
    eventId: event._id,
    authorId: req.user._id,
    authorName: req.user.name,
    text,
  });

  return res.status(201).json({ message: chatMessage.toPublicJSON(req.user._id) });
});

module.exports = router;
