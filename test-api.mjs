// Quick API test script
// Run with: node test-api.mjs (after starting dev server)

const BASE_URL = 'http://localhost:3000';

async function testAPI(endpoint, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log(`   Endpoint: ${endpoint}`);
  
  try {
    const start = Date.now();
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const duration = Date.now() - start;
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Duration: ${duration}ms`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (Array.isArray(data)) {
        console.log(`   ✅ Success: ${data.length} items`);
        console.log(`   Sample:`, JSON.stringify(data[0], null, 2).split('\n').slice(0, 10).join('\n'));
      } else if (data.items) {
        console.log(`   ✅ Success: ${data.items.length}/${data.total} items`);
        console.log(`   Sample:`, JSON.stringify(data.items[0], null, 2).split('\n').slice(0, 10).join('\n'));
      } else {
        console.log(`   ✅ Success:`, JSON.stringify(data, null, 2).split('\n').slice(0, 15).join('\n'));
      }
    } else {
      console.log(`   ❌ Failed:`, await response.text());
    }
  } catch (error) {
    console.log(`   ❌ Error:`, error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log('   Make sure dev server is running on port 3000\n');
  
  await testAPI('/api/budaya/kabupatens', 'Get All Kabupatens');
  await testAPI('/api/budaya?limit=5', 'Get Budaya Items (limit 5)');
  await testAPI('/api/budaya?kabupaten=padang', 'Filter by Kabupaten (Padang)');
  await testAPI('/api/budaya?type=kuliner', 'Filter by Type (Kuliner)');
  await testAPI('/api/budaya?search=rendang', 'Search (rendang)');
  
  console.log('\n✨ Tests completed!\n');
}

runTests();
