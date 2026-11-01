const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [80, 'Name must be 80 characters or fewer.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address.'],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    location: {
      type: String,
      default: '',
      trim: true,
      maxlength: [120, 'Location must be 120 characters or fewer.'],
    },
    bio: {
      type: String,
      default: '',
      trim: true,
      maxlength: [180, 'Bio must be 180 characters or fewer.'],
    },
    interests: {
      type: [String],
      default: [],
    },
    photoUrl: {
      type: String,
      default: '',
      trim: true,
    },
    photoPublicId: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    location: this.location,
    bio: this.bio,
    interests: this.interests,
    photoUrl: this.photoUrl,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = model('User', userSchema);
