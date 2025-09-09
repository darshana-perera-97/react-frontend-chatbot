import { ENV_API_CONFIG as ENV_CONFIG } from './environment';

// API Configuration
const API_CONFIG = {
  // Backend API base URL
  BASE_URL: ENV_CONFIG.BASE_URL,
  
  // API endpoints
  ENDPOINTS: {
    // Session management
    SESSION: '/api/session',
    SESSION_BY_ID: (sessionId) => `/api/session/${sessionId}`,
    SESSIONS: '/api/sessions',
    
    // Chat functionality
    CHAT: '/api/chat',
    
    // Admin functionality
    ADMIN_REPLY: '/api/admin/reply',
    
    // Analytics
    ANALYTICS: '/api/analytics',
    CHAT_STATS: '/api/chat-stats',
    
    // Health check
    HEALTH: '/api/health'
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: ENV_CONFIG.TIMEOUT,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get endpoint URL
export const getEndpointUrl = (endpointKey, ...params) => {
  const endpoint = API_CONFIG.ENDPOINTS[endpointKey];
  if (typeof endpoint === 'function') {
    return getApiUrl(endpoint(...params));
  }
  return getApiUrl(endpoint);
};

export { API_CONFIG };
export default API_CONFIG;
