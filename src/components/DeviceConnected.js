import React, { useEffect } from 'react';
import '../styles/DeviceConnected.css';

const DeviceConnected = ({ deviceStatus, onNext }) => {
  // Format the lastSeen date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  // Auto proceed to next step after 3 seconds
  useEffect(() => {
    if (deviceStatus && deviceStatus.connected) {
      const timer = setTimeout(() => {
        onNext();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [deviceStatus, onNext]);

  // Extract network name from status
  const getNetworkName = () => {
    if (!deviceStatus || !deviceStatus.wifiStatus) return '-';
    
    // Status format could be "Connected to NetworkName"
    const match = deviceStatus.wifiStatus.match(/Connected to (.+)/i);
    return match ? match[1] : deviceStatus.wifiStatus;
  };

  return (
    <div className="device-connected-card">
      <h2>Device Connected!</h2>
      
      <div className="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
          <circle cx="12" cy="12" r="11" fill="#4caf50" />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white" />
        </svg>
      </div>
      
      <div className="success-message">
        <p>Your PinLevel device is now connected to WiFi.</p>
        <p>Network: <span className="highlight">{getNetworkName()}</span></p>
        <p>Status: <span className="highlight">{deviceStatus?.connected ? 'Connected' : 'Disconnected'}</span></p>
      </div>
      
      <div className="device-info">
        <h3>Device Information</h3>
        <p>Last Seen: <span>{formatDate(deviceStatus?.lastSeen)}</span></p>
      </div>
      
      <p className="progress-message">Proceeding to next step...</p>
    </div>
  );
};

export default DeviceConnected; 