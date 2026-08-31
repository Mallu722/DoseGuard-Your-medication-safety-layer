const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Medication = require('../models/Medication');
const Prescription = require('../models/Prescription');
const SafetySignal = require('../models/SafetySignal');
const DiscussionItem = require('../models/DiscussionItem');

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password -preferences');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(user, req.body, { lastUpdated: new Date() });
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user preferences
router.put('/preferences', async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.preferences = { ...user.preferences, ...req.body };
    await user.save();

    res.json(user.preferences);
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user data (GDPR compliance)
router.delete('/data', async (req, res) => {
  try {
    const userId = req.userId;
    
    // Delete all related data
    await Medication.deleteMany({ userId });
    await Prescription.deleteMany({ userId });
    await SafetySignal.deleteMany({ userId });
    await DiscussionItem.deleteMany({ userId });
    
    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: 'All data deleted successfully' });
  } catch (error) {
    console.error('Delete data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle demo mode
router.post('/toggle-demo', async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.demoData = !user.demoData;
    await user.save();

    res.json({ demoData: user.demoData });
  } catch (error) {
    console.error('Toggle demo mode error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;