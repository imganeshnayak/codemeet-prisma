const { Schema, model } = require('mongoose');

const taskSubmissionSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true, index: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    volunteerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
    status: {
      type: String,
      enum: ['submitted', 'approved', 'rejected', 'resubmission_requested'],
      default: 'submitted',
      index: true,
    },
    proof: {
      imageUrl: { type: String, required: true },
      coordinates: { type: String, default: '' },
      location: { type: String, default: '' },
      capturedAt: { type: String, default: '' },
    },
    review: {
      reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      reviewedAt: Date,
      note: { type: String, default: '' },
    },
    awardedXp: { type: Number, default: 0 },
    badgeId: { type: String, default: '' },
  },
  { timestamps: true },
);

taskSubmissionSchema.index({ taskId: 1, volunteerId: 1 }, { unique: true });

taskSubmissionSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    taskId: this.taskId.toString(),
    eventId: this.eventId.toString(),
    volunteerId: this.volunteerId.toString(),
    articleId: this.articleId?.toString(),
    status: this.status,
    proof: this.proof,
    review: this.review,
    awardedXp: this.awardedXp,
    badgeId: this.badgeId,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = model('TaskSubmission', taskSubmissionSchema);
