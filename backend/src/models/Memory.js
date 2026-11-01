const { Schema, model } = require('mongoose');

const memorySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: [120, 'Caption must be 120 characters or fewer.'],
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  { timestamps: true },
);

memorySchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    label: this.label,
    src: this.url,
    type: this.type,
    uploaded: true,
    likesCount: this.likes ? this.likes.length : 0,
    createdAt: this.createdAt,
  };
};

module.exports = model('Memory', memorySchema);
