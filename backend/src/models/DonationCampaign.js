const { Schema, model } = require('mongoose');

const campaignStageSchema = new Schema(
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
      name: { type: String, default: 'Aarav Sharma' },
      role: { type: String, default: 'Campaign Lead' },
      avatar: { type: String, default: 'AS' },
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const expenseSchema = new Schema(
  {
    id: { type: String, default: () => new Schema.Types.ObjectId().toString() },
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    vendor: { type: String, default: 'Local Merchant' },
    receiptUrl: { type: String, default: '' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  { _id: false }
);

const donorEntrySchema = new Schema(
  {
    ticketId: { type: String, required: true },
    donorName: { type: String, default: 'Generous Supporter' },
    units: { type: Number, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const donationCampaignSchema = new Schema(
  {
    campaignId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    organizer: {
      type: String,
      default: 'Aarav Sharma',
    },
    title: {
      type: String,
      required: [true, 'Campaign title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Campaign description is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'Clothes',
        'Education',
        'Food',
        'Medical',
        'Animal Care',
        'Hygiene',
        'Emergency Relief',
      ],
      default: 'Clothes',
    },
    donationItem: {
      type: String,
      required: true,
      default: 'Warm Blanket',
    },
    unitCost: {
      type: Number,
      required: true,
      min: 1,
      default: 200,
    },
    targetUnits: {
      type: Number,
      required: true,
      min: 1,
      default: 250,
    },
    raisedUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    raisedAmount: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: true,
      default: 'Mangaluru, Karnataka',
    },
    beneficiaryGroup: {
      type: String,
      default: 'Children & Local Underprivileged Families',
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Procuring', 'Preparing', 'Distributed', 'Completed'],
      default: 'Active',
    },
    currentStage: {
      type: String,
      enum: ['pledged', 'procured', 'prepared', 'distributed'],
      default: 'pledged',
    },
    stages: {
      type: [campaignStageSchema],
      default: [],
    },
    expenses: {
      type: [expenseSchema],
      default: [],
    },
    donors: {
      type: [donorEntrySchema],
      default: [],
    },
  },
  { timestamps: true }
);

donationCampaignSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id.toString(),
    campaignId: this.campaignId,
    organizer: this.organizer,
    title: this.title,
    description: this.description,
    category: this.category,
    donationItem: this.donationItem,
    unitCost: this.unitCost,
    targetUnits: this.targetUnits,
    raisedUnits: this.raisedUnits,
    targetAmount: this.targetAmount,
    raisedAmount: this.raisedAmount,
    location: this.location,
    beneficiaryGroup: this.beneficiaryGroup,
    image: this.image,
    status: this.status,
    currentStage: this.currentStage,
    stages: this.stages,
    expenses: this.expenses,
    donors: this.donors,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = model('DonationCampaign', donationCampaignSchema);

