import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppLayout from '../layouts/AppLayout';

interface Medication {
  name: string;
  strength: string;
  frequency: string;
  timing: string;
}

const ManualEntry: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', strength: '', frequency: '', timing: '' }
  ]);

  const handleInputChange = (index: number, field: keyof Medication, value: string) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', strength: '', frequency: '', timing: '' }]);
  };

  const removeMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Medications saved successfully!');
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manual Medicine Entry</h1>
          <p className="text-gray-600 mt-2">Add your medications manually to your profile</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {medications.map((med, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Medication {index + 1}</h3>
                    {medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedication(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medicine Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={med.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., Metformin"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Strength *
                      </label>
                      <input
                        type="text"
                        required
                        value={med.strength}
                        onChange={(e) => handleInputChange(index, 'strength', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., 500 mg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency *
                      </label>
                      <input
                        type="text"
                        required
                        value={med.frequency}
                        onChange={(e) => handleInputChange(index, 'frequency', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., Twice daily"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timing
                    </label>
                    <input
                      type="text"
                      value={med.timing}
                      onChange={(e) => handleInputChange(index, 'timing', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g., After meals"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button type="button" variant="outline" onClick={addMedication}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Another Medicine
            </Button>

            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                Save Medications
              </Button>
              <Button type="button" variant="secondary" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Or upload a prescription for automated extraction</p>
          <Link to="/prescriptions">
            <Button variant="outline">Upload Prescription</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default ManualEntry;