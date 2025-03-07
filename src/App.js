import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import DeviceSetupPage from './pages/DeviceSetupPage';
import DeviceConnectPage from './pages/DeviceConnectPage';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/setup" element={<HomePage />} />
          <Route path="/device" element={<DeviceConnectPage />} />
          <Route path="/device/:deviceId" element={<DeviceSetupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
