import { getItem, removeItem, setItem } from '@/lib/storage';

const TOKEN = 'token';
console.log('🔑 Token storage key:', TOKEN);

export type TokenType = {
  access: string;
  refresh: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
};

export const getToken = () => {
  try {
    console.log('🔍 Getting token from storage with key:', TOKEN);
    const token = getItem<TokenType>(TOKEN);
    console.log('🔑 Token retrieved:', token ? 'Token found' : 'No token');
    if (token) {
      console.log('👤 User data in token:', token.user);
      console.log('🔑 Access token length:', token.access?.length || 0);
    }
    return token;
  } catch (error) {
    console.warn('Failed to get auth token:', error);
    // Clear corrupted token
    removeToken();
    return null;
  }
};

export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => {
  console.log('💾 Setting token in storage with key:', TOKEN);
  console.log('👤 User data being stored:', value.user);
  console.log('🔑 Access token length being stored:', value.access?.length || 0);
  setItem<TokenType>(TOKEN, value);
};
