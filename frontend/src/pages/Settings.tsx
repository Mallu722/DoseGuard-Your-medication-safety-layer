import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppLayout from '../layouts/AppLayout';

const Settings: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({ email: true, push: true });
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

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Customize your DoseGuard experience</p>
        </div>

        {/* Profile Section */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl font-bold text-teal-700">
              {patient?.name ? patient.name.charAt(0) + patient.name.split(' ')[1]?.charAt(0) : 'AR'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patient?.name || 'Ananya Rao'}</h3>
              <p className="text-gray-600">demo mode</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                defaultValue={patient?.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                defaultValue="ananya.rao@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                defaultValue={patient?.age}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Preferences</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">Note: Multilingual support is in development</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Notifications</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email notifications</span>
                  <button
                    onClick={() => handleNotificationChange('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.email ? 'bg-teal-600' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Push notifications</span>
                  <button
                    onClick={() => handleNotificationChange('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.push ? 'bg-teal-600' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Demo Mode */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Demo Mode</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Try Demo Patient</h3>
              <p className="text-sm text-gray-600 mt-1">Load realistic patient data for demonstration purposes</p>
            </div>
            <Button variant="primary" onClick={() => alert('Demo patient data loaded!')}>
              Load Demo Data
            </Button>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy Center</h2>
          <p className="text-gray-600 mb-4">
            Manage your data and privacy settings
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Data Retention</p>
                <p className="text-sm text-gray-600">Your data is retained for 30 days</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-900">Delete My Data</p>
                <p className="text-sm text-red-600">Permanently remove all your information</p>
              </div>
              <Button variant="danger" size="sm" onClick={() => alert('Data deletion confirmation required')}>
                Delete All Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Security</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Confirm new password"
              />
            </div>
            <Button variant="primary">Update Password</Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;