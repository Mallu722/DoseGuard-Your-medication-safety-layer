import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppLayout from '../layouts/AppLayout';

const DoctorSummary: React.FC = () => {
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    // Load demo data
    const loadDemoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/demo/patient');
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error('Error loading demo data:', error);
      }
    };

    loadDemoData();
  }, []);

  if (!patient) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating summary...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Summary Report</h1>
          <p className="text-gray-600 mt-1">Printable summary for your healthcare professional</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200" id="doctor-summary">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-900 mb-2">DoseGuard Medication Discussion Summary</h1>
            <p className="text-sm text-gray-600">Generated from patient-provided medication information</p>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-4 mb-8 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-semibold text-gray-900">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Report</p>
              <p className="font-semibold text-gray-900">01 September 2026</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age / Gender</p>
              <p className="font-semibold text-gray-900">{patient.age} / {patient.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-semibold text-gray-900">Today, 10:42 AM</p>
            </div>
          </div>

          {/* Current Medications */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Current Medications</h2>
            <div className="grid gap-3">
              {patient.medications.map((med: any) => (
                <div key={med.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{med.name}</p>
                      <p className="text-sm text-gray-600">{med.strength}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{med.frequency}</p>
                      <p className="text-sm text-gray-600">{med.timing}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Source: {med.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Issues to Review */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Medication Safety Concerns</h2>
            <div className="space-y-4">
              {patient.safetySignals.map((signal: any) => (
                <div key={signal.id} className={`p-4 rounded-lg ${signal.severity === 'high' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <svg className={`w-5 h-5 ${signal.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{signal.type}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${signal.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {signal.severity.charAt(0).toUpperCase() + signal.severity.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{signal.description}</p>
                      <div className="pl-4">
                        <p className="text-sm text-gray-600 font-medium mb-1">Why flagged:</p>
                        <p className="text-sm text-gray-700">{signal.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Questions for Provider */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Questions for Your Healthcare Professional</h2>
            <div className="space-y-3">
              {patient.discussionList.map((item: any) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-5 h-5 bg-teal-600 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">{item.question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
            <p className="font-semibold mb-1">Important Disclaimer:</p>
            <p>
              This summary is generated from patient-provided medication information. It is intended 
              to support discussion with a qualified healthcare professional. DoseGuard does not 
              diagnose conditions, prescribe medicines, or replace professional medical advice. 
              Always consult with a healthcare provider before making any medication changes.
            </p>
          </div>

          {/* Signature Line */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Generated by DoseGuard</p>
                <p className="text-xs text-gray-500">01 September 2026, 10:42 AM</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Reference ID: DG-{Date.now().toString().slice(-6)}</p>
                <p className="text-xs text-gray-500">Demo Patient Data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => window.print()}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Report
          </Button>
          <Button variant="secondary" onClick={() => alert('PDF download would open in production')}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </Button>
          <Button variant="outline" onClick={() => alert('Share functionality would open in production')}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Report
          </Button>
          <Button variant="ghost" onClick={() => window.history.back()}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DoctorSummary;