const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const memoriesRoutes = require('./routes/memories');
const eventRoutes = require('./routes/events');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/memories', memoriesRoutes);
app.use('/api/events', eventRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

app.use((error, req, res, next) => {
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
