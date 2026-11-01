const express = require('express');
const Article = require('../models/Article');
const { optionalAuth } = require('../middleware/auth');
const seedArticles = require('../data/seedArticles');

const router = express.Router();

// GET /api/articles - List all articles, auto-seed if collection is empty
router.get('/', async (req, res, next) => {
  try {
    let count = await Article.countDocuments();
    if (count === 0) {
      await Article.insertMany(seedArticles);
    }
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
      'AS';

    const newArticle = await Article.create({
      title: b.title.trim(),
      category: b.category ? b.category.trim() : 'Green Initiative',
      description: b.description.trim(),
      image: b.image.trim(),
      alt: b.alt ? b.alt.trim() : b.title.trim(),
      meta: b.meta ? b.meta.trim() : 'Just now · Local Community',
      readTime: b.readTime ? b.readTime.trim() : '3 min read',
      quote: b.quote ? b.quote.trim() : '',
      content: Array.isArray(b.content) && b.content.length > 0 ? b.content : [b.description.trim()],
      organizer: {
        name: authorName,
        avatar: authorAvatar,
        verified: req.user ? true : Boolean(organizerData.verified),
        role: organizerData.role || (req.user ? 'Verified Member' : 'Community Volunteer'),
      },
      stats: Array.isArray(b.stats) ? b.stats : [],
      geoTag: b.geoTag || {
        location: b.location || 'Karnataka, India',
        verified: true,
      },
      relatedEvent: b.relatedEvent || undefined,
      comments: Array.isArray(b.comments) ? b.comments : [],
      authorId: req.user?._id,
    });

    return res.status(201).json({ article: newArticle.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// POST /api/articles/:id/like - Like an article
router.post('/:id/like', async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { likesCount: 1 } },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    return res.json({ success: true, likesCount: article.likesCount });
  } catch (error) {
    return next(error);
  }
});

// POST /api/articles/:id/comments - Add comment to an article
router.post('/:id/comments', optionalAuth, async (req, res, next) => {
  try {
    const { text, author } = req.body || {};
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment text cannot be empty.' });
    }

    const commentAuthor = req.user?.name || author || 'Community Supporter';
    const avatar = commentAuthor
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newComment = {
      id: 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      author: commentAuthor,
      avatar: avatar || 'CS',
      time: 'Just now',
      text: text.trim(),
    };

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }

    return res.status(201).json({
      comment: newComment,
      comments: article.comments,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
