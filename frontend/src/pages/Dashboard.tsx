import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Sidebar from '../layouts/Sidebar';
import AppLayout from '../layouts/AppLayout';

interface Medication {
  name: string;
  strength: string;
  frequency: string;
  timing: string;
  source: string;
  confidence: 'High' | 'Medium' | 'Low';
}

interface SafetySignal {
  id: string;
  type: 'Duplicate Therapy' | 'Interaction Signal' | 'Schedule Inconsistency';
  severity: 'low' | 'medium' | 'high';
  medications: string[];
  description: string;
  explanation: string;
  recommendedAction: string;
}

interface DiscussionItem {
  id: string;
  question: string;
  status: 'pending' | 'discussed' | 'resolved';
}

const Dashboard: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [safetySignals, setSafetySignals] = useState<SafetySignal[]>([]);
  const [discussionList, setDiscussionList] = useState<DiscussionItem[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load demo data
    const loadDemoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/demo/patient');
        const data = await response.json();
        
        setMedications(data.medications);
        setSafetySignals(data.safetySignals);
        setDiscussionList(data.discussionList);
        setTimeline(data.timeline);
      } catch (error) {
        console.error('Error loading demo data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDemoData();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading medication profile...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Good morning, Ananya</h1>
            <p className="text-gray-600 mt-1">Here's your medication safety overview</p>
          </div>
          <Button icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}>
            Upload Prescription
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current medicines</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{medications.length}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Needs review</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{safetySignals.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Potential duplicates</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{safetySignals.filter(s => s.type === 'Duplicate Therapy').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5m0 10v2m0-10h2m-2 0h2m-2 10h2m-2 0h2" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last checked</p>
                <p className="text-lg font-bold text-gray-900 mt-1">Today, 10:42 AM</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Safety Pulse Component */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Medication Safety Pulse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <p className="text-sm text-gray-600 mb-2">Medication profile analyzed</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{medications.length}</p>
                        <p className="text-sm text-gray-500">Medicines</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{3}</p>
                        <p className="text-sm text-gray-500">Prescriptions</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{2}</p>
                        <p className="text-sm text-gray-500">Prescribing dates</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">2</p>
                        <p className="text-sm text-gray-500">Review dates</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5m0 10v2m0-10h2m-2 0h2m-2 10h2m-2 0h2" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Duplicate therapy</p>
                        <p className="text-sm text-gray-600">1 item needs review</p>
                        <Link to="/safety" className="text-teal-600 text-sm mt-1 inline-block">View evidence →</Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Interaction signal</p>
                        <p className="text-sm text-gray-600">1 item needs review</p>
                        <Link to="/safety" className="text-teal-600 text-sm mt-1 inline-block">View evidence →</Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Schedule inconsistency</p>
                        <p className="text-sm text-gray-600">0 detected</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Missing information</p>
                        <p className="text-sm text-gray-600">1 item</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Items */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Medication Review</h2>
            <Link to="/safety">
              <Button variant="outline" size="sm">View all</Button>
            </Link>
          </div>
          
          <div className="grid gap-4">
            {safetySignals.map(signal => (
              <Card key={signal.id} className="border-l-4 border-l-red-500">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="danger">{signal.severity === 'high' ? 'High Priority' : signal.severity === 'medium' ? 'Medium Priority' : 'Low Priority'}</Badge>
                      <Badge variant="warning">{signal.type}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{signal.description}</h3>
                    <p className="text-gray-600 mb-3">{signal.explanation}</p>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">Recommended next step:</p>
                      <p className="text-sm text-gray-600">{signal.recommendedAction}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="sm">Why was this flagged?</Button>
                      <Button variant="outline" size="sm">Add to discussion list</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Discussion List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Discussion List</h2>
            <Link to="/timeline">
              <Button variant="outline" size="sm">View all</Button>
            </Link>
          </div>
          
          <div className="grid gap-4">
            {discussionList.map(item => (
              <Card key={item.id}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2">{item.question}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.status === 'pending' ? 'warning' : item.status === 'discussed' ? 'info' : 'success'}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500">Added on {new Date(item.id === 'disc-001' ? '2026-09-01T10:45:00Z' : item.id).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Link to="/timeline">
              <Button variant="outline" size="sm">View all</Button>
            </Link>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
            {timeline.slice(0, 3).map((event, index) => (
              <div key={index} className="relative mb-6">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-teal-600 rounded-full border-4 border-white shadow"></div>
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-teal-600 font-medium">{new Date(event.date).toLocaleDateString()}</span>
                        <Badge variant={event.type === 'new_prescription' ? 'success' : event.type === 'medication_added' ? 'info' : event.type === 'medication_discontinued' ? 'warning' : 'neutral'}>
                          {event.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </Badge>
                      </div>
                      <p className="text-gray-900 font-medium">{event.description}</p>
                      <p className="text-sm text-gray-500 mt-1">Source: {event.source}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;