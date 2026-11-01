const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const memoriesRoutes = require('./routes/memories');
const eventRoutes = require('./routes/events');
const articleRoutes = require('./routes/articles');
const donationRoutes = require('./routes/donations');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
// Event and article images are currently sent as base64 JSON after the
// frontend's 5 MB file validation.
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/memories', memoriesRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      message: 'Request is too large. Choose an image smaller than 5 MB.',
    });
  }

  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors)[0]?.message || 'Invalid input.';
    return res.status(400).json({ message });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'That email is already registered.' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

module.exports = app;
