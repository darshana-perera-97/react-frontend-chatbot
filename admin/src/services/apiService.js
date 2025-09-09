import axios from 'axios';
import { API_CONFIG, getEndpointUrl } from '../config/api';
import { isDevelopment } from '../config/environment';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Request interceptor for logging (development only)
apiClient.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    if (isDevelopment) {
      console.error('❌ API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message);
    
    // Handle common error cases
    if (error.response?.status === 404) {
      console.error('API endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('Internal server error');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to backend server');
    }
    
    return Promise.reject(error);
  }
);

// API Service functions
export const apiService = {
  // Session management
  getSessions: () => apiClient.get(getEndpointUrl('SESSIONS')),
  getSession: (sessionId) => apiClient.get(getEndpointUrl('SESSION_BY_ID', sessionId)),
  createSession: () => apiClient.post(getEndpointUrl('SESSION')),
  
  // Chat functionality
  sendMessage: (message, sessionId, senderType = 'user') => 
    apiClient.post(getEndpointUrl('CHAT'), {
      message,
      sessionId,
      senderType
    }),
  
  // Admin functionality
  sendAdminReply: (message, sessionId) =>
    apiClient.post(getEndpointUrl('ADMIN_REPLY'), {
      message,
      sessionId
    }),
  
  // Analytics
  getAnalytics: () => apiClient.get(getEndpointUrl('ANALYTICS')),
  getChatStats: () => apiClient.get(getEndpointUrl('CHAT_STATS')),
  
  // Health check
  healthCheck: () => apiClient.get(getEndpointUrl('HEALTH'))
};

export default apiClient;
