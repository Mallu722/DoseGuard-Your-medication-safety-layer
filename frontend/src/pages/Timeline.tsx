import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AppLayout from '../layouts/AppLayout';

interface TimelineEvent {
  id: string;
  date: string;
  type: string;
  description: string;
  source: string;
}

const Timeline: React.FC = () => {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    // Load demo data
    const loadDemoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/demo/patient');
        const data = await response.json();
        
        setTimeline(data.timeline);
      } catch (error) {
        console.error('Error loading demo data:', error);
      }
    };

    loadDemoData();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Medication Timeline</h1>
          <p className="text-gray-600 mt-1">Track your medication history over time</p>
        </div>

        <Card className="mb-8">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white mb-6">
            <h2 className="text-2xl font-bold mb-2">Your Medication Journey</h2>
            <p className="text-teal-100">A visual timeline of your medication profile and prescription history</p>
          </div>

          {/* Timeline */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-teal-200"></div>
            
            {timeline.map((event, index) => (
              <div key={index} className="relative mb-8 last:mb-0">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-teal-600 rounded-full border-4 border-white shadow z-10"></div>
                
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5m0 10v2m0-10h2m-2 0h2m-2 10h2m-2 0h2" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-teal-700">{new Date(event.date).toLocaleDateString()}</span>
                        <Badge variant={
                          event.type === 'new_prescription' ? 'success' : 
                          event.type === 'medication_added' ? 'info' : 
                          event.type === 'medication_discontinued' ? 'warning' : 'neutral'
                        }>
                          {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                      <p className="text-gray-900 font-medium text-lg mb-1">{event.description}</p>
                      <p className="text-sm text-gray-500">Source: {event.source}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <p className="text-3xl font-bold text-teal-600">{timeline.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total Events</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-teal-600">{timeline.filter(e => e.type === 'new_prescription').length}</p>
            <p className="text-sm text-gray-600 mt-1">New Prescriptions</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-teal-600">{timeline.filter(e => e.type === 'medication_added').length}</p>
            <p className="text-sm text-gray-600 mt-1">Medications Added</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-teal-600">{timeline.filter(e => e.type === 'medication_discontinued').length}</p>
            <p className="text-sm text-gray-600 mt-1">Discontinued</p>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/safety" className="p-4 border border-gray-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-colors">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Run Safety Check</h4>
              <p className="text-sm text-gray-600 mt-1">Check for potential issues with your current medications</p>
            </Link>
            <Link to="/reports" className="p-4 border border-gray-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-colors">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Generate Report</h4>
              <p className="text-sm text-gray-600 mt-1">Create a printable summary for your healthcare provider</p>
            </Link>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Timeline;