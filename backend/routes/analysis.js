const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');
const SafetySignal = require('../models/SafetySignal');
const DiscussionItem = require('../models/DiscussionItem');

// Analyze medications for safety issues
router.post('/analyze', async (req, res) => {
  try {
    const { medications, userId } = req.body;

    if (!medications || !Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ error: 'Medications array is required' });
    }

    const safetySignals = [];
    const discussionItems = [];

    // Check for duplicate therapies
    const duplicates = findDuplicateTherapies(medications);
    duplicates.forEach(duplicate => {
      const signal = new SafetySignal({
        userId,
        type: 'Duplicate Therapy',
        severity: 'medium',
        medications: duplicate,
        description: 'Potential duplicate therapy detected',
        explanation: 'The same or similar medications appear in your profile with potentially different instructions.',
        recommendedAction: 'Confirm with your doctor or pharmacist which prescription should be followed.',
        confidence: 'Medium'
      });
      safetySignals.push(signal);

      const discussionItem = new DiscussionItem({
        userId,
        question: `I have the same medicine listed multiple times. Which instruction is current?`,
        relatedSafetySignalId: signal._id,
        status: 'pending'
      });
      discussionItems.push(discussionItem);
    });

    // Check for potential interactions
    const interactions = findPotentialInteractions(medications);
    interactions.forEach(interaction => {
      const signal = new SafetySignal({
        userId,
        type: 'Interaction Signal',
        severity: 'high',
        medications: interaction,
        description: 'Potential drug interaction detected',
        explanation: 'These medications can interact. The actual clinical significance depends on your medical history, dosage, duration, and other medications.',
        recommendedAction: 'Discuss this combination with your doctor or pharmacist before making medication changes.',
        confidence: 'High'
      });
      safetySignals.push(signal);

      const discussionItem = new DiscussionItem({
        userId,
        question: 'Are these two medicines intended to be taken together?',
        relatedSafetySignalId: signal._id,
        status: 'pending'
      });
      discussionItems.push(discussionItem);
    });

    // Save safety signals and discussion items
    const savedSignals = await SafetySignal.insertMany(safetySignals);
    const savedDiscussions = await DiscussionItem.insertMany(discussionItems);

    // Update safety signals with discussion item IDs
    for (let i = 0; i < savedSignals.length; i++) {
      savedSignals[i].discussionItemId = savedDiscussions[i]._id;
      await savedSignals[i].save();
    }

    res.json({
      summary: {
        totalMedications: medications.length,
        duplicateTherapies: duplicates.length,
        interactionSignals: interactions.length,
        totalSignals: safetySignals.length
      },
      safetySignals: savedSignals,
      discussionItems: savedDiscussions
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all safety signals for a user
router.get('/signals', async (req, res) => {
  try {
    const userId = req.userId;
    const signals = await SafetySignal.find({ userId })
      .sort({ detectedAt: -1 });
    
    res.json(signals);
  } catch (error) {
    console.error('Get safety signals error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get safety signal by ID
router.get('/signals/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const signal = await SafetySignal.findOne({ _id: req.params.id, userId });
    
    if (!signal) {
      return res.status(404).json({ error: 'Safety signal not found' });
    }

    res.json(signal);
  } catch (error) {
    console.error('Get safety signal error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark safety signal as reviewed
router.put('/signals/:id/review', async (req, res) => {
  try {
    const userId = req.userId;
    const signal = await SafetySignal.findOne({ _id: req.params.id, userId });
    
    if (!signal) {
      return res.status(404).json({ error: 'Safety signal not found' });
    }

    signal.isReviewed = true;
    signal.resolvedAt = new Date();
    await signal.save();

    res.json(signal);
  } catch (error) {
    console.error('Mark signal as reviewed error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all discussion items for a user
router.get('/discussion', async (req, res) => {
  try {
    const userId = req.userId;
    const items = await DiscussionItem.find({ userId })
      .sort({ addedAt: -1 });
    
    res.json(items);
  } catch (error) {
    console.error('Get discussion items error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create discussion item
router.post('/discussion', async (req, res) => {
  try {
    const userId = req.userId;
    const item = new DiscussionItem({
      userId,
      ...req.body
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Create discussion item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update discussion item
router.put('/discussion/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const item = await DiscussionItem.findOne({ _id: req.params.id, userId });
    
    if (!item) {
      return res.status(404).json({ error: 'Discussion item not found' });
    }

    Object.assign(item, req.body);
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Update discussion item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete discussion item
router.delete('/discussion/:id', async (req, res) => {
  try {
    const userId = req.userId;
    const item = await DiscussionItem.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!item) {
      return res.status(404).json({ error: 'Discussion item not found' });
    }

    res.json({ message: 'Discussion item deleted successfully' });
  } catch (error) {
    console.error('Delete discussion item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper functions
function findDuplicateTherapies(medications) {
  const duplicates = [];
  const seen = new Set();

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i];
      const med2 = medications[j];

      // Check if medications have similar names (simplified logic)
      if (med1.name.toLowerCase() === med2.name.toLowerCase() ||
          med1.strength === med2.strength) {
        const pair = [med1.name, med2.name];
        const key = pair.sort().join('|');
        
        if (!seen.has(key)) {
          seen.add(key);
          duplicates.push(pair);
        }
      }
    }
  }

  return duplicates;
}

function findPotentialInteractions(medications) {
  // Common known interactions (simplified for prototype)
  const knownInteractions = [
    ['warfarin', 'aspirin'],
    ['metformin', 'alcohol'],
    ['atorvastatin', 'grapefruit'],
    ['amlodipine', 'grapefruit']
  ];

  const interactions = [];
  const seen = new Set();

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i].name.toLowerCase();
      const med2 = medications[j].name.toLowerCase();

      for (const interaction of knownInteractions) {
        if ((med1.includes(interaction[0]) && med2.includes(interaction[1])) ||
            (med1.includes(interaction[1]) && med2.includes(interaction[0]))) {
          const pair = [medications[i].name, medications[j].name];
          const key = pair.sort().join('|');
          
          if (!seen.has(key)) {
            seen.add(key);
            interactions.push(pair);
          }
        }
      }
    }
  }

  return interactions;
}

module.exports = router;