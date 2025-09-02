import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Types
export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    followerCount: number;
    isActive: boolean;
    locked: boolean;
    role: string;
    subscribeNewsletter: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface ResetPasswordRequest {
  userId: string;
  token: string;
  newPassword: string;
}

// GraphQL Mutations
const LOGIN_MUTATION = gql`
  mutation Login($loginInput: SignInDto!) {
    login(loginInput: $loginInput) {
      access_token
      refresh_token
      user {
        id
        firstName
        lastName
        email
        emailVerified
        followerCount
        isActive
        locked
        role
        subscribeNewsletter
        createdAt
        updatedAt
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterDto!) {
    register(registerInput: $registerInput) {
      access_token
      refresh_token
      user {
        id
        createdAt
        firstName
        lastName
        email
        emailVerified
        locked
        role
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      success
    }
  }
`;

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshTokenInput: RefreshTokenDto!) {
    refreshToken(refreshTokenInput: $refreshTokenInput) {
      access_token
      refresh_token
      user {
        id
        createdAt
        firstName
        lastName
        email
        emailVerified
        locked
        role
      }
    }
  }
`;

const CONFIRM_EMAIL_MUTATION = gql`
  mutation ConfirmEmail($confirmEmailInput: ConfirmEmailDto!) {
    confirmEmail(confirmEmailInput: $confirmEmailInput) {
      success
      message
    }
  }
`;

const RESEND_EMAIL_CONFIRMATION_MUTATION = gql`
  mutation ResendEmailConfirmation {
    resendEmailConfirmation {
      success
      message
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($resetPasswordInput: ResetPasswordDto!) {
    resetPassword(resetPasswordInput: $resetPasswordInput) {
      success
      message
    }
  }
`;

const SEND_PASSWORD_RESET_TOKEN_MUTATION = gql`
  mutation SendResetPasswordLink($sendResetPasswordInput: SendPasswordResetDto!) {
    sendResetPasswordLink(sendResetPasswordInput: $sendResetPasswordInput) {
      success
      message
    }
  }
`;

// Auth Service Functions
export async function login(email: string, password: string): Promise<SignInResponse> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: { 
        loginInput: { email, password } 
      },
      errorPolicy: 'all',
    });

    if (!data?.login) {
      throw new Error('Login failed: No data returned');
    }

    return data.login as SignInResponse;
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

export async function registerUser(request: RegisterRequest): Promise<SignInResponse> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: REGISTER_MUTATION,
      variables: { registerInput: request },
      errorPolicy: "all",
    });

    if (!data?.register) {
      throw new Error("Registration failed");
    }

    return data.register as SignInResponse;
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

export async function logout(refreshToken: string, accessToken?: string): Promise<boolean> {
  try {
    const context = accessToken
      ? {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      : {};

    const { data } = await apolloClient.mutate({
      mutation: LOGOUT_MUTATION,
      variables: { refreshToken },
      context,
      errorPolicy: "all",
    });

    return data?.logout?.success ?? false;
  } catch (error: any) {
    console.error("Logout error:", error);
    return false;
  }
}

export async function refreshAccessToken(userId: string, refreshToken: string): Promise<SignInResponse> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        refreshTokenInput: {
          refreshToken,
          userId,
        },
      },
      errorPolicy: "all",
    });

    if (!data?.refreshToken) {
      throw new Error("Token refresh failed");
    }

    return data.refreshToken as SignInResponse;
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

export async function confirmEmail(userId: string, token: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CONFIRM_EMAIL_MUTATION,
      variables: { 
        confirmEmailInput: { userId, token } 
      },
      errorPolicy: "all",
    });

    if (!data?.confirmEmail?.success) {
      throw new Error(data?.confirmEmail?.message ?? "Email confirmation failed");
    }

    return true;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) {
      throw new Error(error.graphQLErrors[0].message);
    }
    if (error.networkError) {
      throw new Error("Network error occurred");
    }
    throw new Error(error.message ?? "An error occurred during email confirmation");
  }
}

export async function reSendEmailConfirmationToken(accessToken: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: RESEND_EMAIL_CONFIRMATION_MUTATION,
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
      errorPolicy: "all",
    });

    if (!data?.resendEmailConfirmation?.success) {
      throw new Error(data?.resendEmailConfirmation?.message ?? "Failed to resend confirmation email");
    }

    return true;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) {
      throw new Error(error.graphQLErrors[0].message);
    }
    if (error.networkError) {
      throw new Error("Network error occurred");
    }
    throw new Error(error.message ?? "An error occurred while resending confirmation email");
  }
}

export async function resetPassword(request: ResetPasswordRequest): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: { resetPasswordInput: request },
      errorPolicy: "all",
    });

    if (!data?.resetPassword?.success) {
      throw new Error(data?.resetPassword?.message ?? "Password reset failed");
    }

    return true;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) {
      throw new Error(error.graphQLErrors[0].message);
    }
    if (error.networkError) {
      throw new Error("Network error occurred");
    }
    throw new Error(error.message ?? "An error occurred during password reset");
  }
}

export async function sendPasswordResetToken(email: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: SEND_PASSWORD_RESET_TOKEN_MUTATION,
      variables: { 
        sendResetPasswordInput: { email } 
      },
      errorPolicy: "all",
    });

    if (!data?.sendResetPasswordLink?.success) {
      throw new Error(data?.sendResetPasswordLink?.message ?? "Failed to send password reset token");
    }

    return true;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) {
      throw new Error(error.graphQLErrors[0].message);
    }
    if (error.networkError) {
      throw new Error("Network error occurred");
    }
    throw new Error(error.message ?? "An error occurred while sending password reset token");
  }
}
