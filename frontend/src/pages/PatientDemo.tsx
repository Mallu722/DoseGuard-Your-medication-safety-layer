import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AppLayout from '../layouts/AppLayout';

const PatientDemo: React.FC = () => {
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load demo data
    const loadDemoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/demo/patient');
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error('Error loading demo data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDemoData();
  }, []);

  const runDemoSequence = async () => {
    setLoading(true);
    
    // Step 1: Show prescription upload
    setCurrentStep('Uploading prescription...');
    setProgress(10);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 2: Simulate AI extraction
    setCurrentStep('Extracting medication information...');
    setProgress(40);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 3: Show medication list
    setCurrentStep('Verifying medication details...');
    setProgress(60);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 4: Run safety analysis
    setCurrentStep('Running safety analysis...');
    setProgress(80);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 5: Show results
    setCurrentStep('Loading safety signals...');
    setProgress(100);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoading(false);
    navigate('/dashboard');
  };

  if (loading && !patient) {
    return (
      <AppLayout showSidebar={false}>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">DoseGuard Demo</h1>
            <p className="text-xl text-gray-600 mb-8">Experience how DoseGuard helps patients understand their medications</p>
            <Button 
              size="lg" 
              onClick={runDemoSequence}
              disabled={loading}
            >
              {loading ? 'Loading Demo...' : 'Start 90-second Demo'}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              This demo loads realistic patient data for demonstration purposes
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo Patient</h1>
          <p className="text-gray-600">Realistic patient data for demonstration purposes</p>
        </div>

        {/* Patient Card */}
        <Card className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-3xl font-bold text-teal-700">
              AR
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{patient?.name}</h2>
              <p className="text-gray-600">Age: {patient?.age} | Gender: {patient?.gender}</p>
              <Badge variant="warning">DEMO DATA</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-600">{patient?.medications?.length || 0}</p>
              <p className="text-sm text-gray-600">Medicines</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-600">{patient?.prescriptions?.length || 0}</p>
              <p className="text-sm text-gray-600">Prescriptions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{patient?.safetySignals?.length || 0}</p>
              <p className="text-sm text-gray-600">Review Items</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Last prescription</p>
              <p className="font-medium text-gray-900">{patient?.lastPrescriptionDate}</p>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-700">
              <strong>Demo Mode:</strong> This is demonstration patient data. In a production application, 
              users would upload their own prescriptions.
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Button variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            View Dashboard
          </Button>
          <Button variant="outline" size="lg" onClick={runDemoSequence}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Full Demo Sequence
          </Button>
        </div>

        {/* Safety Signals */}
        {patient?.safetySignals && patient.safetySignals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Safety Signals Found</h2>
            <div className="space-y-4">
              {patient.safetySignals.map((signal: any) => (
                <Card key={signal.id} className={`border-l-4 ${signal.severity === 'high' ? 'border-l-red-500' : 'border-l-amber-500'}`}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <svg className={`w-6 h-6 ${signal.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={signal.severity === 'high' ? 'danger' : 'warning'}>
                          {signal.severity === 'high' ? 'High Priority' : 'Medium Priority'}
                        </Badge>
                        <Badge variant="neutral">{signal.type}</Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{signal.description}</h3>
                      <p className="text-sm text-gray-600 mb-2">{signal.explanation}</p>
                      <div className="bg-teal-50 p-2 rounded text-sm">
                        <span className="font-medium text-teal-700">Next step:</span> {signal.recommendedAction}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Discussion List */}
        {patient?.discussionList && patient.discussionList.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Discussion Questions</h2>
            <div className="space-y-3">
              {patient.discussionList.map((item: any) => (
                <Card key={item.id}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{item.question}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="secondary" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PatientDemo;