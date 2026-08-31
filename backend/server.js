const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
const authRoutes = require('./routes/auth');
const medicationRoutes = require('./routes/medications');
const prescriptionRoutes = require('./routes/prescriptions');
const analysisRoutes = require('./routes/analysis');
const userRoutes = require('./routes/users');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
  });
});

// Demo data endpoint
app.get('/api/demo/patient', (req, res) => {
  const demoPatient = {
    id: 'demo-001',
    name: 'Ananya Rao',
    age: 58,
    gender: 'Female',
    lastPrescriptionDate: '2026-08-18',
    medications: [
      {
        id: 'med-001',
        name: 'Metformin',
        strength: '500 mg',
        frequency: 'Twice daily',
        timing: 'After meals',
        source: 'Prescription A',
        confidence: 'High',
        addedDate: '2026-08-18'
      },
      {
        id: 'med-002',
        name: 'Amlodipine',
        strength: '5 mg',
        frequency: 'Once daily',
        timing: 'Morning',
        source: 'Prescription A',
        confidence: 'High',
        addedDate: '2026-08-18'
      },
      {
        id: 'med-003',
        name: 'Aspirin',
        strength: '75 mg',
        frequency: 'Once daily',
        timing: 'After breakfast',
        source: 'Prescription B',
        confidence: 'High',
        addedDate: '2026-08-12'
      },
      {
        id: 'med-004',
        name: 'Warfarin',
        strength: '5 mg',
        frequency: 'Once daily',
        timing: 'Evening',
        source: 'Prescription A',
        confidence: 'High',
        addedDate: '2026-08-18'
      },
      {
        id: 'med-005',
        name: 'Atorvastatin',
        strength: '20 mg',
        frequency: 'Once daily',
        timing: 'Night',
        source: 'Prescription C',
        confidence: 'High',
        addedDate: '2026-07-02'
      }
    ],
    prescriptions: [
      {
        id: 'rx-001',
        date: '2026-08-18',
        provider: 'Dr. Sharma',
        medicineCount: 3,
        status: 'Active',
        medications: ['Metformin', 'Amlodipine', 'Warfarin']
      },
      {
        id: 'rx-002',
        date: '2026-08-12',
        provider: 'Dr. Sharma',
        medicineCount: 1,
        status: 'Active',
        medications: ['Aspirin']
      },
      {
        id: 'rx-003',
        date: '2026-07-02',
        provider: 'Dr. Patel',
        medicineCount: 1,
        status: 'Expired',
        medications: ['Atorvastatin']
      }
    ],
    safetySignals: [
      {
        id: 'signal-001',
        type: 'Duplicate Therapy',
        severity: 'medium',
        medications: ['Metformin', 'Aspirin'],
        description: 'Potential duplicate therapy detected',
        explanation: 'Both medications may affect bleeding risk and have overlapping indications.',
        recommendedAction: 'Confirm with your doctor or pharmacist which prescription should be followed.',
        confidence: 'Medium',
        detectedAt: '2026-09-01T10:30:00Z'
      },
      {
        id: 'signal-002',
        type: 'Interaction Signal',
        severity: 'high',
        medications: ['Warfarin', 'Aspirin'],
        description: 'Potential drug interaction detected',
        explanation: 'Warfarin and Aspirin can interact to increase bleeding risk. The actual clinical significance depends on the patient\'s medical history, dosage, duration, and other medications.',
        recommendedAction: 'Discuss this combination with your doctor or pharmacist before making medication changes.',
        confidence: 'High',
        detectedAt: '2026-09-01T10:30:00Z'
      }
    ],
    timeline: [
      {
        id: 'timeline-001',
        date: '2026-08-18',
        type: 'new_prescription',
        description: 'New prescription added',
        source: 'Prescription A'
      },
      {
        id: 'timeline-002',
        date: '2026-08-12',
        type: 'medication_added',
        description: 'Medication added to profile',
        source: 'Prescription B'
      },
      {
        id: 'timeline-003',
        date: '2026-07-02',
        type: 'previous_prescription',
        description: 'Previous prescription',
        source: 'Prescription C'
      },
      {
        id: 'timeline-004',
        date: '2026-06-20',
        type: 'medication_discontinued',
        description: 'Medication discontinued',
        source: 'Previous prescription'
      }
    ],
    discussionList: [
      {
        id: 'disc-001',
        question: 'I have the same medicine listed in two prescriptions. Which instruction is current?',
        status: 'pending',
        addedAt: '2026-09-01T10:45:00Z'
      },
      {
        id: 'disc-002',
        question: 'Are these two medicines intended to be taken together?',
        status: 'pending',
        addedAt: '2026-09-01T10:45:00Z'
      },
      {
        id: 'disc-003',
        question: 'Should my medication schedule be updated?',
        status: 'pending',
        addedAt: '2026-09-01T10:45:00Z'
      },
      {
        id: 'disc-004',
        question: 'Is there anything I should monitor while taking these medicines?',
        status: 'pending',
        addedAt: '2026-09-01T10:45:00Z'
      }
    ],
    lastChecked: '2026-09-01T10:42:00Z'
  };
  res.json(demoPatient);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

// Try to connect to MongoDB, but allow app to run without it
let dbConnected = false;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/doseguard';

mongoose.connect(mongodbUri)
  .then(() => {
    dbConnected = true;
    console.log('✓ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    dbConnected = false;
    console.warn('⚠ MongoDB connection failed:', err.message);
    console.warn('⚠ Running in offline mode with demo data');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`Demo endpoint: http://localhost:${PORT}/api/demo/patient`);
    });
  });

module.exports = app;