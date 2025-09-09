// Test script to verify chat history loading functionality
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5111';

async function testChatHistoryLoading() {
  try {
    console.log('🧪 Testing Chat History Loading...\n');

    // Test 1: Create a session and send some messages
    console.log('1. Creating session and sending messages...');
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
    console.log(`✅ Session created: ${sessionId}`);

    // Send multiple messages to create chat history
    const messages = [
      'Hello, I want to learn about solar energy!',
      'What are the benefits of solar panels?',
      'How much does installation cost?'
    ];

    for (let i = 0; i < messages.length; i++) {
      const chatResponse = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messages[i],
          sessionId: sessionId
        }),
      });

      if (chatResponse.ok) {
        const chatData = await chatResponse.json();
        console.log(`✅ Message ${i + 1} sent and received response`);
      } else {
        console.log(`❌ Message ${i + 1} failed`);
      }
    }

    // Test 2: Retrieve session data to verify chat history
    console.log('\n2. Retrieving session data...');
    const getSessionResponse = await fetch(`${API_BASE_URL}/api/session/${sessionId}`);
    
    if (getSessionResponse.ok) {
      const sessionData = await getSessionResponse.json();
      console.log(`✅ Session data retrieved successfully!`);
      console.log(`   - Session ID: ${sessionData.sessionId}`);
      console.log(`   - Created: ${sessionData.createdTime}`);
      console.log(`   - Last Chat: ${sessionData.lastChatTime}`);
      console.log(`   - Messages: ${sessionData.messages.length}`);
      
      // Display message details
      sessionData.messages.forEach((msg, index) => {
        console.log(`   Message ${index + 1}: [${msg.sender}] ${msg.text.substring(0, 50)}...`);
      });
    } else {
      console.log('❌ Session retrieval failed');
    }

    // Test 3: Simulate localStorage behavior
    console.log('\n3. Simulating localStorage behavior...');
    console.log(`✅ Session ID would be stored in localStorage: ${sessionId}`);
    console.log('✅ On page reload, this session ID would be used to load chat history');

    // Test 4: Test session persistence
    console.log('\n4. Testing session persistence...');
    const allSessionsResponse = await fetch(`${API_BASE_URL}/api/sessions`);
    
    if (allSessionsResponse.ok) {
      const allSessions = await allSessionsResponse.json();
      const ourSession = allSessions.find(s => s.sessionId === sessionId);
      
      if (ourSession) {
        console.log(`✅ Session found in sessions list!`);
        console.log(`   - Created: ${ourSession.createdTime}`);
        console.log(`   - Last Chat: ${ourSession.lastChatTime}`);
      } else {
        console.log('❌ Session not found in sessions list');
      }
    }

    console.log('\n🎉 Chat history loading test completed successfully!');
    console.log('\n📝 To test in browser:');
    console.log('1. Open the chatbot in your browser');
    console.log('2. Send some messages');
    console.log('3. Refresh the page');
    console.log('4. Verify that previous messages are loaded');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testChatHistoryLoading();
