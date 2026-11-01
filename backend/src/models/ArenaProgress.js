const { Schema, model } = require('mongoose');

const arenaProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    totalXp: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    approvedTasks: { type: Number, default: 0 },
    currentLevel: { type: Number, default: 1 },
    unlockedLevels: { type: [Number], default: [1] },
  },
  { timestamps: true },
);

module.exports = model('ArenaProgress', arenaProgressSchema);
