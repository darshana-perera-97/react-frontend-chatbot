# New Data Structure Implementation

## Overview
The data storage has been restructured to separate session metadata from chat messages, making it more efficient and easier to manage.

## File Structure

### 1. `./backend/data/chatIds.json`
Stores session metadata in a simple array format:
```json
[
  {
    "sessionId": "uuid-string",
    "createdTime": "2025-09-09T08:55:08.824Z",
    "lastChatTime": "2025-09-09T08:58:14.733Z"
  }
]
```

### 2. `./backend/data/chats.json`
Stores actual chat messages organized by session ID:
```json
{
  "sessionId-uuid": [
    {
      "id": 1757408294595,
      "text": "Hello, I want to learn about solar energy!",
      "sender": "user",
      "timestamp": "2025-09-09T08:58:14.725Z"
    },
    {
      "id": 1757408294725,
      "text": "Hello! How can I assist you with solar energy today?",
      "sender": "bot",
      "timestamp": "2025-09-09T08:58:14.733Z",
      "confidence": 0.9
    }
  ]
}
```

## Backend API Changes

### Updated Functions
- `loadSessionIds()` - Loads session metadata array
- `saveSessionIds()` - Saves session metadata array
- `loadChats()` - Loads chat messages object
- `saveChats()` - Saves chat messages object
- `addMessageToSession()` - Updated to work with new structure

### New API Endpoints
- `GET /api/session/:sessionId` - Get specific session data and messages
- `GET /api/sessions` - Get all session metadata

### Updated Endpoints
- `POST /api/session` - Creates session in new format
- `POST /api/chat` - Stores messages in separate chats.json file

## Benefits of New Structure

1. **Separation of Concerns**: Session metadata and chat messages are stored separately
2. **Better Performance**: Smaller files for session lookups
3. **Easier Management**: Can manage sessions and messages independently
4. **Scalability**: Better for handling large numbers of sessions
5. **Cleaner Data**: Simple array format for session IDs

## Data Flow

1. **Session Creation**:
   - Add entry to `chatIds.json` array
   - Initialize empty array in `chats.json`

2. **Message Storage**:
   - Add message to appropriate session in `chats.json`
   - Update `lastChatTime` in `chatIds.json`

3. **Session Retrieval**:
   - Get session metadata from `chatIds.json`
   - Get messages from `chats.json` using session ID

## Testing

Run the test script to verify the new structure:
```bash
node test-session.js
```

The test will verify:
- Session creation in new format
- Message storage in separate file
- API endpoint functionality
- Data structure integrity
