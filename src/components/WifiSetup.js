import React, { useState } from 'react';
import '../styles/WifiSetup.css';

const WifiSetup = ({ networks, onConnect }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Calculate signal strength (1-4) based on RSSI value
  const getSignalStrength = (rssi) => {
    const absRssi = Math.abs(rssi);
    if (absRssi <= 60) return 4;
    if (absRssi <= 70) return 3;
    if (absRssi <= 80) return 2;
    return 1;
  };

  // Handle network selection
  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setShowForm(true);
    // Clear password when selecting a new network
    setPassword('');
  };

  // Handle connection submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedNetwork) {
      onConnect(selectedNetwork.ssid, password);
    }
  };

  return (
    <div className="wifi-setup-card">
      <h2>Connect PinLevel to WiFi</h2>
      
      {networks.length === 0 ? (
        <div className="status-message">
          No WiFi networks found. Please ensure your device is powered on and in setup mode.
        </div>
      ) : (
        <>
          <div className="status-message">
            {networks.length} networks found. Select one to connect:
          </div>
          
          <div className="network-list">
            {networks.map((network, index) => (
              <div 
                key={index} 
                className={`network-item ${selectedNetwork?.ssid === network.ssid ? 'selected' : ''}`}
                onClick={() => handleNetworkSelect(network)}
              >
                <div className="network-info">
                  <span className="network-name">{network.ssid}</span>
                  <span className="network-security">{network.secure ? 'Secured' : 'Open'}</span>
                </div>
                <div className="network-signal">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`signal-bar ${i < getSignalStrength(network.rssi) ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {showForm && selectedNetwork && (
            <form onSubmit={handleSubmit} className="wifi-form">
              <div className="form-group">
                <label htmlFor="ssid">WiFi Network:</label>
                <input 
                  type="text" 
                  id="ssid" 
                  value={selectedNetwork.ssid} 
                  readOnly 
                />
              </div>
              
              {selectedNetwork.secure && (
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter WiFi password" 
                    required
                  />
                </div>
              )}
              
              <button type="submit" className="btn-primary">
                Connect
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default WifiSetup; 