import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppLayout from '../layouts/AppLayout';

const Help: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Help & Safety</h1>
          <p className="text-gray-600 mt-1">Get help using DoseGuard</p>
        </div>

        {/* Safety Information */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Medical Disclaimer</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong className="text-red-700">DoseGuard does not diagnose conditions, prescribe medicines, or replace professional medical advice.</strong>
                </p>
                <p>
                  This application provides informational safety support and helps you organize medication information 
                  to discuss with your healthcare provider.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Important Safety Information:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Never stop or change medication without consulting a healthcare professional</li>
                    <li>Always verify medication information against original prescriptions</li>
                    <li>Use DoseGuard as a discussion tool, not a medical diagnostic tool</li>
                    <li>For emergencies, contact local emergency services immediately</li>
                  </ul>
                </div>
                <p>
                  If you are experiencing a medical emergency, contact local emergency services or seek immediate medical care.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900 mb-1">How does DoseGuard analyze my medications?</h3>
              <p className="text-sm text-gray-600">
                DoseGuard uses a combination of automated extraction from prescriptions and database-backed 
                medication relationship checks. The AI helps with extraction and explanation, but safety checks 
                use deterministic algorithms and medication databases.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900 mb-1">Is my medication information private?</h3>
              <p className="text-sm text-gray-600">
                Yes, we use industry-standard security measures to protect your health information. 
                However, this is a prototype and not a HIPAA-compliant system.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900 mb-1">What should I do with flagged items?</h3>
              <p className="text-sm text-gray-600">
                Flagged items are meant to spark discussion with your healthcare professional. Never make 
                medication changes based solely on DoseGuard findings. Always consult with a qualified 
                healthcare provider before making any changes.
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-medium text-gray-900 mb-1">Can I use DoseGuard for family members?</h3>
              <p className="text-sm text-gray-600">
                Yes, you can create separate profiles for family members. Each profile maintains its own 
                medication information and safety analysis.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Support</h2>
          <p className="text-gray-600 mb-6">
            Have questions or need help? We're here to assist you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@doseguard.example</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Live Chat</p>
                <p className="text-sm text-gray-600">Available Mon-Fri, 9am-6pm</p>
              </div>
            </div>
            <Button variant="primary" className="w-full">Contact Support</Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Help;