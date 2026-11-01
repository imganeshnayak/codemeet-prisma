const express = require('express');
const Event = require('../models/Event');
const { requireAuth } = require('../middleware/auth');

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

router.use(requireAuth);

router.get('/mine', async (req, res) => {
  const events = await Event.find({ organizerId: req.user._id })
    .sort({ createdAt: -1 })
    .exec();

  return res.json({ events: events.map((event) => event.toPublicJSON()) });
});

router.post('/', async (req, res) => {
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
});

module.exports = router;
