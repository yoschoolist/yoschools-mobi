# Environment Setup for YoSchools Mobile App

## ✅ **Environment Configuration Updated**

The environment configuration has been updated to match the yoschools_mobile_app setup with platform-aware API configuration and GraphQL support.

## 🔧 **Updated Configuration**

### **env.js Changes**
- ✅ Added platform-aware IP configuration
- ✅ Added GRAPHQL_URL and WS_URL support
- ✅ Added authentication configuration
- ✅ Added feature flags
- ✅ Updated app name and bundle IDs

### **Platform-Aware Configuration**
```javascript
// Platform-specific IP configuration
const getPlatformIP = () => {
  const platform = process.env.EXPO_PLATFORM || 'web';
  
  switch (platform) {
    case 'ios':
      return '127.0.0.1'; // iOS Simulator uses localhost
    case 'android':
      return '10.0.2.2'; // Android Emulator uses special IP
    default:
      return '127.0.0.1'; // Default to localhost for web/other platforms
  }
};
```

## 📁 **Environment Files Required**

You need to create the following environment files in your project root:

### **`.env.development`**
```env
# Development Environment Variables
# API Configuration
API_URL=http://10.0.2.2:4000
GRAPHQL_URL=http://10.0.2.2:4000/graphql
WS_URL=ws://10.0.2.2:4000/graphql

# Authentication (Optional for development)
AUTH_CLIENT_ID=
AUTH_DOMAIN=

# Feature Flags
ENABLE_ANALYTICS=false
ENABLE_CRASH_REPORTING=false

# Build-time variables
SECRET_KEY=sabrinahruthnalwoga
```

### **`.env.staging`**
```env
# Staging Environment Variables
# API Configuration
API_URL=https://staging-api.yoschools.com
GRAPHQL_URL=https://staging-api.yoschools.com/graphql
WS_URL=wss://staging-api.yoschools.com/graphql

# Authentication
AUTH_CLIENT_ID=your-staging-client-id
AUTH_DOMAIN=your-staging-domain

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASH_REPORTING=true

# Build-time variables
SECRET_KEY=your-staging-secret-key
```

### **`.env.production`**
```env
# Production Environment Variables
# API Configuration
API_URL=https://api.yoschools.com
GRAPHQL_URL=https://api.yoschools.com/graphql
WS_URL=wss://api.yoschools.com/graphql

# Authentication
AUTH_CLIENT_ID=your-production-client-id
AUTH_DOMAIN=your-production-domain

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASH_REPORTING=true

# Build-time variables
SECRET_KEY=your-production-secret-key
```

## 🌐 **Network Configuration**

### **Development Setup**
- **Android Emulator**: Uses `10.0.2.2:4000` (special IP for accessing host machine)
- **iOS Simulator**: Uses `127.0.0.1:4000` (localhost)
- **Web/Other**: Uses `127.0.0.1:4000` (localhost)

### **API Endpoints**
- **API_URL**: Base API URL for REST endpoints
- **GRAPHQL_URL**: GraphQL endpoint for Apollo Client
- **WS_URL**: WebSocket URL for real-time subscriptions

## 🚀 **Getting Started**

### **1. Create Environment Files**
```bash
# Create the environment files
touch .env.development .env.staging .env.production

# Add the content from above to each file
```

### **2. Start Your API Server**
Make sure your yoschools-api server is running on port 4000:
```bash
# In your yoschools-api project
npm run dev
# or
yarn dev
```

### **3. Start the Mobile App**
```bash
# Clear cache and start
cross-env EXPO_NO_DOTENV=1 expo start --clear

# Or run on iOS
cross-env EXPO_NO_DOTENV=1 expo run:ios

# Or run on Android
cross-env EXPO_NO_DOTENV=1 expo run:android
```

## 🔧 **Apollo Client Integration**

The Apollo Client has been updated to use the new environment configuration:

```typescript
// src/api/common/apollo-client.tsx
const httpLink = createHttpLink({
  uri: Env.GRAPHQL_URL, // Now uses GRAPHQL_URL from environment
});
```

## 📱 **App Configuration**

### **Updated App Details**
- **App Name**: YoSchools Mobile
- **Bundle ID**: com.yoschools.mobi
- **Package Name**: com.yoschools.mobi
- **Scheme**: yoschools-mobi

### **Environment Variables Available**
```typescript
// Available in your app via @env
Env.API_URL          // Base API URL
Env.GRAPHQL_URL      // GraphQL endpoint
Env.WS_URL           // WebSocket URL
Env.AUTH_CLIENT_ID   // Authentication client ID
Env.AUTH_DOMAIN      // Authentication domain
Env.ENABLE_ANALYTICS // Analytics feature flag
Env.ENABLE_CRASH_REPORTING // Crash reporting feature flag
```

## 🔍 **Testing the Setup**

### **1. Verify Environment Loading**
```typescript
import { Env } from '@env';
console.log('API URL:', Env.API_URL);
console.log('GraphQL URL:', Env.GRAPHQL_URL);
```

### **2. Test GraphQL Connection**
```typescript
import { useCurrentUser } from '@/api';
const { user, loading, error } = useCurrentUser();
```

### **3. Test Authentication**
```typescript
import { useLogin } from '@/api';
const { login } = useLogin();
await login('test@example.com', 'password');
```

## 🚨 **Troubleshooting**

### **If you get environment errors:**
1. **Check file permissions**: Make sure `.env.development` is readable
2. **Clear Expo cache**: `expo start --clear`
3. **Restart Metro bundler**: Kill and restart the development server

### **If API calls fail:**
1. **Check your API server**: Ensure yoschools-api is running on port 4000
2. **Verify URLs**: Make sure the URLs in `.env.development` are correct
3. **Check network**: Ensure your device/emulator can reach the API server

### **Platform-specific issues:**
- **Android**: Make sure you're using `10.0.2.2` instead of `localhost`
- **iOS**: Make sure you're using `127.0.0.1` or `localhost`
- **Web**: Make sure your API server allows CORS requests

## 🎯 **Next Steps**

1. **Create the environment files** with the content above
2. **Start your yoschools-api server** on port 4000
3. **Test the GraphQL connection** with the Apollo Client
4. **Verify authentication flow** works correctly
5. **Test on both iOS and Android** platforms

The environment setup is now ready for development! 🚀
