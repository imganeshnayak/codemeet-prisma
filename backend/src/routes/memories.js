const express = require('express');
const multer = require('multer');
const Memory = require('../models/Memory');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const {
  destroyImage,
  isCloudinaryConfigured,
  uploadImageBuffer,
} = require('../lib/cloudinary');

const router = express.Router();

const MAX_FILE_BYTES = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/webm',
  'video/quicktime',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_BYTES },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      const error = new Error('Choose a JPG, PNG, WebP image or MP4/WebM/MOV video.');
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

function handleUpload(req, res, next) {
  upload.single('file')(req, res, (error) => {
    if (!error) return next();
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File must be 25 MB or smaller.' });
    }
    return res
      .status(error.status || 400)
      .json({ message: error.message || 'Could not upload the file.' });
  });
}

function uploadBuffer(buffer, mimetype, label) {
  const { v2: cloudinary } = require('cloudinary');
  const resourceType = mimetype.startsWith('video/') ? 'video' : 'image';
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'sevasathi/memories',
        resource_type: resourceType,
        ...(resourceType === 'image'
          ? { transformation: [{ quality: 'auto', fetch_format: 'auto' }] }
          : {}),
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload failed.'));
        }
        return resolve(result);
      },
    );
    stream.end(buffer);
  });
}

router.get('/', optionalAuth, async (req, res) => {
  const memories = await Memory.find().sort({ createdAt: -1 }).limit(60);
  const currentUserId = req.user ? req.user._id.toString() : null;
  return res.json({
    memories: memories.map((m) => ({
      ...m.toPublicJSON(),
      liked: currentUserId ? m.likes.some((id) => id.toString() === currentUserId) : false,
    })),
  });
});

router.post('/', requireAuth, requireCloudinary, handleUpload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Choose a file to upload.' });
  }

  const label = String(req.body?.label || req.file.originalname.replace(/\.[^.]+$/, '')).trim() || 'Memory';

  let uploaded;
  try {
    uploaded = await uploadBuffer(req.file.buffer, req.file.mimetype, label);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    const detail = error?.message ? `: ${error.message}` : '.';
    return res.status(502).json({ message: `Could not upload memory to Cloudinary${detail}` });
  }

  const memory = await Memory.create({
    label,
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
    uploader: req.user._id,
  });

  return res.status(201).json({ memory: memory.toPublicJSON() });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const memory = await Memory.findById(req.params.id);
  if (!memory) {
    return res.status(404).json({ message: 'Memory not found.' });
  }
  if (memory.uploader.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only delete your own memories.' });
  }
  await Memory.deleteOne({ _id: memory._id });
  destroyImage(memory.publicId).catch((error) => {
    console.error('Could not delete memory from Cloudinary:', error);
  });
  return res.json({ success: true });
});

router.post('/:id/like', requireAuth, async (req, res) => {
  const memory = await Memory.findById(req.params.id);
  if (!memory) {
    return res.status(404).json({ message: 'Memory not found.' });
  }

  const userId = req.user._id.toString();
  const index = memory.likes.findIndex((id) => id.toString() === userId);
  const liked = index < 0;

  if (liked) {
    memory.likes.push(req.user._id);
  } else {
    memory.likes.splice(index, 1);
  }

  await memory.save();

  return res.json({
    memory: {
      ...memory.toPublicJSON(),
      liked,
    },
  });
});

module.exports = router;
