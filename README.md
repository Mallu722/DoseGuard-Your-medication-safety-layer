# DoseGuard - Medication Safety Layer

A production-quality HealthTech web application that helps patients understand their medications and identify potential safety issues.

## Features

- **Prescription Upload**: Upload prescriptions via drag-and-drop (JPG, PNG, PDF)
- **AI Extraction**: Automatic medication information extraction
- **Medication Cross-Check**: Identify potential duplicates and interactions
- **Safety Pulse**: Visual medication safety overview
- **Timeline**: Track medication history over time
- **Discussion List**: Generate questions for your healthcare provider
- **Reports**: Create printable summaries for doctor visits

## Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Styling**: Tailwind CSS with custom healthcare design system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. **Install backend dependencies**:
```bash
cd backend
npm install
```

2. **Install frontend dependencies**:
```bash
cd frontend
npm install
```

3. **Start MongoDB** (ensure MongoDB is running on localhost:27017)

4. **Start the development servers**:

Option A: Start both servers together
```bash
npm run dev
```

Option B: Start servers individually
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Environment Variables

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doseguard
JWT_SECRET=your-jwt-secret-key
```

## Project Structure

```
DoseGuard/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/         # API services
│   │   ├── components/  # Reusable components
│   │   ├── layouts/     # Layout components
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app component
│   │   └── index.tsx    # Entry point
│   └── package.json
├── README.md
└── package.json
```

## Demo Mode

The application includes a demo mode that loads realistic patient data for immediate testing. Access the demo at `/demo` or click "Try Demo Patient" on the landing page.

## Key Features for Hackathon

### 1. **Complete Medication Workflow**
- Prescription upload → AI extraction → Medication profile → Safety analysis → Discussion list

### 2. **Safety First Design**
- Never diagnoses conditions
- Never recommends stopping medication
- Always encourages professional consultation
- Clear warnings and disclaimers

### 3. **Explainable AI**
- "Why was this flagged?" feature
- Transparent reasoning for safety signals
- Professional follow-up recommendations

### 4. **Professional UI/UX**
- Healthcare-focused design system
- Responsive for desktop and mobile
- Clear visual hierarchy
- Trust-building elements

### 5. **Complete Documentation**
- Privacy center
- Medical disclaimer
- FAQ section
- Print-friendly reports

## Testing the Application

1. Open the application in your browser (default: http://localhost:3000)
2. Click "Try Demo Patient" to see realistic patient data
3. Upload a prescription (or enter manually)
4. View safety analysis and flagged items
5. Add items to the discussion list
6. Generate a doctor summary report

## Customization for Production

To deploy this application for production:

1. **MongoDB**: Use MongoDB Atlas or similar cloud service
2. **Authentication**: Implement proper JWT authentication
3. **API Security**: Add rate limiting, input validation
4. **File Storage**: Use cloud storage (S3, Cloudinary) for prescriptions
5. **OCR**: Integrate with actual OCR service (AWS Textract, Google Vision)
6. **Medication Database**: Integrate with drug databases (Drugs.com, RxNorm)
7. **Compliance**: Implement HIPAA compliance measures

## License

ISC