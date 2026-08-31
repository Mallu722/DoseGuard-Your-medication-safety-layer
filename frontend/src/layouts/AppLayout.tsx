import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, showSidebar = true }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {showSidebar && <Sidebar />}
      
      <div className={`flex-1 flex flex-col ${showSidebar ? 'ml-64' : ''}`}>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;