const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    id: {
      type: String,
      default: () => new Schema.Types.ObjectId().toString(),
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: [80, 'Author name is too long.'],
    },
    avatar: {
      type: String,
      default: 'AS',
    },
    time: {
      type: String,
      default: 'Just now',
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Comment is too long.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const statSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required.'],
      trim: true,
      maxlength: [180, 'Article title must be 180 characters or fewer.'],
    },
    category: {
      type: String,
      required: [true, 'Article category is required.'],
      trim: true,
      maxlength: [60, 'Category is too long.'],
    },
    description: {
      type: String,
      required: [true, 'Article description is required.'],
      trim: true,
      maxlength: [500, 'Description is too long.'],
    },
    image: {
      type: String,
      required: [true, 'Article cover image is required.'],
    },
    alt: {
      type: String,
      default: '',
      trim: true,
    },
    meta: {
      type: String,
      default: 'Just now',
      trim: true,
    },
    readTime: {
      type: String,
      default: '3 min read',
      trim: true,
    },
    quote: {
      type: String,
      default: '',
      trim: true,
    },
    content: {
      type: [String],
      default: [],
    },
    organizer: {
      name: { type: String, default: 'Aarav Sharma' },
      avatar: { type: String, default: 'AS' },
      verified: { type: Boolean, default: false },
      role: { type: String, default: 'Community Contributor' },
    },
    stats: {
      type: [statSchema],
      default: [],
    },
    geoTag: {
      location: { type: String, default: 'Karnataka, India' },
      verified: { type: Boolean, default: true },
    },
    relatedEvent: {
      title: { type: String, default: '' },
      date: { type: String, default: '' },
      time: { type: String, default: '' },
      location: { type: String, default: '' },
      volunteers: { type: String, default: '' },
      xp: { type: Number, default: 100 },
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

articleSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    title: this.title,
    category: this.category,
    description: this.description,
    image: this.image,
    alt: this.alt || this.title,
    meta: this.meta || 'Just now',
    readTime: this.readTime || '3 min read',
    quote: this.quote || '',
    content: this.content || [],
    organizer: this.organizer || {
      name: 'Aarav Sharma',
      avatar: 'AS',
      verified: false,
      role: 'Community Contributor',
    },
    stats: this.stats || [],
    geoTag: this.geoTag || {
      location: 'Karnataka, India',
      verified: true,
    },
    relatedEvent: this.relatedEvent || undefined,
    comments: this.comments || [],
    likesCount: this.likesCount || 0,
    createdAt: this.createdAt,
  };
};

module.exports = model('Article', articleSchema);
