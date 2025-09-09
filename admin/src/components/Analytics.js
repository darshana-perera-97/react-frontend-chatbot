import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    websites: 1,
    chats: 0,
    users: 0,
    recurringUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch analytics data from backend API
      const response = await axios.get('http://localhost:5111/api/analytics');
      const data = response.data;

      setAnalytics({
        websites: data.websites,
        chats: data.totalChats,
        users: data.totalUsers,
        recurringUsers: data.recurringUsers
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Set mock data if API fails
      setAnalytics({
        websites: 1,
        chats: 42,
        users: 15,
        recurringUsers: 8
      });
    } finally {
      setLoading(false);
    }
  };

  const analyticsCards = [
    {
      title: 'Websites',
      value: analytics.websites,
      icon: '🌐',
      color: 'primary',
      description: 'Active websites'
    },
    {
      title: 'Total Chats',
      value: analytics.chats,
      icon: '💬',
      color: 'success',
      description: 'Messages exchanged'
    },
    {
      title: 'Users',
      value: analytics.users,
      icon: '👥',
      color: 'info',
      description: 'Unique visitors'
    },
    {
      title: 'Recurring Users',
      value: analytics.recurringUsers,
      icon: '🔄',
      color: 'warning',
      description: 'Returning users'
    }
  ];

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
        <div className="col-md-8">
          <h2 className="text-white">Analytics Dashboard</h2>
          <p className="text-muted">Overview of your chatbot performance</p>
        </div>
        <div className="col-md-4 text-end">
          <button 
            className="btn btn-outline-primary"
            onClick={fetchAnalytics}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Refreshing...
              </>
            ) : (
              <>
                <i className="fas fa-sync-alt me-2"></i>
                Refresh Data
              </>
            )}
          </button>
        </div>
      </div>

      <div className="row">
        {analyticsCards.map((card, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4">
            <div className="card analytics-card h-100">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '2.5rem' }}>{card.icon}</span>
                </div>
                <h3 className="analytics-number">
                  {card.value}
                </h3>
                <h5 className="text-primary mb-2">{card.title}</h5>
                <p className="text-muted mb-0 small">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0 text-white">Quick Stats</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Conversion Rate</span>
                    <span className="fw-bold text-primary">15.0%</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Avg Chats per User</span>
                    <span className="fw-bold">{analytics.users > 0 ? (analytics.chats / analytics.users).toFixed(1) : 0}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Last Updated</span>
                    <span className="fw-bold">{new Date().toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Status</span>
                    <span className="badge bg-success">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
