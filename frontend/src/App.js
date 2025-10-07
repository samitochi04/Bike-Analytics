import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Sales from './pages/Sales';
import Geographic from './pages/Geographic';
import Seasonal from './pages/Seasonal';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'customers':
        return <Customers />;
      case 'sales':
        return <Sales />;
      case 'geographic':
        return <Geographic />;
      case 'seasonal':
        return <Seasonal />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main className="flex-1 overflow-auto lg:ml-0">
        {/* Mobile header with hamburger menu */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">BikeAnalytics</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
}

export default App;