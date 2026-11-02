const { Schema, model } = require('mongoose');

const stageSchema = new Schema(
  {
    stage: {
      type: String,
      enum: ['pledged', 'procured', 'prepared', 'distributed'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    photoUrl: {
      type: String,
      default: '',
    },
    geoTag: {
      location: { type: String, default: 'Mangaluru, Karnataka' },
      coordinates: { type: String, default: '12.8718° N, 74.8560° E' },
      verified: { type: Boolean, default: true },
    },
    volunteer: {
      name: { type: String, default: 'Arjun K.' },
      role: { type: String, default: 'Lead Volunteer' },
      avatar: { type: String, default: 'AK' },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    hostPublished: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const donationTicketSchema = new Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    donorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    donorName: {
      type: String,
      default: 'Anonymous Changemaker',
      trim: true,
    },
    donorEmail: {
      type: String,
      default: '',
      trim: true,
    },
    campaignId: {
      type: String,
      default: '',
      index: true,
    },
    mealCount: {
      type: Number,
      required: true,
      min: [1, 'Must purchase at least 1 ticket'],
    },
    unitName: {
      type: String,
      default: 'Meal',
    },
    category: {
      type: String,
      default: 'Nutrition',
    },
    amount: {
      type: Number,
      required: true,
    },
    cause: {
      type: String,
      default: 'Children Nutrition Drive',
    },
    location: {
      type: String,
      default: 'Kadri Hills & Coastal Shelter, Mangaluru',
    },
    beneficiaryGroup: {
      type: String,
      default: 'Underprivileged Children & Elders',
    },
    dedication: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pledged', 'procured', 'prepared', 'distributed'],
      default: 'pledged',
    },
    stages: {
      type: [stageSchema],
      default: [],
    },
  },
  { timestamps: true }
);

donationTicketSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    ticketId: this.ticketId,
    donorName: this.donorName,
    donorEmail: this.donorEmail,
    campaignId: this.campaignId,
    mealCount: this.mealCount,
    unitCount: this.mealCount,
    unitName: this.unitName || 'Meal',
    category: this.category || 'Nutrition',
    amount: this.amount,
    cause: this.cause,
    location: this.location,
    beneficiaryGroup: this.beneficiaryGroup,
    dedication: this.dedication,
    status: this.status,
    stages: this.stages.filter((stage) => stage.hostPublished === true),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = model('DonationTicket', donationTicketSchema);
