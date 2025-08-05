import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  Search, 
  FileText, 
  Settings 
} from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planner', label: 'Course Planner', icon: Calendar },
    { id: 'requirements', label: 'Requirements', icon: CheckSquare },
    { id: 'discovery', label: 'Course Discovery', icon: Search },
    { id: 'records', label: 'Academic Record', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id as ViewType)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-gt-navy text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gt-navy'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-gt-gold' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}