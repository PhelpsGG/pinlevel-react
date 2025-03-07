import axios from 'axios';

// This will dynamically look for the device on the local network
// For direct mode when device is in AP mode, it will try to connect to the device's local IP
const getDeviceEndpoint = (deviceId) => {
  // When in local network, the device will be available at this IP when in AP mode
  const directModeIP = '192.168.4.1';
  
  // Check if we're currently connected to the device's AP
  // This is a heuristic - if we're on a network that starts with PinLevel_
  const isConnectedToDeviceAP = () => {
    // In a browser, you can't directly check the SSID for security reasons
    // Instead, we'll try to reach the device's local endpoint
    return window.location.hostname === 'pinlevel.local' || 
           window.location.hostname === directModeIP;
  };
  
  if (isConnectedToDeviceAP()) {
    return `http://${directModeIP}/api`;
  }
  
  // If we're not in direct mode, we'll use a cloud service or local server
  // In a real production app, this would be your cloud API endpoint
  return process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
};

// Helper function to determine if we should use real or mock API
const shouldUseMockAPI = () => {
  // Check if we're in development mode and not connected to a real device
  return process.env.NODE_ENV === 'development' && 
         !window.location.hostname.includes('pinlevel');
};

// Fetch available WiFi networks from the device
export const getNetworks = async (deviceId) => {
  try {
    if (shouldUseMockAPI()) {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return {
        success: true,
        networks: [
          { ssid: 'Home Network', secure: true, rssi: -65 },
          { ssid: 'Guest Network', secure: true, rssi: -70 },
          { ssid: 'Public WiFi', secure: false, rssi: -75 },
          { ssid: 'Neighbor\'s WiFi', secure: true, rssi: -80 },
          { ssid: 'Office Network', secure: true, rssi: -60 }
        ]
      };
    }
    
    // For real device connection
    const API_URL = getDeviceEndpoint(deviceId);
    const response = await axios.get(`${API_URL}/networks`, {
      headers: { 'Device-ID': deviceId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching networks:', error);
    throw error;
  }
};

// Connect device to WiFi
export const connectToWifi = async (deviceId, ssid, password) => {
  try {
    if (shouldUseMockAPI()) {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      return {
        success: true,
        message: 'Device connected successfully',
        device: {
          id: deviceId,
          connected: true,
          wifiStatus: `Connected to ${ssid}`,
          lastSeen: new Date().toISOString()
        }
      };
    }
    
    // For real device connection
    const API_URL = getDeviceEndpoint(deviceId);
    const response = await axios.post(`${API_URL}/connect`, {
      ssid,
      password
    }, {
      headers: { 'Device-ID': deviceId }
    });
    return response.data;
  } catch (error) {
    console.error('Error connecting to WiFi:', error);
    throw error;
  }
};

// Get device status
export const getDeviceStatus = async (deviceId) => {
  try {
    if (shouldUseMockAPI()) {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return {
        success: true,
        device: {
          id: deviceId,
          connected: true,
          wifiStatus: 'Connected to Home Network',
          lastSeen: new Date().toISOString()
        }
      };
    }
    
    // For real device connection
    const API_URL = getDeviceEndpoint(deviceId);
    const response = await axios.get(`${API_URL}/status`, {
      headers: { 'Device-ID': deviceId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching device status:', error);
    throw error;
  }
};

// Get level data
export const getLevelData = async (deviceId) => {
  try {
    if (shouldUseMockAPI()) {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Generate slightly random values each time
      const pitchDegrees = (Math.random() * 0.6 - 0.3).toFixed(2);
      const rollDegrees = (Math.random() * 0.6 - 0.3).toFixed(2);
      const isLevel = Math.abs(pitchDegrees) < 0.5 && Math.abs(rollDegrees) < 0.5;
      
      return {
        success: true,
        levelData: {
          pitchDegrees: parseFloat(pitchDegrees),
          rollDegrees: parseFloat(rollDegrees),
          isLevel: isLevel
        }
      };
    }
    
    // For real device connection
    const API_URL = getDeviceEndpoint(deviceId);
    const response = await axios.get(`${API_URL}/level`, {
      headers: { 'Device-ID': deviceId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching level data:', error);
    throw error;
  }
}; 