import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CoursePlanner } from './components/CoursePlanner';
import { RequirementsTracker } from './components/RequirementsTracker';
import { CourseDiscovery } from './components/CourseDiscovery';
import { AcademicRecord } from './components/AcademicRecord';
import { UserProfile } from './components/UserProfile';
import { AppProvider } from './context/AppContext';

export type ViewType = 'dashboard' | 'planner' | 'requirements' | 'discovery' | 'records' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'planner':
        return <CoursePlanner />;
      case 'requirements':
        return <RequirementsTracker />;
      case 'discovery':
        return <CourseDiscovery />;
      case 'records':
        return <AcademicRecord />;
      case 'profile':
        return <UserProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} />
          <main className="flex-1 p-6">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;