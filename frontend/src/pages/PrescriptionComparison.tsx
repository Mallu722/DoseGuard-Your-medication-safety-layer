import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AppLayout from '../layouts/AppLayout';

const PrescriptionComparison: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Prescription Comparison</h1>
          <p className="text-gray-600 mt-1">Compare medication information across different prescriptions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Previous Prescription */}
          <Card>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="neutral">Previous Prescription</Badge>
                <span className="text-sm text-gray-500">August 12, 2026</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Dr. Sharma</h3>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">Aspirin</p>
                <p className="text-sm text-gray-600">75 mg, Once daily, After breakfast</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">Source: Prescription B</p>
            </div>
          </Card>

          {/* Current Prescription */}
          <Card>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="success">Current Prescription</Badge>
                <span className="text-sm text-gray-500">August 18, 2026</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Dr. Sharma</h3>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <p className="font-semibold text-gray-900">Aspirin</p>
                <p className="text-sm text-gray-600">75 mg, Once daily, After breakfast</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="font-semibold text-gray-900">Metformin</p>
                <p className="text-sm text-gray-600">500 mg, Twice daily, After meals</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="font-semibold text-gray-900">Amlodipine</p>
                <p className="text-sm text-gray-600">5 mg, Once daily, Morning</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="font-semibold text-gray-900">Warfarin</p>
                <p className="text-sm text-gray-600">5 mg, Once daily, Evening</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">Source: Prescription A</p>
            </div>
          </Card>
        </div>

        {/* Change Summary */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Changes Detected</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-teal-50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">New Medications Added</p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700">• Metformin 500 mg - Twice daily after meals</p>
                    <p className="text-sm text-gray-700">• Amlodipine 5 mg - Once daily in the morning</p>
                    <p className="text-sm text-gray-700">• Warfarin 5 mg - Once daily in the evening</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">No Changes</p>
                  <p className="text-sm text-gray-700">
                    Aspirin dosage and instructions remain unchanged between prescriptions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2">Important Note</p>
                <p className="text-sm text-gray-700">
                  Changes in medication lists should be confirmed with your healthcare professional 
                  if they were unexpected. Always verify any changes against your actual prescriptions.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← Back to prescriptions
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PrescriptionComparison;