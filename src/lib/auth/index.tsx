import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: (token) => {
    console.log('🔐 SignIn called with token:', token ? 'Token provided' : 'No token');
    console.log('👤 User data in token:', token?.user);
    console.log('🔑 Access token length:', token?.access?.length || 0);
    console.log('🔑 Refresh token length:', token?.refresh?.length || 0);
    
    setToken(token);
    console.log('💾 Token stored in storage');
    set({ status: 'signIn', token });
    console.log('✅ Auth state updated to signIn');
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      console.log('🔄 Hydrating auth store...');
      const userToken = getToken();
      console.log('🔑 Token from storage:', userToken ? 'Token found' : 'No token');
      
      if (userToken !== null) {
        console.log('✅ Restoring auth state from token');
        get().signIn(userToken);
      } else {
        console.log('❌ No token found, signing out');
        get().signOut();
      }
    } catch (e) {
      // only to remove eslint error, handle the error properly
      console.error('❌ Error during hydration:', e);
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();

// Export the store for direct access
export { _useAuth };

// Export auth provider and context hooks
export * from './auth-provider';
