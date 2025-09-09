// Environment Configuration
const ENV = process.env.NODE_ENV || 'development';

const ENVIRONMENTS = {
  development: {
    API_BASE_URL: 'http://localhost:5111',
    API_TIMEOUT: 10000,
    ENABLE_LOGGING: true,
    MOCK_DATA: true
  },
  production: {
    API_BASE_URL: 'https://your-production-api.com',
    API_TIMEOUT: 15000,
    ENABLE_LOGGING: false,
    MOCK_DATA: false
  },
  staging: {
    API_BASE_URL: 'https://your-staging-api.com',
    API_TIMEOUT: 12000,
    ENABLE_LOGGING: true,
    MOCK_DATA: false
  }
};

// Get current environment configuration
export const config = ENVIRONMENTS[ENV];

// Environment-specific constants
export const isDevelopment = ENV === 'development';
export const isProduction = ENV === 'production';
export const isStaging = ENV === 'staging';

// API Configuration based on environment
export const ENV_API_CONFIG = {
  BASE_URL: config.API_BASE_URL,
  TIMEOUT: config.API_TIMEOUT,
  ENABLE_LOGGING: config.ENABLE_LOGGING,
  MOCK_DATA: config.MOCK_DATA
};

export default config;
