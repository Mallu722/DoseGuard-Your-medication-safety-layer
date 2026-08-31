import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppLayout from '../layouts/AppLayout';

const Reports: React.FC = () => {
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
            <p className="text-gray-600">Loading report data...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const generateReport = () => {
    // In a real app, this would generate a PDF
    alert('Report generated! In a production app, this would download a PDF document.');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and manage your medication reports</p>
        </div>

        {/* Patient Summary */}
        <Card className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">DoseGuard Medication Discussion Summary</h2>
              <p className="text-gray-600 mt-1">Generated from patient-provided medication information</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Patient</p>
              <p className="font-medium text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-500 mt-1">Age: {patient.age} | Gender: {patient.gender}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 py-4 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-900">01 September 2026</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Medicines</p>
              <p className="font-medium text-gray-900">{patient.medications.length} medicines</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Items to Discuss</p>
              <p className="font-medium text-amber-600">{patient.safetySignals.length} items</p>
            </div>
          </div>

          {/* Medications to Review */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Medication concerns to review</h3>
            <div className="space-y-3">
              {patient.safetySignals.map((signal: any) => (
                <div key={signal.id} className="p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="font-medium text-gray-900">{signal.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{signal.description}</p>
                  <p className="text-sm text-gray-600">
                    Medications: {signal.medications.join(' + ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Questions for Healthcare Professional */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Questions for my healthcare professional</h3>
            <div className="space-y-3">
              {patient.discussionList.map((item: any) => (
                <div key={item.id} className="p-4 bg-blue-50 rounded-xl flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{item.question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600">
            <p>
              Generated from patient-provided medication information. This summary is intended to support 
              discussion with a qualified healthcare professional.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" onClick={generateReport}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </Button>
            <Button variant="outline" onClick={() => alert('Share functionality would open in production')}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </Button>
          </div>
        </Card>

        {/* Recent Reports */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {[
              { date: '2026-09-01', type: 'Safety Check', items: 2 },
              { date: '2026-08-18', type: 'Medication Review', items: 1 },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Report from {new Date(report.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{report.type} - {report.items} items reviewed</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="secondary" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;