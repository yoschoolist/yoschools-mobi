import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Types
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING'
}

export interface UserProfile {
  id: string;
  name?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  interests?: string[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    privacy: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  profile?: UserProfile;
  listings?: any[]; // Will be typed when listing service is available
  reviews?: any[]; // Will be typed when review service is available
  notifications?: any[]; // Will be typed when notification service is available
}

// Input Types
export interface CreateUserInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  profile?: {
    name?: string;
    bio?: string;
    location?: string;
    website?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    interests?: string[];
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  status?: UserStatus;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

export interface UpdateUserProfileInput {
  name?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  interests?: string[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    privacy: string;
  };
}

export interface UserFilterInput {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  hasProfile?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  lastLoginAfter?: string;
  lastLoginBefore?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordInput {
  email: string;
  token: string;
  newPassword: string;
}

// Response Types
export interface UserResponse {
  users: User[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  pendingUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  newUsersThisMonth: number;
  newUsersThisWeek: number;
  averageUsersPerMonth: number;
}

// GraphQL Fragments
const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
    firstName
    lastName
    role
    status
    emailVerified
    phoneVerified
    lastLoginAt
    createdAt
    updatedAt
    profile {
      id
      name
      avatar
      bio
      location
      website
      phone
      dateOfBirth
      gender
      interests
      socialLinks
      preferences
      createdAt
      updatedAt
    }
  }
`;

const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfileFragment on UserProfile {
    id
    name
    avatar
    bio
    location
    website
    phone
    dateOfBirth
    gender
    interests
    socialLinks
    preferences
    createdAt
    updatedAt
  }
`;

// GraphQL Queries
const GET_USERS_QUERY = gql`
  ${USER_FRAGMENT}
  query GetUsers($page: Int, $limit: Int, $filter: UserFilterInput) {
    getUsers(page: $page, limit: $limit, filter: $filter) {
      users {
        ...UserFragment
      }
      total
      hasNextPage
      hasPreviousPage
      page
      limit
      totalPages
    }
  }
`;

const GET_USER_QUERY = gql`
  ${USER_FRAGMENT}
  query GetUser($id: String!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }
`;

const GET_USER_BY_EMAIL_QUERY = gql`
  ${USER_FRAGMENT}
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      ...UserFragment
    }
  }
`;

const GET_CURRENT_USER_QUERY = gql`
  ${USER_FRAGMENT}
  query GetCurrentUser {
    getCurrentUser {
      ...UserFragment
    }
  }
`;

const GET_USER_PROFILE_QUERY = gql`
  ${USER_PROFILE_FRAGMENT}
  query GetUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      ...UserProfileFragment
    }
  }
`;

const GET_USER_STATS_QUERY = gql`
  query GetUserStats {
    getUserStats {
      totalUsers
      activeUsers
      inactiveUsers
      suspendedUsers
      pendingUsers
      verifiedUsers
      unverifiedUsers
      newUsersThisMonth
      newUsersThisWeek
      averageUsersPerMonth
    }
  }
`;

// GraphQL Mutations
const CREATE_USER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserFragment
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserFragment
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;

const UPDATE_USER_PROFILE_MUTATION = gql`
  ${USER_PROFILE_FRAGMENT}
  mutation UpdateUserProfile($userId: String!, $input: UpdateUserProfileInput!) {
    updateUserProfile(userId: $userId, input: $input) {
      ...UserProfileFragment
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`;

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
      message
    }
  }
`;

const RESEND_EMAIL_VERIFICATION_MUTATION = gql`
  mutation ResendEmailVerification {
    resendEmailVerification {
      success
      message
    }
  }
`;

const SUSPEND_USER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation SuspendUser($id: String!, $reason: String) {
    suspendUser(id: $id, reason: $reason) {
      ...UserFragment
    }
  }
`;

const UNSUSPEND_USER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation UnsuspendUser($id: String!) {
    unsuspendUser(id: $id) {
      ...UserFragment
    }
  }
`;

// Service Functions
export async function getUsers(
  page = 1,
  limit = 10,
  filter?: UserFilterInput,
  accessToken?: string
): Promise<UserResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_USERS_QUERY,
      variables: { page, limit, filter },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getUsers) {
      console.warn('No users returned from GraphQL query');
      return {
        users: [],
        total: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        page,
        limit,
        totalPages: 0
      };
    }

    return data.getUsers;
  } catch (error) {
    console.error('Error fetching users from API:', error);
    return {
      users: [],
      total: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function getUser(id: string, accessToken?: string): Promise<User | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_USER_QUERY,
      variables: { id },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getUser) {
      console.warn('No user found with ID:', id);
      return undefined;
    }

    return data.getUser;
  } catch (error) {
    console.error('Error fetching user from API:', error);
    return undefined;
  }
}

export async function getUserByEmail(email: string, accessToken?: string): Promise<User | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_USER_BY_EMAIL_QUERY,
      variables: { email },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getUserByEmail) {
      console.warn('No user found with email:', email);
      return undefined;
    }

    return data.getUserByEmail;
  } catch (error) {
    console.error('Error fetching user by email from API:', error);
    return undefined;
  }
}

export async function getCurrentUser(accessToken: string): Promise<User | undefined> {
  try {
    const { data, error } = await apolloClient.query({
      query: GET_CURRENT_USER_QUERY,
      variables: {},
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getCurrentUser) {
      console.warn('No current user found');
      return undefined;
    }

    return data.getCurrentUser;
  } catch (error) {
    console.error('Error fetching current user from API:', error);
    return undefined;
  }
}

export async function getUserProfile(userId: string, accessToken?: string): Promise<UserProfile | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_USER_PROFILE_QUERY,
      variables: { userId },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getUserProfile) {
      console.warn('No user profile found for user ID:', userId);
      return undefined;
    }

    return data.getUserProfile;
  } catch (error) {
    console.error('Error fetching user profile from API:', error);
    return undefined;
  }
}

export async function getUserStats(accessToken: string): Promise<UserStats | undefined> {
  try {
    const { data, error } = await apolloClient.query({
      query: GET_USER_STATS_QUERY,
      variables: {},
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getUserStats) {
      console.warn('No user stats returned from GraphQL query');
      return undefined;
    }

    return data.getUserStats;
  } catch (error) {
    console.error('Error fetching user stats from API:', error);
    return undefined;
  }
}

export async function createUser(
  input: CreateUserInput,
  accessToken: string
): Promise<User> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createUser) {
      throw new Error("Failed to create user");
    }

    return data.createUser;
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw new Error(error.message ?? 'Failed to create user');
  }
}

export async function updateUser(
  id: string,
  input: UpdateUserInput,
  accessToken: string
): Promise<User> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateUser) {
      throw new Error("Failed to update user");
    }

    return data.updateUser;
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw new Error(error.message ?? 'Failed to update user');
  }
}

export async function deleteUser(
  id: string,
  accessToken: string
): Promise<{ id: string; email: string; firstName?: string; lastName?: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteUser) {
      throw new Error("Failed to delete user");
    }

    return data.deleteUser;
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw new Error(error.message ?? 'Failed to delete user');
  }
}

export async function updateUserProfile(
  userId: string,
  input: UpdateUserProfileInput,
  accessToken: string
): Promise<UserProfile> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_USER_PROFILE_MUTATION,
      variables: { userId, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateUserProfile) {
      throw new Error("Failed to update user profile");
    }

    return data.updateUserProfile;
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error(error.message ?? 'Failed to update user profile');
  }
}

export async function changePassword(
  input: ChangePasswordInput,
  accessToken: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CHANGE_PASSWORD_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.changePassword) {
      throw new Error("Failed to change password");
    }

    return data.changePassword;
  } catch (error: any) {
    console.error('Error changing password:', error);
    throw new Error(error.message ?? 'Failed to change password');
  }
}

export async function resetPassword(
  input: ResetPasswordInput
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: { input },
      errorPolicy: 'all'
    });

    if (!data?.resetPassword) {
      throw new Error("Failed to reset password");
    }

    return data.resetPassword;
  } catch (error: any) {
    console.error('Error resetting password:', error);
    throw new Error(error.message ?? 'Failed to reset password');
  }
}

export async function verifyEmail(
  token: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: VERIFY_EMAIL_MUTATION,
      variables: { token },
      errorPolicy: 'all'
    });

    if (!data?.verifyEmail) {
      throw new Error("Failed to verify email");
    }

    return data.verifyEmail;
  } catch (error: any) {
    console.error('Error verifying email:', error);
    throw new Error(error.message ?? 'Failed to verify email');
  }
}

export async function resendEmailVerification(
  accessToken: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: RESEND_EMAIL_VERIFICATION_MUTATION,
      variables: {},
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.resendEmailVerification) {
      throw new Error("Failed to resend email verification");
    }

    return data.resendEmailVerification;
  } catch (error: any) {
    console.error('Error resending email verification:', error);
    throw new Error(error.message ?? 'Failed to resend email verification');
  }
}

export async function suspendUser(
  id: string,
  reason?: string,
  accessToken?: string
): Promise<User> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data } = await apolloClient.mutate({
      mutation: SUSPEND_USER_MUTATION,
      variables: { id, reason },
      context,
      errorPolicy: 'all'
    });

    if (!data?.suspendUser) {
      throw new Error("Failed to suspend user");
    }

    return data.suspendUser;
  } catch (error: any) {
    console.error('Error suspending user:', error);
    throw new Error(error.message ?? 'Failed to suspend user');
  }
}

export async function unsuspendUser(
  id: string,
  accessToken?: string
): Promise<User> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data } = await apolloClient.mutate({
      mutation: UNSUSPEND_USER_MUTATION,
      variables: { id },
      context,
      errorPolicy: 'all'
    });

    if (!data?.unsuspendUser) {
      throw new Error("Failed to unsuspend user");
    }

    return data.unsuspendUser;
  } catch (error: any) {
    console.error('Error unsuspending user:', error);
    throw new Error(error.message ?? 'Failed to unsuspend user');
  }
}

// Utility Functions
export const getUserRoleLabel = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrator';
    case UserRole.USER:
      return 'User';
    case UserRole.MODERATOR:
      return 'Moderator';
    default:
      return 'Unknown';
  }
};

export const getUserStatusLabel = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'Active';
    case UserStatus.INACTIVE:
      return 'Inactive';
    case UserStatus.SUSPENDED:
      return 'Suspended';
    case UserStatus.PENDING:
      return 'Pending';
    default:
      return 'Unknown';
  }
};

export const getUserStatusColor = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'bg-green-100 text-green-800';
    case UserStatus.INACTIVE:
      return 'bg-gray-100 text-gray-800';
    case UserStatus.SUSPENDED:
      return 'bg-red-100 text-red-800';
    case UserStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getUserRoleColor = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return 'bg-purple-100 text-purple-800';
    case UserRole.USER:
      return 'bg-blue-100 text-blue-800';
    case UserRole.MODERATOR:
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const isActive = (user: User): boolean => user.status === UserStatus.ACTIVE;
export const isAdmin = (user: User): boolean => user.role === UserRole.ADMIN;
export const isModerator = (user: User): boolean => user.role === UserRole.MODERATOR;
export const isEmailVerified = (user: User): boolean => user.emailVerified;
export const isPhoneVerified = (user: User): boolean => user.phoneVerified;
export const hasProfile = (user: User): boolean => !!user.profile;
export const isRecentlyActive = (user: User): boolean => {
  if (!user.lastLoginAt) return false;
  const lastLogin = new Date(user.lastLoginAt);
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return lastLogin > oneWeekAgo;
};

export const getFullName = (user: User): string => {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) {
    return user.firstName;
  }
  if (user.lastName) {
    return user.lastName;
  }
  return user.email;
};

export const getDisplayName = (user: User): string => {
  if (user.profile?.name) {
    return user.profile.name;
  }
  return getFullName(user);
};

export const getInitials = (user: User): string => {
  const name = getDisplayName(user);
  const words = name.split(' ');
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name[0]?.toUpperCase() || 'U';
};
