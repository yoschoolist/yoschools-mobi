// import { useMutation, useQuery } from '@apollo/client/react';
import { useCallback } from 'react';
import { router } from 'expo-router';

// import { LOGIN, REGISTER, REFRESH_TOKEN, LOGOUT } from '../graphql/mutations';
// import { GET_CURRENT_USER } from '../graphql/queries';
import { signIn, signOut, _useAuth } from '@/lib/auth';
import { login, registerUser, logout, refreshAccessToken, createTokenFromResponse } from '../auth/auth-service';
import type { LoginResponse, RegisterResponse, RefreshTokenResponse, MeResponse } from '../graphql/types';
import type { LoginInput, RegisterInput } from '../auth/auth-service';

// ===============================
// AUTHENTICATION HOOKS
// ===============================

export const useLogin = () => {
  // const [loginMutation, { loading, error }] = useMutation<LoginResponse>(LOGIN);
  const loading = false;
  const error = null;

  const loginWithService = useCallback(async (email: string, password: string) => {
    try {
      console.log('🔐 Login attempt:', { email });

      const response = await login(email, password);
      console.log('📥 Login response received:', response);
      console.log('🔑 Access token in response:', response.access_token ? `Length: ${response.access_token.length}` : 'Missing');
      
      const token = createTokenFromResponse(response);
      console.log('🔧 Token created for auth store:', token);
      console.log('🔑 Access token in created token:', token.access ? `Length: ${token.access.length}` : 'Missing');
      
      // Update auth state
      signIn(token);
      console.log('✅ Auth state updated');
      
      // Navigate to main app
      router.replace('/(app)');
      
      return {
        success: true,
        user: response.user,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      };
    } catch (err) {
      console.error('❌ Login error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      throw new Error(errorMessage);
    }
  }, []);

  return { login: loginWithService, loading, error };
};

export const useRegister = () => {
  // const [registerMutation, { loading, error }] = useMutation<RegisterResponse>(REGISTER);
  const loading = false;
  const error = null;

  const registerWithService = useCallback(async (input: RegisterInput) => {
    try {
      console.log('📝 Register attempt:', { email: input.email });

      const response = await registerUser(input);
      const token = createTokenFromResponse(response);
      
      // Update auth state
      signIn(token);
      
      // Navigate to main app
      router.replace('/(app)');
      
      return {
        success: true,
        user: response.user,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      };
    } catch (err) {
      console.error('❌ Register error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      throw new Error(errorMessage);
    }
  }, []);

  return { register: registerWithService, loading, error };
};

export const useLogout = () => {
  // const [logoutMutation] = useMutation(LOGOUT);

  const logoutWithService = useCallback(async () => {
    try {
      // Get refresh token for logout
      const token = _useAuth.getState().token;
      if (token?.refresh) {
        await logout(token.refresh);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear auth state regardless of API call success
      signOut();
    }
  }, []);

  return { logout: logoutWithService };
};

export const useRefreshToken = () => {
  // const [refreshTokenMutation] = useMutation<RefreshTokenResponse>(REFRESH_TOKEN);

  const refreshTokenWithService = useCallback(async () => {
    try {
      const token = _useAuth.getState().token;
      if (!token?.refresh || !token?.user?.id) {
        throw new Error('No refresh token or user ID available');
      }

      const response = await refreshAccessToken(token.user.id, token.refresh);
      const newToken = createTokenFromResponse(response);
      
      // Update auth state
      signIn(newToken);
      
      return {
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      };
    } catch (err) {
      console.error('❌ Refresh token error:', err);
      // If refresh fails, logout user
      signOut();
      throw err;
    }
  }, []);

  return { refreshToken: refreshTokenWithService };
};

export const useCurrentUser = () => {
  const { data, loading, error, refetch } = useQuery<MeResponse>(GET_CURRENT_USER, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  return {
    user: data?.me,
    loading,
    error,
    refetch,
  };
};
