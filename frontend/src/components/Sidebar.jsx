import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Globe,
  Calendar,
  Settings,
  FileText,
  X
} from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analyses', icon: BarChart3 },
    { id: 'customers', label: 'Clients', icon: Users },
    { id: 'sales', label: 'Ventes', icon: TrendingUp },
    { id: 'geographic', label: 'Géographique', icon: Globe },
    { id: 'seasonal', label: 'Saisonnier', icon: Calendar },
    { id: 'reports', label: 'Rapports', icon: FileText },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        bg-white h-full w-64 border-r border-gray-200 flex flex-col z-50
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">BikeAnalytics</h1>
              <p className="text-xs text-gray-500">Tableau de Bord</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`sidebar-item w-full text-left ${
                  activeTab === item.id ? 'active' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="sidebar-item w-full text-left"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;