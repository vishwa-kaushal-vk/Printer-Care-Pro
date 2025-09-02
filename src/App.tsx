import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Troubleshooting from './pages/Troubleshooting';
import KnowledgeBase from './pages/KnowledgeBase';
import Videos from './pages/Videos';
import Parts from './pages/Parts';
import Support from './pages/Support';
import Maintenance from './pages/Maintenance';
import { PrinterModel } from './types';

function App() {
  const [selectedPrinter, setSelectedPrinter] = useState<PrinterModel | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar selectedPrinter={selectedPrinter} />
        <main className="pb-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  selectedPrinter={selectedPrinter} 
                  setSelectedPrinter={setSelectedPrinter} 
                />
              } 
            />
            <Route 
              path="/troubleshooting" 
              element={<Troubleshooting selectedPrinter={selectedPrinter} />} 
            />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/parts" element={<Parts selectedPrinter={selectedPrinter} />} />
            <Route path="/support" element={<Support />} />
            <Route path="/maintenance" element={<Maintenance selectedPrinter={selectedPrinter} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;