# DoseGuard Project Structure

## Overview

This document describes the complete project structure and architecture of DoseGuard, a medication safety application built with the MERN stack.

## Directory Structure

```
DoseGuard/
├── backend/                    # Backend API (Express + MongoDB)
│   ├── models/                 # MongoDB database models
│   │   ├── User.js            # User authentication and profile
│   │   ├── Medication.js      # Medication information
│   │   ├── Prescription.js    # Prescription documents
│   │   ├── SafetySignal.js    # Safety alerts and warnings
│   │   └── DiscussionItem.js  # Questions for healthcare providers
│   ├── routes/                # API route handlers
│   │   ├── auth.js            # Authentication endpoints
│   │   ├── medications.js     # Medication CRUD operations
│   │   ├── prescriptions.js   # Prescription management
│   │   ├── analysis.js        # Safety analysis and signals
│   │   └── users.js           # User profile and settings
│   ├── server.js              # Express server configuration
│   ├── .env                   # Environment variables
│   └── package.json
│
├── frontend/                   # Frontend React application
│   ├── public/                # Static files
│   │   ├── index.html         # HTML template
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/               # API services and clients
│   │   │   ├── axios.ts       # Axios instance with interceptors
│   │   │   ├── auth.ts        # Authentication API calls
│   │   │   ├── medications.ts # Medication API calls
│   │   │   ├── prescriptions.ts # Prescription API calls
│   │   │   ├── analysis.ts    # Analysis API calls
│   │   │   └── users.ts       # User API calls
│   │   │
│   │   ├── components/        # Reusable UI components
│   │   │   └── ui/            # UI primitives
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Input.tsx
│   │   │       └── Select.tsx
│   │   │
│   │   ├── layouts/           # Layout components
│   │   │   ├── AppLayout.tsx  # Main app shell
│   │   │   ├── Sidebar.tsx    # Desktop navigation
│   │   │   └── BottomNav.tsx  # Mobile navigation
│   │   │
│   │   ├── pages/             # Page components
│   │   │   ├── LandingPage.tsx          # Public landing page
│   │   │   ├── Dashboard.tsx            # Main dashboard
│   │   │   ├── PrescriptionUpload.tsx   # Upload prescription
│   │   │   ├── MyMedicines.tsx          # Medication list
│   │   │   ├── SafetyCheck.tsx          # Safety analysis
│   │   │   ├── Timeline.tsx             # Medication timeline
│   │   │   ├── Reports.tsx              # Generate reports
│   │   │   ├── Help.tsx                 # Help and safety info
│   │   │   ├── Settings.tsx             # User settings
│   │   │   ├── ManualEntry.tsx          # Manual medication entry
│   │   │   ├── PatientDemo.tsx          # Demo patient data
│   │   │   ├── PrescriptionComparison.tsx # Compare prescriptions
│   │   │   ├── DoctorSummary.tsx        # Print-friendly report
│   │   │   └── PrivacyCenter.tsx        # Data management
│   │   │
│   │   ├── App.tsx            # Main app with routing
│   │   ├── index.tsx          # Entry point
│   │   └── index.css          # Global styles
│   │
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json
│
├── .gitignore                 # Git ignore rules
├── README.md                  # Project documentation
├── PROJECT_STRUCTURE.md       # This file
├── start.bat                  # Windows startup script
├── start.sh                   # Linux/Mac startup script
└── package.json               # Root package.json
```

## Key Features

### 1. Medication Workflow
1. **Prescription Upload**: Users upload prescriptions (image/PDF)
2. **AI Extraction**: Medication information is extracted
3. **Structure Profile**: Medications are organized into a profile
4. **Cross-Check**: System checks for duplicates and interactions
5. **Risk Detection**: Safety signals are generated
6. **Explanation**: Users get clear explanations of flagged items
7. **Discussion List**: Users create questions for healthcare providers
8. **Reports**: Printable summaries for doctor visits

### 2. Safety First Design
- Never diagnoses conditions
- Never recommends stopping medication
- Always encourages professional consultation
- Clear warnings and disclaimers
- Human confirmation step

### 3. Explainable AI
- "Why was this flagged?" feature
- Transparent reasoning for safety signals
- Professional follow-up recommendations
- Confidence indicators

## Technology Stack

### Backend
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **React Router**: Client-side routing
- **Axios**: HTTP client

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Medications
- `GET /api/medications` - Get all medications
- `POST /api/medications` - Create medication
- `PUT /api/medications/:id` - Update medication
- `DELETE /api/medications/:id` - Delete medication

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `POST /api/prescriptions` - Create prescription
- `PUT /api/prescriptions/:id` - Update prescription
- `DELETE /api/prescriptions/:id` - Delete prescription

### Analysis
- `POST /api/analysis/analyze` - Analyze medications
- `GET /api/analysis/signals` - Get safety signals
- `GET /api/analysis/discussion` - Get discussion items

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update preferences

## Demo Data

The application includes realistic demo patient data:
- **Name**: Ananya Rao
- **Age**: 58
- **Medications**: 5 (Metformin, Amlodipine, Aspirin, Warfarin, Atorvastatin)
- **Prescriptions**: 3
- **Safety Signals**: 2 (1 duplicate therapy, 1 interaction signal)
- **Discussion Items**: 4

## Running the Application

### Prerequisites
- Node.js (v18+)
- MongoDB (v6+)

### Installation

1. **Install dependencies**:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

2. **Start MongoDB**:
```bash
mongod
```

3. **Start the application**:
```bash
npm run dev
```

Or start servers individually:
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm start
```

## Key Differentiators

1. **Not a generic chatbot**: Focused on medication safety workflow
2. **Explainable**: Every flag has clear reasoning
3. **Human confirmation**: Never assumes AI is correct
4. **Time-based comparison**: Compare across prescriptions
5. **Professional focus**: Generates questions for healthcare providers

## Security Considerations

For production deployment:
- Implement proper JWT authentication
- Add rate limiting
- Implement input validation
- Use HTTPS
- Add CORS configuration
- Encrypt sensitive data
- Implement HIPAA compliance measures