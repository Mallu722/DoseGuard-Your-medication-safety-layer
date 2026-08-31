import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PrescriptionUpload from './pages/PrescriptionUpload';
import MyMedicines from './pages/MyMedicines';
import SafetyCheck from './pages/SafetyCheck';
import Timeline from './pages/Timeline';
import Reports from './pages/Reports';
import Help from './pages/Help';
import Settings from './pages/Settings';
import ManualEntry from './pages/ManualEntry';
import PatientDemo from './pages/PatientDemo';
import PrescriptionComparison from './pages/PrescriptionComparison';
import DoctorSummary from './pages/DoctorSummary';
import PrivacyCenter from './pages/PrivacyCenter';

function App() {
  return (
    <AuthProvider>
      {/* Global First-Entry Authentication Suggestion Modal */}
      <AuthModal />

      <Routes>
        {/* Public / Auth routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/signup" element={<AuthPage initialMode="signup" />} />
        <Route path="/demo" element={<PatientDemo />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicines" element={<MyMedicines />} />
        <Route path="/prescriptions" element={<PrescriptionUpload />} />
        <Route path="/safety" element={<SafetyCheck />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Additional pages */}
        <Route path="/manual-entry" element={<ManualEntry />} />
        <Route path="/comparison" element={<PrescriptionComparison />} />
        <Route path="/summary" element={<DoctorSummary />} />
        <Route path="/privacy" element={<PrivacyCenter />} />
        
        {/* Default route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;