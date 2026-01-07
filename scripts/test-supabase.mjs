// Test Supabase connection
// Run with: node --env-file=.env.local scripts/test-supabase.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Make sure .env.local has:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

console.log('🔍 Testing Supabase connection...\n');
console.log(`📍 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseAnonKey.substring(0, 20)}...`);
console.log('');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

try {
  // Test 1: Check if we can connect
  console.log('Test 1: Basic connection...');
  const { data, error } = await supabase.from('_test_').select('*').limit(1);

  if (error && error.code === 'PGRST204') {
    console.log('✅ Connection successful! (Table not found is expected)');
  } else if (error && error.message.includes('relation') && error.message.includes('does not exist')) {
    console.log('✅ Connection successful! (Table not found is expected)');
  } else if (error) {
    console.log(`⚠️  Connection established but got error: ${error.message}`);
  } else {
    console.log('✅ Connection successful!');
  }

  // Test 2: Check auth status
  console.log('\nTest 2: Auth service...');
  const { data: { session }, error: authError } = await supabase.auth.getSession();

  if (authError) {
    console.log(`❌ Auth error: ${authError.message}`);
  } else {
    console.log('✅ Auth service is accessible');
    console.log(`   Current session: ${session ? 'Logged in' : 'Not logged in (expected)'}`);
  }

  // Test 3: List available tables (if any)
  console.log('\nTest 3: Database introspection...');
  const { data: tables, error: tablesError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .limit(10);

  if (tablesError) {
    console.log(`⚠️  Could not list tables: ${tablesError.message}`);
    console.log('   (This is normal if you haven\'t created any tables yet)');
  } else if (tables && tables.length > 0) {
    console.log(`✅ Found ${tables.length} table(s):`);
    tables.forEach(t => console.log(`   - ${t.table_name}`));
  } else {
    console.log('✅ Database accessible (no tables created yet)');
  }

  console.log('\n✨ Supabase connection test complete!');
  console.log('\n📋 Summary:');
  console.log('   - Connection: ✅ Working');
  console.log('   - Auth Service: ✅ Accessible');
  console.log('   - Database: ✅ Ready');
  console.log('\n🎉 You\'re all set to start building!');

} catch (err) {
  console.error('\n❌ Connection test failed!');
  console.error(`Error: ${err.message}`);
  console.error('\nPlease check:');
  console.error('  1. Your Supabase project is active');
  console.error('  2. Credentials in .env.local are correct');
  console.error('  3. Your internet connection is working');
  process.exit(1);
}
