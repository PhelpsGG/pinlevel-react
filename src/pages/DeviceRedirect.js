import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Simple redirect component for QR code scanning
 * Uses a much shorter URL path to make QR codes more scannable
 */
const DeviceRedirect = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams();

  useEffect(() => {
    console.log('Device redirect triggered for device:', deviceId);
    
    if (deviceId) {
      // Redirect to the full device setup page
      navigate(`/device/${deviceId}`, { replace: true });
    } else {
      // If no device ID, redirect to home
      navigate('/', { replace: true });
    }
  }, [deviceId, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#121212',
      color: 'white'
    }}>
      <h1>Connecting to PinLevel...</h1>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        borderTop: '3px solid white',
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

export default DeviceRedirect; 