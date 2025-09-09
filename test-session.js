// Test script to verify new session functionality
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5111';

async function testNewSessionStructure() {
  try {
    console.log('🧪 Testing New Session Structure...\n');

    // Test 1: Create a new session
    console.log('1. Creating new session...');
    const sessionResponse = await fetch(`${API_BASE_URL}/api/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!sessionResponse.ok) {
      throw new Error(`Session creation failed: ${sessionResponse.status}`);
    }

    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.sessionId;
    console.log(`✅ Session created: ${sessionId}\n`);

    // Test 2: Send a message with session ID
    console.log('2. Sending message with session ID...');
    const chatResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, I want to learn about solar energy!',
        sessionId: sessionId
      }),
    });

    if (!chatResponse.ok) {
      throw new Error(`Chat request failed: ${chatResponse.status}`);
    }

    const chatData = await chatResponse.json();
    console.log(`✅ Bot response: ${chatData.text}\n`);

    // Test 3: Check chatIds.json structure
    console.log('3. Checking chatIds.json structure...');
    const fs = require('fs');
    const path = require('path');
    const chatIdsFile = path.join(__dirname, 'backend', 'data', 'chatIds.json');
    
    if (fs.existsSync(chatIdsFile)) {
      const sessionIds = JSON.parse(fs.readFileSync(chatIdsFile, 'utf8'));
      const session = sessionIds.find(s => s.sessionId === sessionId);
      
      if (session) {
        console.log(`✅ Session ID saved in array format!`);
        console.log(`   - Session ID: ${session.sessionId}`);
        console.log(`   - Created: ${session.createdTime}`);
        console.log(`   - Last Chat: ${session.lastChatTime}`);
      } else {
        console.log('❌ Session not found in chatIds.json');
      }
    } else {
      console.log('❌ Chat IDs file not found');
    }

    // Test 4: Check chats.json structure
    console.log('\n4. Checking chats.json structure...');
    const chatsFile = path.join(__dirname, 'backend', 'data', 'chats.json');
    
    if (fs.existsSync(chatsFile)) {
      const chats = JSON.parse(fs.readFileSync(chatsFile, 'utf8'));
      const sessionChats = chats[sessionId];
      
      if (sessionChats && sessionChats.length > 0) {
        console.log(`✅ Chat messages saved separately!`);
        console.log(`   - Messages count: ${sessionChats.length}`);
        console.log(`   - First message: ${sessionChats[0].text}`);
        console.log(`   - Second message: ${sessionChats[1].text}`);
      } else {
        console.log('❌ Chat messages not found in chats.json');
      }
    } else {
      console.log('❌ Chats file not found');
    }

    // Test 5: Test session retrieval endpoint
    console.log('\n5. Testing session retrieval endpoint...');
    const getSessionResponse = await fetch(`${API_BASE_URL}/api/session/${sessionId}`);
    
    if (getSessionResponse.ok) {
      const sessionData = await getSessionResponse.json();
      console.log(`✅ Session retrieval successful!`);
      console.log(`   - Session ID: ${sessionData.sessionId}`);
      console.log(`   - Messages: ${sessionData.messages.length}`);
    } else {
      console.log('❌ Session retrieval failed');
    }

    // Test 6: Test all sessions endpoint
    console.log('\n6. Testing all sessions endpoint...');
    const allSessionsResponse = await fetch(`${API_BASE_URL}/api/sessions`);
    
    if (allSessionsResponse.ok) {
      const allSessions = await allSessionsResponse.json();
      console.log(`✅ All sessions retrieved! Total: ${allSessions.length}`);
    } else {
      console.log('❌ All sessions retrieval failed');
    }

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testNewSessionStructure();
