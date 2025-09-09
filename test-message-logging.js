// Test script to demonstrate message logging format
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5111';

async function testMessageLogging() {
  try {
    console.log('🧪 Testing Message Logging Format...\n');
    console.log('📋 Expected Log Format: [ICON] TYPE | SENDER | SESSION_ID | TIMESTAMP | MESSAGE\n');

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
    console.log('📝 Check console for: 🆕 SESSION | CREATED | [sessionId] | [timestamp] | New session created\n');

    // Test 2: Send user message
    console.log('2. Sending user message...');
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
      console.log('✅ User message sent');
      console.log('📝 Check console for:');
      console.log('   📨 INCOMING | USER | [sessionId] | [timestamp] | Hello, I need help with solar energy');
      console.log('   💾 STORED | USER | [sessionId] | [timestamp] | Hello, I need help with solar energy');
      console.log('   🤖 OUTGOING | BOT | [sessionId] | [timestamp] | [bot response]');
      console.log('   💾 STORED | BOT | [sessionId] | [timestamp] | [bot response]\n');
    } else {
      console.log('❌ User message failed');
    }

    // Test 3: Send admin reply
    console.log('3. Sending admin reply...');
    const adminReplyResponse = await fetch(`${API_BASE_URL}/api/admin/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'I can help you with that. What specific questions do you have?',
        sessionId: sessionId
      }),
    });

    if (adminReplyResponse.ok) {
      console.log('✅ Admin reply sent');
      console.log('📝 Check console for:');
      console.log('   👨‍💼 ADMIN | ADMIN | [sessionId] | [timestamp] | I can help you with that...');
      console.log('   💾 STORED | ADMIN | [sessionId] | [timestamp] | I can help you with that...\n');
    } else {
      console.log('❌ Admin reply failed');
    }

    // Test 4: Send another user message
    console.log('4. Sending another user message...');
    const userMessage2Response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What are the benefits of solar panels?',
        sessionId: sessionId,
        senderType: 'user'
      }),
    });

    if (userMessage2Response.ok) {
      console.log('✅ Second user message sent');
      console.log('📝 Check console for:');
      console.log('   📨 INCOMING | USER | [sessionId] | [timestamp] | What are the benefits of solar panels?');
      console.log('   💾 STORED | USER | [sessionId] | [timestamp] | What are the benefits of solar panels?');
      console.log('   🤖 OUTGOING | BOT | [sessionId] | [timestamp] | [bot response]');
      console.log('   💾 STORED | BOT | [sessionId] | [timestamp] | [bot response]\n');
    } else {
      console.log('❌ Second user message failed');
    }

    // Test 5: Send admin message via chat endpoint
    console.log('5. Sending admin message via chat endpoint...');
    const adminMessageResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Let me know if you need more information',
        sessionId: sessionId,
        senderType: 'admin'
      }),
    });

    if (adminMessageResponse.ok) {
      console.log('✅ Admin message via chat endpoint sent');
      console.log('📝 Check console for:');
      console.log('   📨 INCOMING | ADMIN | [sessionId] | [timestamp] | Let me know if you need more information');
      console.log('   👨‍💼 ADMIN | ADMIN | [sessionId] | [timestamp] | Let me know if you need more information');
      console.log('   💾 STORED | ADMIN | [sessionId] | [timestamp] | Let me know if you need more information\n');
    } else {
      console.log('❌ Admin message via chat endpoint failed');
    }

    console.log('🎉 Message logging test completed!');
    console.log('\n📋 Log Format Summary:');
    console.log('🆕 SESSION | CREATED | [sessionId] | [timestamp] | New session created');
    console.log('📨 INCOMING | [sender] | [sessionId] | [timestamp] | [message]');
    console.log('🤖 OUTGOING | BOT | [sessionId] | [timestamp] | [response]');
    console.log('👨‍💼 ADMIN | ADMIN | [sessionId] | [timestamp] | [message]');
    console.log('💾 STORED | [sender] | [sessionId] | [timestamp] | [message preview]');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 5111');
  }
}

// Run the test
testMessageLogging();
