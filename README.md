# PinLevel Web Application

This is the web application for the PinLevel device, which helps pinball machine owners ensure their games are properly leveled for optimal gameplay.

## Features

- QR code scanning for easy device pairing
- WiFi configuration interface for the PinLevel device
- Real-time level monitoring and visualization
- Responsive design that works on mobile devices

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/pinlevel-react.git
   cd pinlevel-react
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Usage

### Testing with the QR Code Generator

1. Navigate to the home page
2. Use the "Test QR Code Generator" to create a test QR code
3. Scan the QR code with your phone to simulate the device setup flow

### Production Setup

For production deployment:

```
npm run build
```

This builds the app for production to the `build` folder.

## API Integration

The application is designed to work with the PinLevel device API. In development mode, it uses mocked API responses. In production, update the `REACT_APP_API_URL` environment variable to point to your actual API server.

## Project Structure

- `src/components` - Reusable UI components
- `src/pages` - Main application pages
- `src/services` - API service integrations
- `src/styles` - Component-specific styles
- `src/utils` - Utility functions

## Technology Stack

- React
- React Router
- Socket.IO for real-time updates
- Axios for API requests
- CSS for styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [QRCode.react](https://github.com/zpao/qrcode.react) for QR code generation
- [Socket.IO](https://socket.io/) for real-time communication
- [React Router](https://reactrouter.com/) for routing
