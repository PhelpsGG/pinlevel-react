import axios from 'axios';

// Base URL for the API - would be set to your production API in a real app
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Fetch available WiFi networks
export const getNetworks = async (deviceId) => {
  try {
    // In a real app, this would make an actual API call
    // For now, we'll simulate a response
    
    // Uncomment this for real API calls
    // const response = await axios.get(`${API_URL}/networks/${deviceId}`);
    // return response.data;
    
    // Simulated response for development
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
  } catch (error) {
    console.error('Error fetching networks:', error);
    throw error;
  }
};

// Connect device to WiFi
export const connectToWifi = async (deviceId, ssid, password) => {
  try {
    // In a real app, this would make an actual API call
    // For now, we'll simulate a response
    
    // Uncomment this for real API calls
    // const response = await axios.post(`${API_URL}/connect/${deviceId}`, {
    //   ssid,
    //   password
    // });
    // return response.data;
    
    // Simulated response for development
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
  } catch (error) {
    console.error('Error connecting to WiFi:', error);
    throw error;
  }
};

// Get device status
export const getDeviceStatus = async (deviceId) => {
  try {
    // In a real app, this would make an actual API call
    // For now, we'll simulate a response
    
    // Uncomment this for real API calls
    // const response = await axios.get(`${API_URL}/device/${deviceId}`);
    // return response.data;
    
    // Simulated response for development
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
  } catch (error) {
    console.error('Error fetching device status:', error);
    throw error;
  }
};

// Get level data
export const getLevelData = async (deviceId) => {
  try {
    // In a real app, this would make an actual API call
    // For now, we'll simulate a response
    
    // Uncomment this for real API calls
    // const response = await axios.get(`${API_URL}/level/${deviceId}`);
    // return response.data;
    
    // Simulated response for development
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
  } catch (error) {
    console.error('Error fetching level data:', error);
    throw error;
  }
}; 