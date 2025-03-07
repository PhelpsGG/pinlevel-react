import React from 'react';
import '../styles/SetupProgress.css';

const SetupProgress = ({ currentStep }) => {
  return (
    <div className="setup-progress">
      <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'complete' : ''}`}>
        <span className="step-number">1</span>
        <span className="step-text">Connect to WiFi</span>
      </div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'complete' : ''}`}>
        <span className="step-number">2</span>
        <span className="step-text">Device Connected</span>
      </div>
      <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
        <span className="step-number">3</span>
        <span className="step-text">Ready to Use</span>
      </div>
    </div>
  );
};

export default SetupProgress; 