import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = ({ children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/analytics', icon: '📊', label: 'Analytics' },
    { path: '/chats', icon: '💬', label: 'Chats' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  const handleLogout = () => {
    onLogout();
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'col-1' : 'col-md-3 col-lg-2'} p-0`}>
        <div className="d-flex flex-column h-100">
          {/* Header */}
          <div className="p-3 border-bottom">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-link text-white p-0 me-2"
                onClick={toggleSidebar}
              >
                <i className="fas fa-bars"></i>
              </button>
              {!sidebarCollapsed && (
                <h5 className="mb-0 text-white">Admin Panel</h5>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-grow-1 p-3">
            <ul className="nav nav-pills flex-column">
              {menuItems.map((item) => (
                <li className="nav-item mb-2" key={item.path}>
                  <button
                    className={`nav-link w-100 text-start d-flex align-items-center ${
                      location.pathname === item.path ? 'active' : ''
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className="me-3">{item.icon}</span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 border-top">
            <button
              className="btn btn-outline-danger w-100"
              onClick={handleLogout}
            >
              {!sidebarCollapsed && <span>Logout</span>}
              <i className="fas fa-sign-out-alt ms-2"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content flex-grow-1 ${sidebarCollapsed ? 'col-11' : 'col-md-9 col-lg-10'}`}>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
