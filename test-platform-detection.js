// Test script to verify platform detection
const { Platform } = require('react-native');

console.log('🔍 Testing Platform Detection:');
console.log('Platform.OS:', Platform.OS);

// Simulate the platform detection logic
const getPlatformApiUrl = () => {
  // For Android emulator, use 10.0.2.2 instead of localhost
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  }
  
  // For iOS simulator, use 127.0.0.1
  return 'http://127.0.0.1:4000';
};

const getPlatformGraphQLUrl = () => {
  const apiUrl = getPlatformApiUrl();
  return `${apiUrl}/graphql`;
};

console.log('API URL:', getPlatformApiUrl());
console.log('GraphQL URL:', getPlatformGraphQLUrl());
console.log('Platform Detected:', Platform.OS === 'ios' ? 'iOS (127.0.0.1:4000)' : 'Android (10.0.2.2:4000)');
