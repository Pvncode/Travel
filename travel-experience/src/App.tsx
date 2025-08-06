import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JourneyDetailsPage from './pages/JourneyDetailsPage';
import RateRecommendPage from './pages/RateRecommendPage';
import PreserveLifeChangesPage from './pages/PreserveLifeChangesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journey-details" element={<JourneyDetailsPage />} />
          <Route path="/rate-recommend" element={<RateRecommendPage />} />
          <Route path="/preserve-life-changes" element={<PreserveLifeChangesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
