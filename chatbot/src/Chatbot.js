
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const messagesEndRef = useRef(null);

  // Backend API configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5111';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

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
        body: JSON.stringify({ message }),
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
      'hello': 'Hi there! I\'m running in offline mode. How can I help you?',
      'help': 'I\'m here to assist you! (Note: I\'m currently offline)',
      'thanks': 'You\'re welcome!',
      'goodbye': 'Goodbye! Have a great day!',
      'how are you': 'I\'m doing well, thank you for asking!'
    };
    return fallbackResponses[lowerMessage];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>AI Chatbot with Backend</h2>
        <div className="connection-status">
          <span className={`status-indicator ${connectionStatus}`}>
            {connectionStatus === 'connected' ? '🟢 Connected' : 
             connectionStatus === 'error' ? '🔴 Offline' : '🟡 Connecting...'}
          </span>
        </div>
        <p>Ask me anything! I'm powered by a backend AI service.</p>
      </div>
      
      <div className="chatbot-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>Welcome! I'm an AI chatbot powered by a backend service.</p>
            <p>Try asking me:</p>
            <ul>
              <li>"Hello" or "Hi"</li>
              <li>"Help me with..."</li>
              <li>"What's the time?"</li>
              <li>"How are you?"</li>
              <li>"Tell me about the weather"</li>
            </ul>
            {connectionStatus === 'error' && (
              <p className="offline-notice">
                ⚠️ Currently running in offline mode. Some features may be limited.
              </p>
            )}
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
