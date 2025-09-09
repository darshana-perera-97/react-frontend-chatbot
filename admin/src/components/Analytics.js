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
      color: 'primary'
    },
    {
      title: 'Total Chats',
      value: analytics.chats,
      icon: '💬',
      color: 'success'
    },
    {
      title: 'Users',
      value: analytics.users,
      icon: '👥',
      color: 'info'
    },
    {
      title: 'Recurring Users',
      value: analytics.recurringUsers,
      icon: '🔄',
      color: 'warning'
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
              <div className="card-body text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>{card.icon}</span>
                </div>
                <h3 className={`analytics-number text-${card.color}`}>
                  {card.value}
                </h3>
                <h5 className="text-white">{card.title}</h5>
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
                  <p className="text-muted">
                    <strong>Conversion Rate:</strong> {analytics.users > 0 ? ((analytics.recurringUsers / analytics.users) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-muted">
                    <strong>Average Chats per User:</strong> {analytics.users > 0 ? (analytics.chats / analytics.users).toFixed(1) : 0}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted">
                    <strong>Last Updated:</strong> {new Date().toLocaleString()}
                  </p>
                  <p className="text-muted">
                    <strong>Status:</strong> <span className="text-success">Active</span>
                  </p>
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
