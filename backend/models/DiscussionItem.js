const mongoose = require('mongoose');

const discussionItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  relatedSafetySignalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SafetySignal'
  },
  relatedMedicationIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication'
  }],
  status: {
    type: String,
    enum: ['pending', 'discussed', 'resolved'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  discussedAt: {
    type: Date
  }
});

module.exports = mongoose.model('DiscussionItem', discussionItemSchema);