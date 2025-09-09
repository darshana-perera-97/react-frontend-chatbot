# Admin Dashboard

A modern, responsive admin dashboard for managing the chatbot application with a dark theme and Bootstrap styling.

## Features

### 🔐 Authentication
- Login screen with admin/admin credentials
- Session management with localStorage
- Secure token-based authentication

### 📊 Dashboard Layout
- Responsive sidebar navigation
- Collapsible sidebar for mobile devices
- Dark theme with modern UI design
- Bootstrap 5 for responsive design

### 📈 Analytics Page
- **Websites**: Number of connected websites (1)
- **Total Chats**: Total number of chat messages
- **Users**: Number of unique users
- **Recurring Users**: Users who have returned
- Real-time data from backend API
- Quick stats with conversion rates

### 💬 Chats Page
- View all user sessions
- Select individual users to view their chat history
- Real-time chat message display
- User session management
- Message timestamps and confidence scores

### ⚙️ Settings Page
- Placeholder for future settings configuration

## Technology Stack

- **React 19.1.1** - Frontend framework
- **Bootstrap 5.3.2** - CSS framework for responsive design
- **React Router DOM 6.8.1** - Client-side routing
- **Axios 1.6.0** - HTTP client for API calls
- **CSS Variables** - Dark theme implementation

## Installation

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Login
- Username: `admin`
- Password: `admin`

### Navigation
- **Home**: Welcome page (currently empty)
- **Analytics**: View chatbot performance metrics
- **Chats**: Manage and view user conversations
- **Settings**: Configuration options (currently empty)

### Responsive Design
- Mobile-first approach with Bootstrap
- Collapsible sidebar on mobile devices
- Responsive grid system for all screen sizes

## API Integration

The admin dashboard connects to the chatbot backend API:

- `GET /api/sessions` - Fetch all user sessions
- `GET /api/session/:sessionId` - Get specific session data and messages

## Dark Theme

The application uses a custom dark theme with:
- Primary background: `#1a1a1a`
- Secondary background: `#2d2d2d`
- Tertiary background: `#3d3d3d`
- Primary text: `#ffffff`
- Secondary text: `#b0b0b0`
- Accent color: `#007bff`

## File Structure

```
admin/
├── public/
├── src/
│   ├── components/
│   │   ├── Login.js          # Authentication component
│   │   ├── Dashboard.js      # Main layout with sidebar
│   │   ├── Home.js           # Home page (empty)
│   │   ├── Analytics.js      # Analytics dashboard
│   │   ├── Chats.js          # Chat management
│   │   └── Settings.js       # Settings page (empty)
│   ├── App.js                # Main app with routing
│   ├── App.css               # Dark theme styles
│   └── index.css             # Global styles
├── package.json
└── README.md
```

## Development

### Adding New Pages
1. Create a new component in `src/components/`
2. Add the route in `App.js`
3. Add navigation item in `Dashboard.js`

### Styling
- Use CSS variables defined in `App.css` for consistent theming
- Bootstrap classes for responsive design
- Custom classes for specific styling needs

### API Calls
- Use Axios for HTTP requests
- Handle loading states and errors
- Implement proper error handling

## Future Enhancements

- User management system
- Real-time notifications
- Advanced analytics charts
- Export functionality
- System configuration options
- User activity logs