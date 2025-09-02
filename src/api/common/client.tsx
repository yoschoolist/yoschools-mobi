import { Env } from '@env';
import { Platform } from 'react-native';
import axios from 'axios';

// Platform-aware API URL configuration
const getPlatformApiUrl = () => {
  // Allow manual override via environment variable (only if it's a custom URL)
  if (Env.API_URL && Env.API_URL.trim() !== '' && !Env.API_URL.includes('127.0.0.1') && !Env.API_URL.includes('10.0.2.2')) {
    return Env.API_URL;
  }
  
  // For Android emulator, use 10.0.2.2 instead of localhost
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000';
  }
  
  // For iOS simulator, use 127.0.0.1
  return 'http://127.0.0.1:4000';
};

export const getPlatformGraphQLUrl = () => {
  const apiUrl = getPlatformApiUrl();
  return `${apiUrl}/graphql`;
};

// Log the current configuration for debugging
console.log('🔧 API Configuration:', {
  platform: Platform.OS,
  apiUrl: getPlatformApiUrl(),
  graphqlUrl: getPlatformGraphQLUrl(),
  envApiUrl: Env.API_URL,
  envGraphqlUrl: Env.GRAPHQL_URL,
  platformDetected: Platform.OS === 'ios' ? 'iOS (127.0.0.1:4000)' : 'Android (10.0.2.2:4000)'
});

// REST API Client
export const client = axios.create({
  baseURL: getPlatformApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GraphQL Client
export const graphqlClient = axios.create({
  baseURL: getPlatformGraphQLUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'x-apollo-operation-name': 'mobile-app',
  },
});

// Request interceptor to add auth token
const addAuthToken = (config: any) => {
  // Get token from auth store
  try {
    const { getToken } = require('@/lib/auth/utils');
    const token = getToken();
    if (token?.access) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }
  } catch (error) {
    console.warn('Failed to get auth token:', error);
  }
  return config;
};

// Response interceptor for error handling
const handleResponseError = (error: any) => {
  if (error.response?.status === 401) {
    // Handle unauthorized - clear auth data and redirect to login
    try {
      const { clearAuthData } = require('@/lib/auth/utils');
      const { signOut } = require('@/lib/auth');
      clearAuthData();
      signOut();
      console.log('Unauthorized access - cleared auth data and redirecting to login');
    } catch (authError) {
      console.error('Failed to handle auth error:', authError);
    }
  }
  return Promise.reject(error);
};

client.interceptors.request.use(addAuthToken);
client.interceptors.response.use(undefined, handleResponseError);

graphqlClient.interceptors.request.use(addAuthToken);
graphqlClient.interceptors.response.use(undefined, handleResponseError);