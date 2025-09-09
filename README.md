# React Frontend Chatbot with Backend

A modern chatbot application with a React frontend and Node.js/Express backend for generating AI responses.

## Features

- 🤖 **AI-Powered Responses**: Backend generates intelligent responses based on user input
- 🔄 **Real-time Communication**: Frontend communicates with backend via REST API
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🔌 **Connection Status**: Visual indicator showing backend connection status
- 🛡️ **Error Handling**: Graceful fallback when backend is unavailable
- ⚡ **Loading States**: User-friendly loading indicators

## Project Structure

```
react-frontend-chatbot/
├── chatbot/                 # React frontend
│   ├── src/
│   │   ├── Chatbot.js      # Main chatbot component
│   │   ├── Chatbot.css     # Styling
│   │   └── App.js          # App component
│   └── package.json
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Backend server
│   └── package.json
├── landing/                 # Landing page
└── start-services.bat      # Windows startup script
```

## Quick Start

### Option 1: Use the Startup Script (Windows)

1. Double-click `start-services.bat` to start both frontend and backend

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5111`

#### Frontend Setup

1. Navigate to the chatbot directory:
   ```bash
   cd chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Backend API

- `GET /` - API information
- `GET /api/health` - Health check
- `POST /api/chat` - Send message and get response

#### Example API Usage

```javascript
// Send a message to the chatbot
const response = await fetch('http://localhost:5111/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'Hello!' }),
});

const botResponse = await response.json();
console.log(botResponse.text); // Bot's response
```

## Configuration

### Environment Variables

#### Backend (.env)
```
PORT=5111
NODE_ENV=development
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5111
```

## How It Works

### Backend Response Generation

The backend uses intelligent keyword matching and context-aware responses:

1. **Keyword Detection**: Analyzes user input for specific keywords
2. **Context Understanding**: Provides contextual responses based on detected patterns
3. **Confidence Scoring**: Each response includes a confidence level
4. **Fallback Handling**: Graceful handling of unrecognized inputs

### Frontend Integration

1. **API Communication**: Sends user messages to backend via REST API
2. **Connection Monitoring**: Continuously checks backend availability
3. **Error Handling**: Falls back to local responses if backend is unavailable
4. **Loading States**: Shows appropriate loading indicators during API calls

## Customization

### Adding New Response Patterns

Edit `backend/server.js` and modify the `generateResponse` function:

```javascript
if (message.includes('your_keyword')) {
  return {
    text: "Your custom response here",
    confidence: 0.8
  };
}
```

### Styling

Modify `chatbot/src/Chatbot.css` to customize the appearance:

- Colors and gradients
- Layout and spacing
- Animations and transitions
- Responsive breakpoints

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development

```bash
cd chatbot
npm start    # React development server with hot reload
```

## Production Deployment

### Backend Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Configure reverse proxy (nginx)

### Frontend Deployment

1. Build the React app:
   ```bash
   cd chatbot
   npm run build
   ```

2. Serve the `build` folder with a web server

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend is running on port 5111
   - Check firewall settings
   - Verify API URL in frontend

2. **CORS Errors**
   - Backend includes CORS middleware
   - Check if backend is running

3. **Port Already in Use**
   - Change PORT in backend/.env
   - Update REACT_APP_API_URL in frontend

## Technologies Used

### Frontend
- React 19.1.1
- CSS3 with modern features
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- CORS middleware
- Body-parser

## License

MIT License - feel free to use this project for your own applications!
