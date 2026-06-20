import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudyTracker from './components/StudyTracker';
import ExamCountdown from './components/ExamCountdown';
import CGPACalculator from './components/CGPACalculator';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':    return <Dashboard />;
      case 'tracker':      return <StudyTracker />;
      case 'exams':        return <ExamCountdown />;
      case 'cgpa':         return <CGPACalculator />;
      default:             return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 mesh-bg">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8">
        <div key={activeSection} className="animate-fade-in-up">
          {renderSection()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
