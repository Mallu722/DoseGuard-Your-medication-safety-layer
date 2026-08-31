const mongoose = require('mongoose');

const safetySignalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Duplicate Therapy', 'Interaction Signal', 'Schedule Inconsistency', 'Missing Information', 'Allergy Alert']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  medications: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  recommendedAction: {
    type: String,
    required: true
  },
  confidence: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  isReviewed: {
    type: Boolean,
    default: false
  },
  discussionItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscussionItem'
  },
  detectedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date
  }
});

module.exports = mongoose.model('SafetySignal', safetySignalSchema);