const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
      maxlength: [80, 'Organizer name must be 80 characters or fewer.'],
    },
    title: {
      type: String,
      required: [true, 'Event title is required.'],
      trim: true,
      maxlength: [80, 'Event title must be 80 characters or fewer.'],
    },
    description: {
      type: String,
      required: [true, 'Event description is required.'],
      trim: true,
      maxlength: [300, 'Event description must be 300 characters or fewer.'],
    },
    category: {
      type: String,
      required: [true, 'Event category is required.'],
      trim: true,
      maxlength: [40, 'Event category must be 40 characters or fewer.'],
    },
    date: {
      type: String,
      required: [true, 'Event date is required.'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid event date.'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required.'],
      maxlength: [40, 'Event time is too long.'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required.'],
      trim: true,
      maxlength: [120, 'Event location must be 120 characters or fewer.'],
    },
    capacity: {
      type: Number,
      required: [true, 'Volunteer capacity is required.'],
      min: [1, 'Volunteer capacity must be at least 1.'],
      validate: {
        validator: Number.isInteger,
        message: 'Volunteer capacity must be a whole number.',
      },
    },
    skills: {
      type: String,
      default: '',
      trim: true,
      maxlength: [120, 'Required skills must be 120 characters or fewer.'],
    },
    image: {
      type: String,
      required: [true, 'Event cover image is required.'],
    },
    volunteers: {
      type: Number,
      default: 0,
      min: 0,
    },
    tasks: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

eventSchema.methods.toPublicJSON = function toPublicJSON() {
  const eventDate = new Date(`${this.date}T00:00:00`);
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const status =
    eventDate.getTime() < todayDate.getTime()
      ? 'Completed'
      : eventDate.getTime() === todayDate.getTime()
        ? 'Ongoing'
        : 'Upcoming';

  return {
    id: this._id.toString(),
    role: 'organizing',
    title: this.title,
    description: this.description,
    category: this.category,
    date: this.date,
    time: this.time,
    location: this.location,
    capacity: this.capacity,
    skills: this.skills,
    image: this.image,
    status,
    organizer: this.organizer,
    volunteers: this.volunteers,
    tasks: this.tasks,
  };
};

module.exports = model('Event', eventSchema);
