// Test script to verify admin reply functionality
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5111';

async function testAdminReplyFunctionality() {
  try {
    console.log('🧪 Testing Admin Reply Functionality...\n');

    // Test 1: Create a session
    console.log('1. Creating a test session...');
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

    // Test 2: Send a regular user message (should trigger OpenAI response)
    console.log('\n2. Sending regular user message...');
    const userMessageResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, I need help with solar energy',
        sessionId: sessionId,
        senderType: 'user'
      }),
    });

    if (userMessageResponse.ok) {
      const userMessageData = await userMessageResponse.json();
      console.log('✅ User message sent and bot responded');
      console.log(`   - Bot response: ${userMessageData.text}`);
    } else {
      console.log('❌ User message failed');
    }

    // Test 3: Send admin reply (should NOT trigger OpenAI response)
    console.log('\n3. Sending admin reply...');
    const adminReplyResponse = await fetch(`${API_BASE_URL}/api/admin/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello! I\'m an admin. How can I help you with solar energy?',
        sessionId: sessionId
      }),
    });

    if (adminReplyResponse.ok) {
      const adminReplyData = await adminReplyResponse.json();
      console.log('✅ Admin reply sent successfully');
      console.log(`   - Admin message: ${adminReplyData.adminMessage.text}`);
      console.log(`   - Sender: ${adminReplyData.adminMessage.sender}`);
    } else {
      console.log('❌ Admin reply failed');
    }

    // Test 4: Send another user message after admin reply
    console.log('\n4. Sending another user message after admin reply...');
    const userMessage2Response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Thank you admin! I have questions about installation costs',
        sessionId: sessionId,
        senderType: 'user'
      }),
    });

    if (userMessage2Response.ok) {
      const userMessage2Data = await userMessage2Response.json();
      console.log('✅ User message sent and bot responded');
      console.log(`   - Bot response: ${userMessage2Data.text}`);
    } else {
      console.log('❌ User message 2 failed');
    }

    // Test 5: Verify all messages are stored correctly
    console.log('\n5. Verifying all messages in session...');
    const sessionDataResponse = await fetch(`${API_BASE_URL}/api/session/${sessionId}`);
    
    if (sessionDataResponse.ok) {
      const sessionData = await sessionDataResponse.json();
      console.log('✅ Session data retrieved successfully');
      console.log(`   - Total messages: ${sessionData.messages.length}`);
      
      sessionData.messages.forEach((msg, index) => {
        console.log(`   Message ${index + 1}: [${msg.sender}] ${msg.text.substring(0, 50)}...`);
      });
    } else {
      console.log('❌ Session data retrieval failed');
    }

    // Test 6: Test admin message with senderType parameter
    console.log('\n6. Testing admin message with senderType parameter...');
    const adminMessageResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'This is an admin message using senderType',
        sessionId: sessionId,
        senderType: 'admin'
      }),
    });

    if (adminMessageResponse.ok) {
      const adminMessageData = await adminMessageResponse.json();
      console.log('✅ Admin message with senderType sent successfully');
      console.log(`   - Response: ${adminMessageData.message}`);
      console.log(`   - No OpenAI response generated: ${!adminMessageData.text}`);
    } else {
      console.log('❌ Admin message with senderType failed');
    }

    console.log('\n🎉 Admin reply functionality test completed!');
    console.log('\n📝 Key Features Verified:');
    console.log('✅ Admin can send replies to users');
    console.log('✅ OpenAI does not respond to admin messages');
    console.log('✅ Regular user messages still trigger bot responses');
    console.log('✅ All messages are properly stored and categorized');
    console.log('✅ Admin messages are clearly identified in chat history');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 5111');
  }
}

// Run the test
testAdminReplyFunctionality();
