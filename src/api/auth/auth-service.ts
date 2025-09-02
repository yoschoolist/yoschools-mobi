import { apolloClient } from '../common/apollo-client';
import { LOGIN, REGISTER, LOGOUT, REFRESH_TOKEN } from '../graphql/mutations';
import type { LoginResponse, RegisterResponse, RefreshTokenResponse } from '../graphql/types';
import type { TokenType } from '@/lib/auth/utils';

// Types for mobile auth
export interface LoginInput {
  email: string;
  password: string;
  deviceId?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  expires_in?: number;
  token_type?: string;
  scope?: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
  userId: string;
}

// Mobile Auth Service Functions
export async function login(email: string, password: string, deviceId?: string): Promise<SignInResponse> {
  try {
    const { data } = await apolloClient.mutate<LoginResponse>({
      mutation: LOGIN,
      variables: { 
        email, 
        password
      },
      errorPolicy: 'all',
    });

    if (!data?.login) {
      throw new Error('Login failed: No data returned');
    }

    // Transform the response to match SignInResponse format
    const response = data.login;
    console.log('🔍 Login response:', response);
    console.log('🔑 Access token from response:', response.access_token);
    console.log('🔑 Refresh token from response:', response.refresh_token);
    
    return {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      user: {
        id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        role: response.user.role,
      }
    };
  } catch (error: any) {
    console.error('GraphQL login error:', error);
    if (error.graphQLErrors?.length > 0) {
      throw new Error(error.graphQLErrors[0].message);
    }
    if (error.networkError) {
      throw new Error('Network error occurred');
    }
    throw new Error(error.message ?? 'An error occurred during login');
  }
}

export async function registerUser(input: RegisterInput): Promise<SignInResponse> {
  try {
    const { data } = await apolloClient.mutate<RegisterResponse>({
      mutation: REGISTER,
      variables: { input },
      errorPolicy: 'all',
    });

    if (!data?.register) {
      throw new Error("Registration failed");
    }

    // Transform the response to match SignInResponse format
    const response = data.register;
    console.log('🔍 Register response:', response);
    console.log('🔑 Access token from response:', response.access_token);
    console.log('🔑 Refresh token from response:', response.refresh_token);
    
    return {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      user: {
        id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        role: response.user.role,
      }
    };
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) {
      throw new Error(error.graphQLErrors[0].message);
    }
    if (error.networkError) {
      throw new Error("Network error occurred");
    }
    throw new Error(error.message ?? "An error occurred during registration");
  }
}

export async function logout(refreshToken: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LOGOUT,
      variables: { refreshToken },
      errorPolicy: 'all',
    });

    return data?.logout?.success ?? false;
  } catch (error: any) {
    console.error("Logout error:", error);
    return false;
  }
}

export async function refreshAccessToken(userId: string, refreshToken: string): Promise<SignInResponse> {
  try {
    const { data } = await apolloClient.mutate<RefreshTokenResponse>({
      mutation: REFRESH_TOKEN,
      variables: {
        refreshToken,
      },
      errorPolicy: 'all',
    });

    if (!data?.refreshToken) {
      throw new Error("Token refresh failed");
    }

    // Transform the response to match SignInResponse format
    const response = data.refreshToken;
    console.log('🔍 Refresh token response:', response);
    console.log('🔑 Access token from response:', response.access_token);
    console.log('🔑 Refresh token from response:', response.refresh_token);
    
    return {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      user: {
        id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        role: response.user.role,
      }
    };
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) {
      throw new Error(error.graphQLErrors[0].message);
    }
    if (error.networkError) {
      throw new Error("Network error occurred");
    }
    throw new Error(error.message ?? "An error occurred during token refresh");
  }
}

// Helper function to create TokenType from SignInResponse (aligned with yoschools-mobile)
export function createTokenFromResponse(response: SignInResponse): TokenType {
  console.log('🔧 Creating token from response:', response);
  console.log('🔑 Access token length:', response.access_token?.length || 0);
  console.log('🔑 Refresh token length:', response.refresh_token?.length || 0);
  
  const token = {
    access: response.access_token,
    refresh: response.refresh_token,
    user: {
      id: response.user.id,
      firstName: response.user.firstName,
      lastName: response.user.lastName,
      email: response.user.email,
      role: response.user.role,
    }
  };
  
  console.log('✅ Token created:', {
    accessLength: token.access?.length || 0,
    refreshLength: token.refresh?.length || 0,
    user: token.user
  });
  
  return token;
}
