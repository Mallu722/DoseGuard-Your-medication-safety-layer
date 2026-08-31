const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// Get all medications for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.userId;
    const medications = await Medication.find({ userId })
      .sort({ addedDate: -1 });
    
    res.json(medications);
  } catch (error) {
    console.error('Get medications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get medication by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const medication = await Medication.findOne({ _id: req.params.id, userId });
    
    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json(medication);
  } catch (error) {
    console.error('Get medication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create medication
router.post('/', async (req, res) => {
  try {
    const userId = req.userId;
    const medication = new Medication({
      userId,
      ...req.body
    });

    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    console.error('Create medication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update medication
router.put('/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const medication = await Medication.findOne({ _id: req.params.id, userId });
    
    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    Object.assign(medication, req.body, { lastUpdated: new Date() });
    await medication.save();

    res.json(medication);
  } catch (error) {
    console.error('Update medication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete medication
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const medication = await Medication.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    console.error('Delete medication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;