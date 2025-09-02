import { useMutation, useQuery } from '@apollo/client/react';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { LOGIN, REGISTER } from '../graphql/mutations';
import type { LoginResponse, RegisterResponse } from '../graphql/types';
import { signIn, signOut } from '@/lib/auth';
import { createTokenFromResponse, login, registerUser } from './auth-service';

export function useApolloLogin() {
  const [loginMutation, { loading, error }] = useMutation<LoginResponse>(LOGIN);

  const loginWithApollo = useCallback(
    async (email: string, password: string) => {
      try {
        console.log('🔐 Apollo Login attempt:', { email });

        const result = await loginMutation({
          variables: {
            email,
            password,
          },
        });

        console.log('✅ Apollo Login result:', result.data?.login ? 'Success' : 'No data');

        if (result.data?.login) {
          const { user, token, refreshToken } = result.data.login;

          // Create token object for our auth store
          const tokenData = {
            access: token,
            refresh: refreshToken,
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
            }
          };

          // Update local auth state
          signIn(tokenData);

          return {
            success: true,
            user,
            access_token: token,
            refresh_token: refreshToken,
          };
        } else {
          throw new Error('Login failed - no data received');
        }
      } catch (err) {
        console.error('❌ Apollo login error:', err);
        
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        Alert.alert('Login Error', errorMessage);
        
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [loginMutation]
  );

  return {
    login: loginWithApollo,
    loading,
    error,
  };
}

export function useApolloRegister() {
  const [registerMutation, { loading, error }] = useMutation<RegisterResponse>(REGISTER);

  const registerWithApollo = useCallback(
    async (input: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role?: string;
    }) => {
      try {
        console.log('📝 Apollo Register attempt:', { email: input.email });

        const result = await registerMutation({
          variables: { input },
        });

        console.log('✅ Apollo Register result:', result.data?.register ? 'Success' : 'No data');

        if (result.data?.register) {
          const { user, token, refreshToken } = result.data.register;

          // Create token object for our auth store
          const tokenData = {
            access: token,
            refresh: refreshToken,
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
            }
          };

          // Update local auth state
          signIn(tokenData);

          return {
            success: true,
            user,
            access_token: token,
            refresh_token: refreshToken,
          };
        } else {
          throw new Error('Registration failed - no data received');
        }
      } catch (err) {
        console.error('❌ Apollo register error:', err);
        
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        Alert.alert('Registration Error', errorMessage);
        
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [registerMutation]
  );

  return {
    register: registerWithApollo,
    loading,
    error,
  };
}
