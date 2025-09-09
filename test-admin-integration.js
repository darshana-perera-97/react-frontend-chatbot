// Test script to verify admin integration endpoints
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5111';

async function testAdminIntegration() {
  try {
    console.log('🧪 Testing Admin Integration Endpoints...\n');

    // Test 1: Analytics endpoint
    console.log('1. Testing analytics endpoint...');
    const analyticsResponse = await fetch(`${API_BASE_URL}/api/analytics`);
    
    if (analyticsResponse.ok) {
      const analyticsData = await analyticsResponse.json();
      console.log('✅ Analytics endpoint working!');
      console.log(`   - Websites: ${analyticsData.websites}`);
      console.log(`   - Total Chats: ${analyticsData.totalChats}`);
      console.log(`   - Total Users: ${analyticsData.totalUsers}`);
      console.log(`   - Recurring Users: ${analyticsData.recurringUsers}`);
      console.log(`   - Conversion Rate: ${analyticsData.conversionRate}%`);
      console.log(`   - Avg Chats per Session: ${analyticsData.avgChatsPerSession}`);
    } else {
      console.log('❌ Analytics endpoint failed');
    }

    // Test 2: Chat stats endpoint
    console.log('\n2. Testing chat stats endpoint...');
    const chatStatsResponse = await fetch(`${API_BASE_URL}/api/chat-stats`);
    
    if (chatStatsResponse.ok) {
      const chatStatsData = await chatStatsResponse.json();
      console.log('✅ Chat stats endpoint working!');
      console.log(`   - Total Messages: ${chatStatsData.totalMessages}`);
      console.log(`   - User Messages: ${chatStatsData.userMessages}`);
      console.log(`   - Bot Messages: ${chatStatsData.botMessages}`);
      console.log(`   - Avg Response Time: ${chatStatsData.avgResponseTime}s`);
      console.log(`   - Sessions with Messages: ${chatStatsData.sessionsWithMessages}`);
      
      if (chatStatsData.topUserMessages.length > 0) {
        console.log('   - Top User Messages:');
        chatStatsData.topUserMessages.forEach((msg, index) => {
          console.log(`     ${index + 1}. "${msg.text}" (${msg.count} times)`);
        });
      }
    } else {
      console.log('❌ Chat stats endpoint failed');
    }

    // Test 3: Sessions endpoint
    console.log('\n3. Testing sessions endpoint...');
    const sessionsResponse = await fetch(`${API_BASE_URL}/api/sessions`);
    
    if (sessionsResponse.ok) {
      const sessionsData = await sessionsResponse.json();
      console.log('✅ Sessions endpoint working!');
      console.log(`   - Total Sessions: ${sessionsData.length}`);
      
      if (sessionsData.length > 0) {
        console.log('   - Sample Session:');
        const sampleSession = sessionsData[0];
        console.log(`     - ID: ${sampleSession.sessionId}`);
        console.log(`     - Created: ${sampleSession.createdTime}`);
        console.log(`     - Last Chat: ${sampleSession.lastChatTime}`);
      }
    } else {
      console.log('❌ Sessions endpoint failed');
    }

    // Test 4: CORS headers
    console.log('\n4. Testing CORS configuration...');
    const corsResponse = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'OPTIONS'
    });
    
    if (corsResponse.headers.get('access-control-allow-origin')) {
      console.log('✅ CORS configured correctly');
      console.log(`   - Allowed Origins: ${corsResponse.headers.get('access-control-allow-origin')}`);
    } else {
      console.log('❌ CORS not configured properly');
    }

    console.log('\n🎉 Admin integration test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Start the backend server: cd backend && node server.js');
    console.log('2. Start the admin dashboard: cd admin && npm start');
    console.log('3. Open http://localhost:3000 and login with admin/admin');
    console.log('4. Check the Analytics page for real-time data');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 5111');
  }
}

// Run the test
testAdminIntegration();
