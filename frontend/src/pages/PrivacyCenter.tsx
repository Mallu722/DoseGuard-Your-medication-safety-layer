import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppLayout from '../layouts/AppLayout';

const PrivacyCenter: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Center</h1>
          <p className="text-gray-600 mt-1">Manage your data and privacy settings</p>
        </div>

        {/* Data Information */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Data</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Prescription Documents</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">
                  3 prescription documents uploaded and processed
                </p>
                <div className="space-y-2">
                  {[
                    { name: 'Prescription A - 18 Aug 2026', status: 'Processed', date: '18 Aug 2026' },
                    { name: 'Prescription B - 12 Aug 2026', status: 'Processed', date: '12 Aug 2026' },
                    { name: 'Prescription C - 02 Jul 2026', status: 'Archived', date: '02 Jul 2026' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${item.status === 'Processed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Medication Profile</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">
                  5 medications currently in your profile
                </p>
                <div className="space-y-1">
                  {['Metformin', 'Amlodipine', 'Aspirin', 'Warfarin', 'Atorvastatin'].map((med, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{med}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Processing Status</h3>
              <div className="bg-teal-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">All data processed securely</span>
                </div>
                <p className="text-sm text-teal-700">
                  Your data is processed locally for demonstration purposes. In production, 
                  industry-standard encryption would be applied.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Retention</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">Data Retention Policy</p>
              <p className="text-sm text-gray-600">
                In this demo version, data is retained for demonstration purposes. 
                In production, we would follow strict data retention policies in 
                accordance with healthcare regulations.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">Your Rights</p>
              <p className="text-sm text-gray-600">
                You have the right to access, correct, or delete your personal data. 
                Please contact support to exercise these rights.
              </p>
            </div>
          </div>
        </Card>

        {/* Delete Data */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Delete My Data</h2>
          <p className="text-gray-600 mb-6">
            Permanently remove all your medication information and prescription data 
            from this demonstration instance.
          </p>
          
          <div className="bg-red-50 p-6 rounded-xl mb-6">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-2">Warning</p>
                <p className="text-sm text-red-700">
                  This action cannot be undone. All your medication information, 
                  prescription data, and safety signals will be permanently deleted.
                </p>
              </div>
            </div>
          </div>

          <Button variant="danger" onClick={() => alert('Data deletion confirmation required')}>
            Delete All Health Data
          </Button>
        </Card>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← Back to Settings
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PrivacyCenter;