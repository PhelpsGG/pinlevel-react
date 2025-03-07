import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DeviceSetupPage.css';

// Components will be imported here later
import SetupProgress from '../components/SetupProgress';
import WifiSetup from '../components/WifiSetup';
import DeviceConnected from '../components/DeviceConnected';
import ReadyToUse from '../components/ReadyToUse';

// Will use a real API service later
import { getNetworks, connectToWifi, getDeviceStatus } from '../services/deviceService';

const DeviceSetupPage = () => {
  const { deviceId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [networks, setNetworks] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState({
    connected: false,
    wifiStatus: 'Not connected',
    lastSeen: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch available networks
    const fetchNetworks = async () => {
      try {
        setLoading(true);
        const data = await getNetworks(deviceId);
        setNetworks(data.networks);
        setError(null);
      } catch (err) {
        console.error('Error fetching networks:', err);
        setError('Failed to fetch available WiFi networks. Please ensure your device is powered on and in setup mode.');
      } finally {
        setLoading(false);
      }
    };

    // Function to check device status
    const checkDeviceStatus = async () => {
      try {
        const data = await getDeviceStatus(deviceId);
        setDeviceStatus(data.device);
        
        // If device is already connected, move to the appropriate step
        if (data.device && data.device.connected) {
          setCurrentStep(3);
        }
      } catch (err) {
        console.error('Error checking device status:', err);
        // If we can't get the status, we'll stay at step 1
      }
    };

    // Initial loads
    checkDeviceStatus();
    if (currentStep === 1) {
      fetchNetworks();
    }

    // Poll for device status every 5 seconds if we're waiting for connection
    let statusInterval;
    if (currentStep === 2) {
      statusInterval = setInterval(() => {
        checkDeviceStatus();
      }, 5000);
    }

    return () => {
      if (statusInterval) clearInterval(statusInterval);
    };
  }, [deviceId, currentStep]);

  // Handle WiFi network selection and connection
  const handleConnect = async (ssid, password) => {
    try {
      setLoading(true);
      await connectToWifi(deviceId, ssid, password);
      setCurrentStep(2);
      setError(null);
    } catch (err) {
      console.error('Error connecting to WiFi:', err);
      setError('Failed to connect to WiFi. Please check your password and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Process to next step
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  return (
    <div className="device-setup-container">
      <header className="setup-header">
        <h1>PinLevel Setup</h1>
        <p>Device ID: <span className="device-id">{deviceId}</span></p>
      </header>

      <main>
        <SetupProgress currentStep={currentStep} />

        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error-message">{error}</div>}

        {!loading && (
          <>
            {currentStep === 1 && (
              <WifiSetup 
                networks={networks} 
                onConnect={handleConnect} 
              />
            )}
            
            {currentStep === 2 && (
              <DeviceConnected 
                deviceStatus={deviceStatus} 
                onNext={goToNextStep} 
              />
            )}
            
            {currentStep === 3 && (
              <ReadyToUse deviceId={deviceId} />
            )}
          </>
        )}
      </main>

      <footer className="setup-footer">
        <p>&copy; {new Date().getFullYear()} PinLevel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DeviceSetupPage; 