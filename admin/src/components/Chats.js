import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chats = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5111/api/sessions');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      // Mock data for development
      setSessions([
        {
          sessionId: '117d835a-b043-418a-b6e3-297ab19b1fbe',
          createdTime: '2025-09-09T09:08:46.091Z',
          lastChatTime: '2025-09-09T09:08:53.752Z'
        },
        {
          sessionId: '67552aa8-991a-4eb6-9262-374dd012b88c',
          createdTime: '2025-09-09T09:14:12.864Z',
          lastChatTime: '2025-09-09T09:14:12.864Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatMessages = async (sessionId) => {
    try {
      setChatLoading(true);
      const response = await axios.get(`http://localhost:5111/api/session/${sessionId}`);
      setChatMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      // Mock data for development
      setChatMessages([
        {
          id: 1,
          text: 'Hello, I want to learn about solar energy!',
          sender: 'user',
          timestamp: '2025-09-09T09:08:46.091Z'
        },
        {
          id: 2,
          text: 'Hello! How can I help you today?',
          sender: 'bot',
          timestamp: '2025-09-09T09:08:46.102Z',
          confidence: 0.9
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    fetchChatMessages(session.sessionId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="text-white">Chat Management</h2>
          <p className="text-muted">View and manage user conversations</p>
        </div>
      </div>

      <div className="row">
        {/* Sessions List */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0 text-white">User Sessions</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {sessions.map((session) => (
                  <button
                    key={session.sessionId}
                    className={`list-group-item list-group-item-action ${
                      selectedSession?.sessionId === session.sessionId ? 'active' : ''
                    }`}
                    onClick={() => handleSessionSelect(session)}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">
                        User {session.sessionId.substring(0, 8)}...
                      </h6>
                      <small>{formatDate(session.lastChatTime)}</small>
                    </div>
                    <p className="mb-1 text-muted">
                      Last active: {formatTime(session.lastChatTime)}
                    </p>
                    <small>
                      Created: {formatDate(session.createdTime)}
                    </small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-white">
                {selectedSession ? `Chat with User ${selectedSession.sessionId.substring(0, 8)}...` : 'Select a session to view chat'}
              </h5>
              {selectedSession && (
                <small className="text-muted">
                  {chatMessages.length} messages
                </small>
              )}
            </div>
            <div className="card-body p-0">
              {selectedSession ? (
                <div className="chat-container p-3">
                  {chatLoading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading chat...</span>
                      </div>
                    </div>
                  ) : chatMessages.length > 0 ? (
                    chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`chat-message ${message.sender}`}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <p className="mb-1">{message.text}</p>
                            {message.confidence && (
                              <small className="text-muted">
                                Confidence: {(message.confidence * 100).toFixed(1)}%
                              </small>
                            )}
                          </div>
                          <small className="text-muted ms-2">
                            {formatTime(message.timestamp)}
                          </small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted py-5">
                      <p>No messages in this session</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  <p>Select a user session from the left to view their chat history</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
