import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './index';
import { hydrateAuth } from './index';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  token: any;
  signIn: (token: any) => void;
  signOut: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authStatus = useAuth.use.status();
  const token = useAuth.use.token();
  const signIn = useAuth.use.signIn();
  const signOut = useAuth.use.signOut();

  // Hydrate auth on mount
  useEffect(() => {
    console.log('🔄 AuthProvider: Initializing auth context...');
    hydrateAuth();
  }, []);

  // Determine if user is authenticated
  const isAuthenticated = authStatus === 'signIn' && token !== null;
  const isLoading = authStatus === 'idle';

  // Get user data from token
  const user = token?.user || null;

  // Refresh auth function
  const refreshAuth = () => {
    console.log('🔄 AuthProvider: Refreshing auth state...');
    hydrateAuth();
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    token,
    signIn,
    signOut,
    refreshAuth,
  };

  console.log('🔐 AuthProvider: Auth state updated', {
    status: authStatus,
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    hasToken: !!token,
  });

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Convenience hooks for common auth operations
export function useIsAuthenticated() {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated;
}

export function useUser() {
  const { user } = useAuthContext();
  return user;
}

export function useAuthLoading() {
  const { isLoading } = useAuthContext();
  return isLoading;
}

export function useAuthActions() {
  const { signIn, signOut, refreshAuth } = useAuthContext();
  return { signIn, signOut, refreshAuth };
}
