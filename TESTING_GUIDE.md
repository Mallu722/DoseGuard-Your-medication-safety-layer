# DoseGuard Testing Guide

## Quick Start Testing (5 minutes)

### 1. Start MongoDB
```bash
mongod
```

### 2. Install Dependencies
```bash
cd DoseGuard
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 3. Start Application
```bash
npm run dev
```

### 4. Open Browser
Visit: http://localhost:3000

## Testing Scenarios

### Scenario 1: Demo Patient (30 seconds)
**Purpose**: Quick demonstration of core features

**Steps**:
1. Click "Try Demo Patient" button
2. Observe the demo patient data
3. Review the safety signals
4. Check the discussion list
5. Navigate to Dashboard

**Expected Results**:
- Demo patient loads immediately
- 5 medications display correctly
- 2 safety signals appear (1 duplicate, 1 interaction)
- 4 discussion questions are listed

### Scenario 2: Complete Medication Workflow (3 minutes)
**Purpose**: Test the full medication safety workflow

**Steps**:
1. Go to landing page
2. Click "Check my medicines" - Navigate to upload
3. Upload prescription (use demo mode or enter manually)
4. Verify medication extraction
5. Run safety analysis
6. Review flagged items
7. Add items to discussion list
8. Generate doctor summary

**Expected Results**:
- Upload completes without errors
- Medications are extracted and displayed
- Safety analysis runs successfully
- Flagged items have clear explanations
- Discussion list can be populated
- Summary report can be generated

### Scenario 3: Navigation Testing (2 minutes)
**Purpose**: Verify all navigation works correctly

**Desktop Testing**:
1. Test sidebar navigation
2. Test responsive layout
3. Check hover states
4. Verify focus states

**Mobile Testing**:
1. Resize browser to mobile width
2. Test bottom navigation
3. Verify touch targets are large enough
4. Check for horizontal scrolling

**Expected Results**:
- All navigation links work
- Mobile layout displays correctly
- No horizontal scrolling
- Touch targets are adequately sized

### Scenario 4: Safety Analysis (3 minutes)
**Purpose**: Test safety analysis features

**Steps**:
1. Navigate to Safety Check page
2. Review all safety signals
3. Click "Show details" on flagged items
4. Verify "Why was this flagged?" information
5. Check recommended actions

**Expected Results**:
- All safety signals display with correct severity
- Detailed information expands correctly
- Explanations are clear and actionable
- Recommended actions are provided

### Scenario 5: Report Generation (2 minutes)
**Purpose**: Test report generation

**Steps**:
1. Navigate to Reports page
2. Review generated report
3. Check all sections are populated
4. Test print functionality
5. Verify PDF download

**Expected Results**:
- Report displays all medications
- Safety concerns are listed
- Discussion questions appear
- Print view is clean and professional

### Scenario 6: Timeline (1 minute)
**Purpose**: Test timeline visualization

**Steps**:
1. Navigate to Timeline page
2. Review medication history
3. Check event timeline
4. Verify event types

**Expected Results**:
- Timeline displays chronologically
- Events have correct dates
- Event types are properly labeled

### Scenario 7: Settings (2 minutes)
**Purpose**: Test user settings

**Steps**:
1. Navigate to Settings
2. Test profile editing
3. Change language preference
4. Toggle notifications
5. Test demo mode toggle

**Expected Results**:
- Profile can be edited
- Language options display
- Notification toggles work
- Demo mode toggles correctly

### Scenario 8: Empty States (1 minute)
**Purpose**: Test empty state handling

**Steps**:
1. Clear medications
2. Check empty state displays
3. Verify helpful messages

**Expected Results**:
- Empty states display gracefully
- Helpful messages are shown
- Actionable buttons are provided

## Key Features to Verify

### 1. Prescription Upload
- ✅ Drag and drop works
- ✅ File validation (JPG, PNG, PDF)
- ✅ File size limit (10MB)
- ✅ Processing feedback

### 2. AI Extraction
- ✅ Medications are extracted
- ✅ Confidence indicators display
- ✅ Manual editing is possible
- ✅ Changes are saved

### 3. Safety Analysis
- ✅ Duplicate detection works
- ✅ Interaction detection works
- ✅ Clear explanations provided
- ✅ Recommended actions given

### 4. Discussion List
- ✅ Items can be added
- ✅ Questions are created
- ✅ Summary can be generated

### 5. Reports
- ✅ Print-friendly layout
- ✅ All data included
- ✅ Professional formatting

### 6. Demo Mode
- ✅ Demo patient data loads
- ✅ Realistic medication data
- ✅ Safety signals appear
- ✅ Discussion questions populated

## Browser Compatibility Testing

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Mobile Testing

- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Responsive breakpoints:
  - Desktop: 1440px, 1280px, 1024px
  - Tablet: 768px
  - Mobile: 390px, 375px

## Performance Testing

- ✅ Page loads in under 3 seconds
- ✅ Animations are smooth
- ✅ No console errors
- ✅ Responsive design works

## Accessibility Testing

- ✅ Keyboard navigation works
- ✅ ARIA labels present
- ✅ Color contrast sufficient
- ✅ Focus indicators visible

## Security Testing

- ✅ Demo mode is safe
- ✅ No data leaks
- ✅ Clear medical disclaimers

## Demo Mode Features

### Patient Profile
- **Name**: Ananya Rao
- **Age**: 58
- **Gender**: Female
- **Medications**: 5
- **Prescriptions**: 3
- **Safety Signals**: 2
- **Discussion Items**: 4

### Safety Signals
1. **Duplicate Therapy**
   - Severity: Medium
   - Medications: Metformin + Aspirin
   - Issue: Potential bleeding risk overlap

2. **Interaction Signal**
   - Severity: High
   - Medications: Warfarin + Aspirin
   - Issue: Increased bleeding risk

### Timeline Events
1. New prescription (18 Aug 2026)
2. Medication added (12 Aug 2026)
3. Previous prescription (02 Jul 2026)
4. Medication discontinued (20 Jun 2026)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB is accessible

### Port Already in Use
- Backend: Change PORT in `backend/.env`
- Frontend: React uses 3000 by default

### Dependencies Not Installing
- Delete node_modules and package-lock.json
- Run `npm install` again

### CORS Errors
- Ensure backend server is running
- Check CORS configuration in `server.js`

## Success Criteria

- ✅ All routes work correctly
- ✅ Demo patient loads
- ✅ Safety analysis runs
- ✅ Reports generate properly
- ✅ Responsive design works
- ✅ No console errors
- ✅ Clear medical disclaimers present
- ✅ Professional UI/UX

## Demo Presentation Script

1. **Introduction** (30 seconds)
   - "Welcome to DoseGuard"
   - "A second pair of eyes for every prescription"

2. **Demo Patient** (1 minute)
   - Show patient profile
   - Display medications
   - Show safety signals

3. **Safety Analysis** (1.5 minutes)
   - Explain duplicate therapy detection
   - Show interaction signal
   - Display "Why was this flagged?" information

4. **Discussion List** (1 minute)
   - Show questions for healthcare provider
   - Explain how to use the information

5. **Reports** (30 seconds)
   - Generate and show doctor summary
   - Demonstrate print functionality

6. **Conclusion** (30 seconds)
   - "DoseGuard helps patients understand their medications"
   - "Always discuss with healthcare professionals"