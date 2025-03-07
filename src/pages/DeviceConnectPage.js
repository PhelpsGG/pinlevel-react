import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * This component acts as a bridge when scanning a QR code directly
 * It parses the URL parameters and redirects to the proper device setup page
 */
const DeviceConnectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse the URL parameters
    const searchParams = new URLSearchParams(location.search);
    const deviceId = searchParams.get('deviceId');

    if (deviceId) {
      // If we have a deviceId, redirect to the device setup page
      console.log('Device ID detected:', deviceId);
      navigate(`/device/${deviceId}`, { replace: true });
    } else {
      // If no deviceId is found, redirect to the home page
      console.log('No device ID found in parameters');
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  // Show a loading screen while redirecting
  return (
    <div className="device-connect-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: 'var(--background-color)',
      color: 'var(--text-color)'
    }}>
      <h2>Connecting to PinLevel Device...</h2>
      <div className="loading-spinner" style={{
        width: '50px',
        height: '50px',
        border: '5px solid rgba(255, 255, 255, 0.1)',
        borderTopColor: 'var(--primary-color)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginTop: '20px'
      }}></div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default DeviceConnectPage; 