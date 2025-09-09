# Solar Energy Sales Chatbot

A specialized AI-powered chatbot for solar energy sales, featuring a React frontend and Node.js/Express backend with OpenAI integration.

## Features

- ☀️ **Solar Expert AI**: Powered by OpenAI GPT-3.5-turbo with specialized solar sales training
- 💬 **Sales-Focused Conversations**: Expert responses about solar panels, costs, savings, and financing
- 🔄 **Real-time Communication**: Frontend communicates with backend via REST API
- 📱 **Responsive Design**: Beautiful, modern UI optimized for customer interactions
- 🔌 **Connection Status**: Visual indicator showing backend connection status
- 🛡️ **Error Handling**: Graceful fallback with solar-specific responses when backend is unavailable
- ⚡ **Loading States**: User-friendly loading indicators
- 🎯 **Sales Persona**: Sarah, an experienced solar energy consultant with 8+ years experience

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
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5111
NODE_ENV=development
```

#### Frontend (.env)
```
REACT_APP_API_URL=https://web-chatbot-backend-05sr.onrender.com
```

## How It Works

### Backend Response Generation

The backend uses OpenAI GPT-3.5-turbo with a specialized solar sales prompt:

1. **AI-Powered Responses**: Uses OpenAI's language model for intelligent, contextual responses
2. **Solar Sales Expertise**: Trained with comprehensive solar energy knowledge and sales techniques
3. **Persona-Based**: Responds as Sarah, an experienced solar consultant with specific personality traits
4. **Fallback System**: Solar-specific fallback responses when OpenAI is unavailable
5. **Confidence Scoring**: Each response includes a confidence level based on AI certainty

### Frontend Integration

1. **API Communication**: Sends user messages to backend via REST API
2. **Connection Monitoring**: Continuously checks backend availability
3. **Error Handling**: Falls back to local responses if backend is unavailable
4. **Loading States**: Shows appropriate loading indicators during API calls

## Customization

### Customizing the Solar Sales Prompt

Edit `backend/server.js` and modify the `SOLAR_SALES_PROMPT` constant:

```javascript
const SOLAR_SALES_PROMPT = `You are Sarah, an expert solar energy sales consultant...
// Modify the prompt to change personality, expertise areas, or selling points
`;
```

### Adding New Fallback Responses

Edit the `fallbackResponses` object in the `generateResponse` function:

```javascript
const fallbackResponses = {
  'your_keyword': 'Your custom solar response here',
  // Add more fallback responses
};
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
