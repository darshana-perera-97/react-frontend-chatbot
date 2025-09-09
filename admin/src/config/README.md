# Configuration Files

This directory contains all configuration files for the admin React application.

## Files Overview

### `api.js`
- **Purpose**: Centralized API configuration
- **Contains**: 
  - Base URL configuration
  - API endpoints definitions
  - Request timeout settings
  - Default headers
- **Usage**: Import `getEndpointUrl` or `API_CONFIG` for API calls

### `environment.js`
- **Purpose**: Environment-specific configuration
- **Contains**:
  - Development, staging, and production settings
  - API URLs for different environments
  - Feature flags (logging, mock data)
  - Timeout configurations
- **Usage**: Import `config` or specific environment flags

## Usage Examples

### Basic API Configuration
```javascript
import { getEndpointUrl } from '../config/api';

// Get full URL for an endpoint
const url = getEndpointUrl('SESSIONS');
// Result: 'http://localhost:5111/api/sessions'

// Get URL with parameters
const url = getEndpointUrl('SESSION_BY_ID', 'session-123');
// Result: 'http://localhost:5111/api/session/session-123'
```

### Using API Service
```javascript
import { apiService } from '../services/apiService';

// Make API calls
const sessions = await apiService.getSessions();
const analytics = await apiService.getAnalytics();
```

### Environment Configuration
```javascript
import { isDevelopment, config } from '../config/environment';

if (isDevelopment) {
  console.log('Running in development mode');
}

console.log('API Base URL:', config.API_BASE_URL);
```

## Environment Variables

You can override configuration using environment variables:

```bash
# .env.development
REACT_APP_API_BASE_URL=http://localhost:5111
REACT_APP_API_TIMEOUT=10000

# .env.production
REACT_APP_API_BASE_URL=https://api.yourdomain.com
REACT_APP_API_TIMEOUT=15000
```

## Benefits

1. **Centralized Configuration**: All API URLs in one place
2. **Environment Management**: Different settings for dev/staging/prod
3. **Easy Maintenance**: Change URLs without touching components
4. **Type Safety**: Consistent endpoint definitions
5. **Error Handling**: Centralized error management
6. **Logging Control**: Environment-based logging

## Migration from Hardcoded URLs

### Before
```javascript
const response = await axios.get('http://localhost:5111/api/sessions');
```

### After
```javascript
import { apiService } from '../services/apiService';
const response = await apiService.getSessions();
```

## Adding New Endpoints

1. Add endpoint to `api.js`:
```javascript
ENDPOINTS: {
  // ... existing endpoints
  NEW_ENDPOINT: '/api/new-endpoint',
  NEW_ENDPOINT_WITH_PARAM: (param) => `/api/new-endpoint/${param}`
}
```

2. Add service method to `apiService.js`:
```javascript
export const apiService = {
  // ... existing methods
  getNewData: () => apiClient.get(getEndpointUrl('NEW_ENDPOINT')),
  getNewDataById: (id) => apiClient.get(getEndpointUrl('NEW_ENDPOINT_WITH_PARAM', id))
};
```

3. Use in components:
```javascript
import { apiService } from '../services/apiService';

const data = await apiService.getNewData();
```
