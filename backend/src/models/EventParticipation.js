const { Schema, model } = require('mongoose');

const participationSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignment: {
      type: String,
      default: 'Volunteer',
      trim: true,
      maxlength: [120, 'Assignment must be 120 characters or fewer.'],
    },
  },
  { timestamps: true },
);

participationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

module.exports = model('EventParticipation', participationSchema);
