const { Schema, model } = require('mongoose');

const userBadgeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    badgeId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    awardedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

userBadgeSchema.index({ userId: 1, badgeId: 1 }, { unique: true });

module.exports = model('UserBadge', userBadgeSchema);
