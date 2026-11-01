const { Schema, model } = require('mongoose');

const chatMessageSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [80, 'Author name must be 80 characters or fewer.'],
    },
    text: {
      type: String,
      required: [true, 'Message text is required.'],
      trim: true,
      minlength: 1,
      maxlength: [500, 'Message must be 500 characters or fewer.'],
    },
  },
  { timestamps: true },
);

chatMessageSchema.index({ eventId: 1, createdAt: 1 });

chatMessageSchema.methods.toPublicJSON = function toPublicJSON(currentUserId) {
  return {
    id: this._id.toString(),
    authorId: this.authorId.toString(),
    authorName: this.authorName,
    text: this.text,
    mine: currentUserId ? `${this.authorId}` === `${currentUserId}` : false,
    createdAt: this.createdAt,
  };
};

module.exports = model('ChatMessage', chatMessageSchema);
