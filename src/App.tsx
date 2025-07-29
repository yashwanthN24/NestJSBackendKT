import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import RequestFlowPage from './pages/RequestFlowPage';
import DecoratorsPage from './pages/DecoratorsPage';
import DIPage from './pages/DIPage';
import ModulesPage from './pages/ModulesPage';
import RLSPage from './pages/RLSPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/request-flow" element={<RequestFlowPage />} />
            <Route path="/decorators" element={<DecoratorsPage />} />
            <Route path="/di" element={<DIPage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/rls" element={<RLSPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;