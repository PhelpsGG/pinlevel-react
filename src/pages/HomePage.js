import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/HomePage.css';

const HomePage = () => {
  const [deviceId, setDeviceId] = useState('');
  const [showQR, setShowQR] = useState(false);

  // Generate a random device ID
  const generateRandomDeviceId = () => {
    const chars = '0123456789ABCDEF';
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  // Handle generate QR code button click
  const handleGenerateQR = () => {
    if (!deviceId) {
      setDeviceId(generateRandomDeviceId());
    }
    setShowQR(true);
  };

  // Generate the setup URL
  const getSetupUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/device/${deviceId}`;
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>PinLevel</h1>
        <p className="tagline">Precision leveling for your pinball machine</p>
      </header>
      
      <main>
        <section className="intro-section">
          <h2>How to connect your PinLevel device:</h2>
          <ol>
            <li>Power on your PinLevel device</li>
            <li>Wait for the QR code to appear on the device screen</li>
            <li>Scan the QR code with your phone's camera</li>
            <li>Follow the instructions to connect your device to WiFi</li>
          </ol>
        </section>
        
        <section className="test-qr-section">
          <h2>Test QR Code Generator</h2>
          <p>For development testing, use this tool to generate a QR code that simulates your PinLevel device.</p>
          
          <div className="form-group">
            <label htmlFor="device-id">Device ID (or leave blank for random):</label>
            <input 
              type="text" 
              id="device-id" 
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="e.g., 48A52C31EF"
            />
          </div>
          
          <button onClick={handleGenerateQR} className="btn-primary">
            Generate Test QR Code
          </button>
          
          {showQR && (
            <div className="qr-result">
              <div className="qr-code">
                <QRCodeSVG value={getSetupUrl()} size={200} />
              </div>
              <p>Scan this QR code with your phone to test the setup flow</p>
              <p className="small-text">{getSetupUrl()}</p>
            </div>
          )}
        </section>
      </main>
      
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} PinLevel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage; 