const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required.'],
      trim: true,
      maxlength: [80, 'Task title must be 80 characters or fewer.'],
    },
    description: {
      type: String,
      required: [true, 'Task description is required.'],
      trim: true,
      maxlength: [240, 'Task description must be 240 characters or fewer.'],
    },
    category: {
      type: String,
      required: [true, 'Task category is required.'],
      trim: true,
      maxlength: [40, 'Task category must be 40 characters or fewer.'],
    },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    date: { type: String, required: true, maxlength: 40 },
    time: { type: String, required: true, maxlength: 40 },
    volunteers: { type: Number, default: 0, min: 0 },
    points: { type: String, default: '50', maxlength: 20 },
    image: { type: String, default: '/assets/task-tree.jpg' },
  },
  { timestamps: true },
);

taskSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    creatorId: this.creatorId.toString(),
    category: this.category,
    title: this.title,
    location: this.location,
    description: this.description,
    date: this.date,
    time: this.time,
    volunteers: String(this.volunteers),
    points: this.points,
    days: 'New task',
    image: this.image,
  };
};

module.exports = model('Task', taskSchema);
