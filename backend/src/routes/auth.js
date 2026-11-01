const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { requireAuth, signToken } = require('../middleware/auth');

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeInterests(value) {
  if (!Array.isArray(value)) return undefined;
  return [
    ...new Set(
      value
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ].slice(0, 12);
}

router.post('/register', async (req, res) => {
  const { name, email, password, location, bio, interests } = req.body || {};
  const normalizedEmail = normalizeEmail(email);

  if (!String(name || '').trim()) {
    return res.status(400).json({ message: 'Please enter your full name.' });
  }

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    return res
      .status(400)
      .json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
  }

  const existingUser = await User.exists({ email: normalizedEmail });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: 'An account with this email already exists. Try signing in.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash,
    location: typeof location === 'string' ? location.trim() : '',
    bio: typeof bio === 'string' ? bio.trim() : '',
    interests: normalizeInterests(interests) ?? [],
  });

  return res.status(201).json({ token: signToken(user), user: user.toPublicJSON() });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = normalizeEmail(email);

  if (!EMAIL_PATTERN.test(normalizedEmail) || typeof password !== 'string' || !password) {
    return res.status(400).json({ message: 'Enter your email and password to sign in.' });
  }

  const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');
  const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !passwordMatches) {
    return res.status(401).json({ message: 'Incorrect email or password.' });
  }

  return res.json({ token: signToken(user), user: user.toPublicJSON() });
});

router.get('/me', requireAuth, (req, res) => {
  return res.json({ user: req.user.toPublicJSON() });
});

module.exports = router;
