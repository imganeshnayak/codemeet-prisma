const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const Task = require('../models/Task');
const EventParticipation = require('../models/EventParticipation');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

router.get('/feed', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }).limit(100).exec();
    return res.json({ tasks: tasks.map((task) => task.toPublicJSON()) });
  } catch (err) {
    console.error('Failed to get tasks feed:', err);
    return res.status(500).json({ message: 'Failed to get tasks feed.' });
  }
});

router.post('/:id/join', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    if (task.creatorId.equals(req.user._id)) {
      return res.status(400).json({ message: 'You cannot join your own task.' });
    }

    const event = await Event.findById(task.eventId);
    if (!event) return res.status(404).json({ message: 'The event for this task was not found.' });
    if (event.organizerId.equals(req.user._id)) {
      return res.status(400).json({ message: 'Organizers cannot join their own event.' });
    }

    const existing = await EventParticipation.exists({
      eventId: event._id,
      userId: req.user._id,
    });
    if (existing) return res.status(409).json({ message: 'You have already joined this event.' });
    if (event.volunteers >= event.capacity) {
      return res.status(409).json({ message: 'This event has reached its volunteer capacity.' });
    }

    await EventParticipation.create({
      eventId: event._id,
      userId: req.user._id,
      assignment: task.title,
    });
    event.volunteers += 1;
    await event.save();

    return res.status(201).json({ event: event.toPublicJSON('attending', task.title) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'You have already joined this event.' });
    }
    console.error('Failed to join task:', error);
    return res.status(500).json({ message: 'Failed to join task.' });
  }
});

router.get('/mine', async (req, res) => {
  try {
    const tasks = await Task.find({ creatorId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100)
      .exec();
    return res.json({ tasks: tasks.map((task) => task.toPublicJSON()) });
  } catch (error) {
    console.error('Failed to get user tasks:', error);
    return res.status(500).json({ message: 'Failed to get your tasks.' });
  }
});

router.get('/event/:eventId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
      return res.status(400).json({ message: 'Invalid event.' });
    }
    const event = await Event.findOne({
      _id: req.params.eventId,
      organizerId: req.user._id,
    });
    if (!event) return res.status(404).json({ message: 'Event not found or access denied.' });
    const tasks = await Task.find({ eventId: event._id }).sort({ createdAt: -1 }).exec();
    return res.json({ tasks: tasks.map((task) => task.toPublicJSON()) });
  } catch (error) {
    console.error('Failed to list event tasks:', error);
    return res.status(500).json({ message: 'Failed to fetch event tasks.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    let event = null;
    if (body.eventId && mongoose.Types.ObjectId.isValid(body.eventId)) {
      event = await Event.findById(body.eventId);
      if (event && !event.organizerId.equals(req.user._id)) {
        return res.status(403).json({ message: 'Only the event organizer can assign tasks.' });
      }
    }

    const task = await Task.create({
      eventId: event ? event._id : new mongoose.Types.ObjectId(),
      creatorId: req.user._id,
      title: typeof body.title === 'string' ? body.title.trim() : 'Community Task',
      description: typeof body.description === 'string' ? body.description.trim() : '',
      category: typeof body.category === 'string' && body.category.trim() ? body.category.trim() : (event ? event.category : 'Community'),
      location: event ? event.location : (typeof body.location === 'string' ? body.location : 'Mangaluru, Karnataka'),
      date: event ? event.date : new Date().toISOString().slice(0, 10),
      time: event ? event.time : '10:00 AM - 1:00 PM',
      volunteers: Number.isInteger(Number(body.volunteers)) ? Number(body.volunteers) : 10,
      points: typeof body.points === 'string' && body.points.trim() ? body.points.trim() : '50',
      image: typeof body.image === 'string' && body.image ? body.image : (event ? event.image : '/assets/task-tree.jpg'),
    });

    if (event) {
      event.tasks = (event.tasks || 0) + 1;
      await event.save();
    }

    return res.status(201).json({ task: task.toPublicJSON() });
  } catch (err) {
    console.error('Failed to post task:', err);
    return res.status(500).json({ message: 'Failed to post task.' });
  }
});

module.exports = router;
