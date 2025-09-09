
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Define 5 selected messages that will trigger auto-replies
  const autoReplyMessages = {
    'hello': 'Hi there! How can I help you today?',
    'help': 'I\'m here to assist you! What do you need help with?',
    'thanks': 'You\'re welcome! Is there anything else I can help you with?',
    'goodbye': 'Goodbye! Have a great day!',
    'how are you': 'I\'m doing well, thank you for asking! How are you?'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if the message should trigger an auto-reply
    const lowerMessage = inputMessage.toLowerCase().trim();
    const autoReply = autoReplyMessages[lowerMessage];

    if (autoReply) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: autoReply,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000); // 1 second delay for realistic bot response
    }

    setInputMessage('');
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
        <h2>Auto-Reply Chatbot</h2>
        <p>Try: hello, help, thanks, goodbye, how are you</p>
      </div>
      
      <div className="chatbot-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>Welcome! I'm an auto-reply chatbot. I respond to these messages:</p>
            <ul>
              <li>hello</li>
              <li>help</li>
              <li>thanks</li>
              <li>goodbye</li>
              <li>how are you</li>
            </ul>
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
        <button type="submit" className="chatbot-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
