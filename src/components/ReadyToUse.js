import React, { useState } from 'react';
import '../styles/ReadyToUse.css';

const ReadyToUse = ({ deviceId }) => {
  const [showLevelData, setShowLevelData] = useState(false);

  // In a real app, this would fetch actual level data from the device
  const mockLevelData = {
    pitchDegrees: 0.3,
    rollDegrees: -0.2,
    isLevel: true
  };

  // Handle view level data button click
  const handleViewLevelData = () => {
    setShowLevelData(true);
  };

  return (
    <div className="ready-to-use-card">
      <h2>Ready to Level Your Pinball Machine</h2>
      
      <div className="celebrate-icon">
        <span role="img" aria-label="celebration">🎉</span>
      </div>
      
      <p className="success-text">
        Your PinLevel device is now set up and ready to use!
      </p>
      
      <div className="instructions">
        <h3>How to use PinLevel:</h3>
        <ol>
          <li>Place the PinLevel device on your pinball playfield</li>
          <li>Use the bubble level display to adjust your machine's levelers</li>
          <li>The display will turn green when your machine is perfectly level</li>
        </ol>
      </div>
      
      {!showLevelData ? (
        <div className="action-buttons">
          <button 
            onClick={handleViewLevelData} 
            className="btn-primary"
          >
            View Level Data
          </button>
        </div>
      ) : (
        <div className="level-data">
          <h3>Current Level Data</h3>
          
          <div className="level-indicator">
            <div className="level-circle">
              <div 
                className={`level-bubble ${mockLevelData.isLevel ? 'level' : 'not-level'}`}
                style={{
                  transform: `translate(${mockLevelData.rollDegrees * 10}px, ${-mockLevelData.pitchDegrees * 10}px)`
                }}
              />
            </div>
          </div>
          
          <div className="level-readings">
            <div className="reading">
              <span className="label">Pitch:</span>
              <span className={`value ${Math.abs(mockLevelData.pitchDegrees) < 0.5 ? 'level' : 'not-level'}`}>
                {mockLevelData.pitchDegrees.toFixed(2)}°
              </span>
            </div>
            <div className="reading">
              <span className="label">Roll:</span>
              <span className={`value ${Math.abs(mockLevelData.rollDegrees) < 0.5 ? 'level' : 'not-level'}`}>
                {mockLevelData.rollDegrees.toFixed(2)}°
              </span>
            </div>
            <div className="reading">
              <span className="label">Status:</span>
              <span className={`value ${mockLevelData.isLevel ? 'level' : 'not-level'}`}>
                {mockLevelData.isLevel ? 'LEVEL' : 'NOT LEVEL'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadyToUse; 