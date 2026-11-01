const express = require('express');
const Article = require('../models/Article');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/articles - List all real articles from DB
router.get('/', async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }).exec();
    return res.json({ articles: articles.map((a) => a.toPublicJSON()) });
  } catch (error) {
    return next(error);
  }
});

// GET /api/articles/:id - Get single article
router.get('/:id', async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    return res.json({ article: article.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// POST /api/articles - Create a new article
router.post('/', optionalAuth, async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.title || !b.title.trim()) {
      return res.status(400).json({ message: 'Title is required.' });
    }
    if (!b.description || !b.description.trim()) {
      return res.status(400).json({ message: 'Summary description is required.' });
    }
    if (!b.image || !b.image.trim()) {
      return res.status(400).json({ message: 'Cover image is required.' });
    }

    const organizerData = b.organizer || {};
    const authorName = req.user?.name || organizerData.name || 'Community Volunteer';
    const authorAvatar =
      organizerData.avatar ||
      authorName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) ||
      'VO';

    const article = await Article.create({
      title: b.title.trim(),
      alt: b.alt?.trim() || b.title.trim(),
      category: b.category?.trim() || 'Community Action',
      image: b.image,
      meta: b.meta?.trim() || 'Just now',
      description: b.description.trim(),
      readTime: b.readTime || '3 min read',
      quote: b.quote?.trim() || '',
      content: Array.isArray(b.content) && b.content.length > 0 ? b.content : [b.description.trim()],
      organizer: {
        name: authorName,
        avatar: authorAvatar,
        verified: true,
        role: organizerData.role || 'Active Volunteer',
      },
      stats: Array.isArray(b.stats) ? b.stats : [],
      geoTag: b.geoTag || {},
      relatedEvent: b.relatedEvent || {},
      comments: [],
      likesCount: 0,
      authorId: req.user?._id || null,
    });

    return res.status(201).json({ article: article.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// POST /api/articles/:id/like - Like an article
router.post('/:id/like', optionalAuth, async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    article.likesCount = (article.likesCount || 0) + 1;
    await article.save();
    return res.json({ success: true, likesCount: article.likesCount });
  } catch (error) {
    return next(error);
  }
});

// POST /api/articles/:id/comments - Add comment to an article
router.post('/:id/comments', optionalAuth, async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    if (!text) {
      return res.status(400).json({ message: 'Comment text cannot be empty.' });
    }

    const authorName = req.user?.name || req.body?.author || 'Community Member';
    const avatar =
      authorName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'CM';

    const newComment = {
      id: `c_${Date.now()}`,
      author: authorName,
      avatar,
      time: 'Just now',
      text,
    };

    article.comments = [...(article.comments || []), newComment];
    await article.save();

    return res.status(201).json({
      comment: newComment,
      comments: article.comments,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
