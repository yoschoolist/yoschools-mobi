import { useCallback } from 'react';

import { getToken, removeToken, setToken } from '@/lib/auth/utils';

export function useApolloAuth() {
  const setAuthToken = useCallback(
    async (token: string, resetStore?: () => Promise<void>) => {
      // Get current token data and update with new access token
      const currentToken = getToken();
      if (currentToken) {
        const updatedToken = { ...currentToken, access: token };
        setToken(updatedToken);
      }
      // Reset Apollo Client cache when token changes
      if (resetStore) {
        await resetStore();
      }
    },
    []
  );

  const getAuthToken = useCallback(() => {
    const token = getToken();
    return token?.access || null;
  }, []);

  const removeAuthToken = useCallback(async (resetStore?: () => Promise<void>) => {
    removeToken();
    // Reset Apollo Client cache when token is removed
    if (resetStore) {
      await resetStore();
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    const token = getToken();
    return !!token?.access;
  }, []);

  return {
    setToken: setAuthToken,
    getToken: getAuthToken,
    removeToken: removeAuthToken,
    isAuthenticated,
  };
}

// Function to get token for Apollo Client context
export function getAuthToken(): string | null {
  try {
    const token = getToken();
    return token?.access || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

// Legacy function for backward compatibility
export function getTokenForApollo() {
  try {
    return getToken();
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
}
