const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['image', 'pdf'],
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  prescriptionDate: {
    type: Date
  },
  provider: {
    type: String,
    trim: true
  },
  medicineCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Processing', 'Completed', 'Failed', 'Archived'],
    default: 'Processing'
  },
  medications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication'
  }],
  notes: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);