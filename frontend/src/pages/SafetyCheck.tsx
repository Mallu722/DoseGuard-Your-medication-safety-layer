import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AppLayout from '../layouts/AppLayout';

interface SafetySignal {
  id: string;
  type: 'Duplicate Therapy' | 'Interaction Signal' | 'Schedule Inconsistency';
  severity: 'low' | 'medium' | 'high';
  medications: string[];
  description: string;
  explanation: string;
  recommendedAction: string;
  isReviewed?: boolean;
}

const SafetyCheck: React.FC = () => {
  const [signals, setSignals] = useState<SafetySignal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<SafetySignal | null>(null);
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);

  useEffect(() => {
    // Load demo data
    const loadDemoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/demo/patient');
        const data = await response.json();
        
        setSignals(data.safetySignals);
      } catch (error) {
        console.error('Error loading demo data:', error);
      }
    };

    loadDemoData();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Safety Check</h1>
            <p className="text-gray-600 mt-1">Medication review and safety analysis</p>
          </div>
          <Button>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Check Combination
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total signals</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{signals.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High priority</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{signals.filter(s => s.severity === 'high').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviewed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{signals.filter(s => s.isReviewed).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Signals */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Flagged Items</h2>
          <div className="grid gap-4">
            {signals.map(signal => (
              <Card 
                key={signal.id} 
                className={`border-l-4 ${signal.severity === 'high' ? 'border-l-red-500' : signal.severity === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      signal.severity === 'high' ? 'bg-red-100' : signal.severity === 'medium' ? 'bg-amber-100' : 'bg-blue-100'
                    }`}>
                      <svg className={`w-5 h-5 ${signal.severity === 'high' ? 'text-red-600' : signal.severity === 'medium' ? 'text-amber-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant={signal.severity === 'high' ? 'danger' : signal.severity === 'medium' ? 'warning' : 'info'}>
                        {signal.severity === 'high' ? 'High Priority' : signal.severity === 'medium' ? 'Medium Priority' : 'Low Priority'}
                      </Badge>
                      <Badge variant="neutral">{signal.type}</Badge>
                      <span className="text-sm text-gray-500">{new Date(signal.id === 'signal-001' ? '2026-09-01T10:30:00Z' : signal.id).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{signal.description}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {signal.medications.map((med, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                          {med}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpandedSignal(expandedSignal === signal.id ? null : signal.id)}
                      className="text-teal-600 text-sm font-medium flex items-center gap-1"
                    >
                      {expandedSignal === signal.id ? 'Hide details' : 'Show details'}
                      <svg className={`w-4 h-4 transition-transform ${expandedSignal === signal.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedSignal === signal.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">Why was this flagged?</p>
                          <p className="text-sm text-gray-600">{signal.explanation}</p>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-lg">
                          <p className="text-sm font-semibold text-teal-900 mb-1">Recommended next step:</p>
                          <p className="text-sm text-teal-700">{signal.recommendedAction}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="primary" size="sm">Add to discussion list</Button>
                          <Button variant="outline" size="sm">View source prescription</Button>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedSignal(signal)}>
                            Why was this flagged?
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Manual Checker */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Manual Safety Check</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine 1</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter medication name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine 2</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter medication name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Optional: Medicine 3</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter medication name (optional)"
              />
            </div>
            <Button variant="primary">Run Safety Check</Button>
            <p className="text-sm text-gray-500">
              This is a screening tool, not a medical diagnosis. Always consult with a healthcare professional.
            </p>
          </div>
        </Card>

        {/* Patient Disclaimer */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Important Safety Information</h4>
              <p className="text-sm text-gray-600">
                DoseGuard provides informational safety support and does not diagnose conditions, 
                prescribe medicines, or replace professional medical advice. If you are experiencing 
                a medical emergency, contact local emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {selectedSignal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Why was this flagged?</h2>
                <button 
                  onClick={() => setSelectedSignal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-teal-900 mb-2">Flagged Reason</p>
                  <p className="text-gray-700">{selectedSignal.explanation}</p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-amber-900 mb-2">Important Context</p>
                  <p className="text-sm text-amber-700">
                    The actual clinical significance depends on the patient's medical history, 
                    dosage, duration, and other medications. Always consult with a healthcare professional.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Recommended Professional Follow-up</p>
                  <p className="text-gray-700">{selectedSignal.recommendedAction}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setSelectedSignal(null)}>Close</Button>
                <Button onClick={() => setSelectedSignal(null)}>Add to discussion list</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SafetyCheck;