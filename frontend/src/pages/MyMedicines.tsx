import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AppLayout from '../layouts/AppLayout';

interface Medication {
  id: string;
  name: string;
  strength: string;
  frequency: string;
  timing: string;
  source: string;
  status: 'active' | 'inactive';
}

const MyMedicines: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load demo data
    const loadDemoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/demo/patient');
        const data = await response.json();
        
        setMedications(data.medications.map((med: any) => ({
          id: med.id,
          name: med.name,
          strength: med.strength,
          frequency: med.frequency,
          timing: med.timing,
          source: med.source,
          status: 'active'
        })));
      } catch (error) {
        console.error('Error loading demo data:', error);
      }
    };

    loadDemoData();
  }, []);

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'needs_review' && med.status === 'active') ||
      (filter === 'inactive' && med.status === 'inactive');
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Medicines</h1>
            <p className="text-gray-600 mt-1">Manage your medication profile</p>
          </div>
          <Button icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            Add Medicine
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'needs_review', 'inactive'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === f
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Medication Cards */}
        <div className="grid gap-4">
          {filteredMedications.map(med => (
            <Card key={med.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{med.name}</h3>
                    <Badge variant={med.status === 'active' ? 'success' : 'neutral'}>
                      {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Strength</p>
                      <p className="font-medium text-gray-900">{med.strength}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Frequency</p>
                      <p className="font-medium text-gray-900">{med.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Timing</p>
                      <p className="font-medium text-gray-900">{med.timing}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Source</p>
                      <p className="font-medium text-gray-900">{med.source}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMedications.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button>Add Medicine</Button>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default MyMedicines;