const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const Task = require('../models/Task');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/feed', optionalAuth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }).limit(100).exec();
    return res.json({ tasks: tasks.map((task) => task.toPublicJSON()) });
  } catch (err) {
    console.error('Failed to get tasks feed:', err);
    return res.status(500).json({ message: 'Failed to get tasks feed.' });
  }
});

router.use(requireAuth);

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    let event = null;
    if (body.eventId && mongoose.Types.ObjectId.isValid(body.eventId)) {
      event = await Event.findById(body.eventId);
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
