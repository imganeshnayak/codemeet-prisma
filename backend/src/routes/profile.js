const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');
const {
  destroyImage,
  isCloudinaryConfigured,
  uploadImageBuffer,
} = require('../lib/cloudinary');

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PHOTO_BYTES },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_PHOTO_TYPES.has(file.mimetype)) {
      const error = new Error('Choose a JPG, PNG, or WebP image.');
      error.status = 400;
      return cb(error);
    }
    return cb(null, true);
  },
});

function requireCloudinary(req, res, next) {
  if (!isCloudinaryConfigured) {
    return res.status(503).json({
      message:
        'Cloudinary is not configured. Please add your real Cloudinary credentials to backend/.env file.',
    });
  }
  return next();
}

function handlePhotoUpload(req, res, next) {
  upload.single('photo')(req, res, (error) => {
    if (!error) return next();

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Photo must be 5 MB or smaller.' });
    }

    return res
      .status(error.status || 400)
      .json({ message: error.message || 'Could not upload the photo.' });
  });
}

function normalizeInterests(value) {
  return [
    ...new Set(
      value
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ].slice(0, 12);
}

router.get('/', requireAuth, (req, res) => {
  return res.json({ user: req.user.toPublicJSON() });
});

router.patch('/', requireAuth, async (req, res) => {
  const { name, email, location, bio, interests } = req.body || {};
  const user = req.user;

  if (name !== undefined) {
    const trimmedName = String(name).trim();
    if (!trimmedName) {
      return res.status(400).json({ message: 'Name cannot be empty.' });
    }
    user.name = trimmedName;
  }

  if (email !== undefined) {
    const normalizedEmail = String(email).trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (normalizedEmail !== user.email) {
      const taken = await User.exists({ email: normalizedEmail, _id: { $ne: user._id } });
      if (taken) {
        return res
          .status(409)
          .json({ message: 'That email is already used by another account.' });
      }
    }

    user.email = normalizedEmail;
  }

  if (location !== undefined) {
    user.location = String(location).trim();
  }

  if (bio !== undefined) {
    user.bio = String(bio).trim();
  }

  if (interests !== undefined) {
    if (!Array.isArray(interests)) {
      return res.status(400).json({ message: 'Interests must be a list.' });
    }
    user.interests = normalizeInterests(interests);
  }

  await user.save();
  return res.json({ user: user.toPublicJSON() });
});

router.post('/photo', requireAuth, requireCloudinary, handlePhotoUpload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Choose an image to upload.' });
  }

  const user = req.user;
  let uploaded;

  try {
    uploaded = await uploadImageBuffer(req.file.buffer);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    const detail = error?.message ? `: ${error.message}` : '.';
    return res
      .status(502)
      .json({ message: `Could not upload photo to Cloudinary${detail}` });
  }

  const previousPublicId = user.photoPublicId;

  try {
    user.photoUrl = uploaded.secure_url;
    user.photoPublicId = uploaded.public_id;
    await user.save();
  } catch (error) {
    await destroyImage(uploaded.public_id).catch(() => {});
    throw error;
  }

  if (previousPublicId && previousPublicId !== uploaded.public_id) {
    destroyImage(previousPublicId).catch((error) => {
      console.error('Could not delete previous profile photo:', error);
    });
  }

  return res.json({ user: user.toPublicJSON() });
});

router.delete('/photo', requireAuth, async (req, res) => {
  const user = req.user;
  const publicId = user.photoPublicId;

  user.photoUrl = '';
  user.photoPublicId = '';
  await user.save();

  if (publicId) {
    destroyImage(publicId).catch((error) => {
      console.error('Could not delete profile photo:', error);
    });
  }

  return res.json({ user: user.toPublicJSON() });
});

module.exports = router;
