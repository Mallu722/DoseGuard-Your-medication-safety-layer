import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AppLayout from '../layouts/AppLayout';

const PrescriptionUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid file (JPG, PNG, or PDF)');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const intervals = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervals);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    setTimeout(() => {
      clearInterval(intervals);
      setUploading(false);
      setUploadProgress(100);
      alert('Prescription uploaded successfully!');
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add a prescription</h1>
          <p className="text-gray-600 mt-2">Upload your prescription to build your medication profile</p>
        </div>

        {/* Upload Area */}
        <Card className="mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedFile ? selectedFile.name : 'Drag and drop your prescription here'}
            </h3>
            <p className="text-gray-500 mb-6">
              or click to browse
            </p>
            
            {!selectedFile && (
              <>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">JPG</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">PNG</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">PDF</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">Maximum file size: 10MB</p>
              </>
            )}
            
            {selectedFile && !uploading && (
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" onClick={() => setSelectedFile(null)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleUpload}>
                  Upload
                </Button>
              </div>
            )}
            
            {uploading && (
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Uploading...</span>
                  <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 animate-pulse">Reading prescription...</p>
                  <p className="text-sm text-gray-600 animate-pulse">Identifying medicines...</p>
                  <p className="text-sm text-gray-600 animate-pulse">Structuring dosage information...</p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            
            {!selectedFile && !uploading && (
              <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Select File
              </label>
            )}
          </div>
        </Card>

        {/* Privacy Statement */}
        <Card className="bg-blue-50 mb-8">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Privacy protected</h4>
              <p className="text-sm text-gray-600">
                Your uploaded document is processed only to create your medication profile in this prototype. 
                We use industry-standard security measures to protect your health information.
              </p>
            </div>
          </div>
        </Card>

        {/* Alternative Options */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Can't upload a prescription?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/manual-entry" className="p-4 border border-gray-200 rounded-xl hover:border-teal-300 transition-colors">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Enter medicines manually</h4>
              <p className="text-sm text-gray-600 mt-1">Manually add your medications to your profile</p>
            </Link>
            <Link to="/safety" className="p-4 border border-gray-200 rounded-xl hover:border-teal-300 transition-colors">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Check a combination</h4>
              <p className="text-sm text-gray-600 mt-1">Check potential interactions between medications</p>
            </Link>
          </div>
        </Card>

        <div className="flex justify-center gap-4">
          <Link to="/dashboard">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default PrescriptionUpload;