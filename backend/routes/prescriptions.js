const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// Get all prescriptions for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.userId;
    const prescriptions = await Prescription.find({ userId })
      .sort({ prescriptionDate: -1 });
    
    res.json(prescriptions);
  } catch (error) {
    console.error('Get prescriptions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get prescription by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const prescription = await Prescription.findOne({ _id: req.params.id, userId })
      .populate('medications');
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.json(prescription);
  } catch (error) {
    console.error('Get prescription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create prescription
router.post('/', async (req, res) => {
  try {
    const userId = req.userId;
    const prescription = new Prescription({
      userId,
      ...req.body
    });

    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update prescription
router.put('/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const prescription = await Prescription.findOne({ _id: req.params.id, userId });
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    Object.assign(prescription, req.body);
    await prescription.save();

    res.json(prescription);
  } catch (error) {
    console.error('Update prescription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete prescription
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const prescription = await Prescription.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error('Delete prescription error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;