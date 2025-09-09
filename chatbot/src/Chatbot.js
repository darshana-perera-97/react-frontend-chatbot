
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Backend API configuration
  const API_BASE_URL = 'https://69.197.187.24:5111';
  // const API_BASE_URL = 'https://localhost:5111';
  // const API_BASE_URL = 'http://localhost:5111';
  // const API_BASE_URL = 'https://web-chatbot-backend-w956.onrender.com';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize session and check backend connection on component mount
  useEffect(() => {
    initializeSession();
    checkBackendConnection();
  }, []);

  // Initialize or retrieve session ID
  const initializeSession = async () => {
    try {
      // Check if session ID exists in localStorage
      let existingSessionId = localStorage.getItem('chatbotSessionId');
      
      if (existingSessionId) {
        // Verify session exists on backend and load chat history
        setIsLoadingHistory(true);
        try {
          const response = await fetch(`${API_BASE_URL}/api/session/${existingSessionId}`);
          
          if (response.ok) {
            const sessionData = await response.json();
            setSessionId(existingSessionId);
            
            // Load previous chat messages
            if (sessionData.messages && sessionData.messages.length > 0) {
              const formattedMessages = sessionData.messages.map(msg => ({
                id: msg.id,
                text: msg.text,
                sender: msg.sender,
                timestamp: new Date(msg.timestamp).toLocaleTimeString(),
                confidence: msg.confidence
              }));
              setMessages(formattedMessages);
              console.log(`Loaded ${formattedMessages.length} previous messages for session:`, existingSessionId);
            } else {
              console.log('No previous messages found for session:', existingSessionId);
            }
          } else {
            // Session not found on backend, create new one
            console.log('Session not found on backend, creating new session');
            await createNewSession();
          }
        } catch (error) {
          console.error('Error loading session from backend:', error);
          // If backend is unavailable, still use the session ID from localStorage
          setSessionId(existingSessionId);
        } finally {
          setIsLoadingHistory(false);
        }
      } else {
        // No session ID in localStorage, create new session
        await createNewSession();
      }
    } catch (error) {
      console.error('Error initializing session:', error);
      setIsLoadingHistory(false);
    }
  };

  // Helper function to create a new session
  const createNewSession = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newSessionId = data.sessionId;
        setSessionId(newSessionId);
        localStorage.setItem('chatbotSessionId', newSessionId);
        console.log('Created new session:', newSessionId);
      } else {
        console.error('Failed to create session');
      }
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  };

  const checkBackendConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Backend connection failed:', error);
      setConnectionStatus('error');
    }
  };

  const sendMessageToBackend = async (message) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          sessionId: sessionId 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const botResponse = await response.json();
      return botResponse;
    } catch (error) {
      console.error('Error sending message to backend:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    // Try to get response from backend
    try {
      const botResponse = await sendMessageToBackend(currentInput);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      // Fallback to local responses if backend is unavailable
      console.warn('Backend unavailable, using fallback responses');
      const fallbackResponse = getFallbackResponse(currentInput);
      if (fallbackResponse) {
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: fallbackResponse,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
      } else {
        // Show error message
        const errorMessage = {
          id: Date.now() + 1,
          text: "I'm sorry, I'm having trouble connecting to my backend service. Please try again later.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  // Fallback responses for when backend is unavailable
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim();
    const fallbackResponses = {
      'hello': 'Hello! I\'m Sarah from SolarMax Solutions. I\'m currently in offline mode, but I\'d love to help you learn about solar energy. What questions do you have?',
      'hi': 'Hi there! I\'m excited to help you explore solar options. I\'m running offline right now, but I can still answer basic questions about solar energy.',
      'help': 'I\'m here to help with solar energy questions! I can discuss costs, savings, installation, and financing options. What would you like to know?',
      'solar': 'Great question about solar! Solar panels can significantly reduce your electricity bills and increase your home\'s value. The average system pays for itself in 6-8 years.',
      'cost': 'Solar costs have dropped dramatically! A typical residential system costs $15,000-$25,000 before the 30% federal tax credit. Most homeowners see positive ROI within 6-8 years.',
      'savings': 'Solar can save you thousands! Most homeowners see 50-90% reduction in electricity bills, saving $1,000-$3,000 annually on average.',
      'thanks': 'You\'re very welcome! I\'m passionate about helping people switch to clean energy. Is there anything else about solar you\'d like to explore?',
      'goodbye': 'Thank you for your time! If you\'re interested in solar, I\'d love to schedule a free consultation when I\'m back online. Have a great day!'
    };
    return fallbackResponses[lowerMessage];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Start a new session
  const startNewSession = async () => {
    try {
      // Clear current session from localStorage
      localStorage.removeItem('chatbotSessionId');
      
      // Clear current messages
      setMessages([]);
      
      // Create new session
      await createNewSession();
      
      console.log('Started new session');
    } catch (error) {
      console.error('Error starting new session:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-top">
          <h2>☀️ Solar Energy Assistant</h2>
          <button 
            onClick={startNewSession}
            className="new-session-btn"
            title="Start a new conversation"
          >
            🔄 New Session
          </button>
        </div>
        <div className="connection-status">
          <span className={`status-indicator ${connectionStatus}`}>
            {connectionStatus === 'connected' ? '🟢 Connected' :
              connectionStatus === 'error' ? '🔴 Offline' : '🟡 Connecting...'}
          </span>
          {sessionId && (
            <span className="session-info">
              Session: {sessionId.substring(0, 8)}...
            </span>
          )}
        </div>
        <p>Hi! I'm Sarah, your solar energy expert. Ask me about solar panels, savings, financing, or anything solar-related!</p>
      </div>

      <div className="chatbot-messages">
        {isLoadingHistory && (
          <div className="loading-message">
            <p>📚 Loading chat history...</p>
          </div>
        )}

        {connectionStatus === 'error' && messages.length === 0 && !isLoadingHistory && (
          <div className="welcome-message">
            <p className="offline-notice">
              ⚠️ Currently running in offline mode. Some features may be limited.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{message.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-send-button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
