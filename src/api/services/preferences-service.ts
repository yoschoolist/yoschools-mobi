import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface CreateUserPreferencesInput {
  userId: string;
  notificationEmail?: boolean;
  notificationPush?: boolean;
  preferredLanguage?: string;
  fallbackLanguage?: string;
  preferredCountryId?: string;
  preferredRegionId?: string;
  preferredLocalityId?: string;
  categoryIds?: string[];
}

export interface UpdateUserPreferencesInput {
  id: string;
  notificationEmail?: boolean;
  notificationPush?: boolean;
  preferredLanguage?: string;
  fallbackLanguage?: string;
  preferredCountryId?: string;
  preferredRegionId?: string;
  preferredLocalityId?: string;
}

export interface UserPreferencesFilter {
  userId?: string;
  preferredLanguage?: string;
  preferredCountryId?: string;
  preferredRegionId?: string;
  preferredLocalityId?: string;
  notificationEmail?: boolean;
  notificationPush?: boolean;
}

export interface UserPreferencesOrderBy {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  preferredLanguage?: 'asc' | 'desc';
}

export interface Country { id: string; name: string; code: string }
export interface Region { id: string; name: string; countryId: string; country?: Country }
export interface Locality { id: string; name: string; regionId: string; region?: Region }
export interface Category { id: string; name: string; description?: string; type: string; slug: string }
export interface User { id: string; email: string; firstName?: string; lastName?: string }

export interface UserPreferences {
  id: string;
  userId: string;
  notificationEmail: boolean;
  notificationPush: boolean;
  preferredLanguage: string;
  fallbackLanguage?: string;
  preferredCountryId?: string;
  preferredRegionId?: string;
  preferredLocalityId?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  preferredCountry?: Country;
  preferredRegion?: Region;
  preferredLocality?: Locality;
  preferredCategories?: Category[];
}

export interface UserPreferencesResponse { success: boolean; error?: string; userPreferences?: UserPreferences }
export interface UserPreferencesListResponse { userPreferences: UserPreferences[]; total: number; page: number; limit: number; hasNext: boolean; hasPrevious: boolean }

// ========== QUERIES ==========
const GET_USER_PREFERENCES_QUERY = gql`
  query GetUserPreferences($where: UserPreferencesWhereInput, $orderBy: UserPreferencesOrderByInput, $skip: Int, $take: Int) {
    userPreferences(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      userPreferences {
        id userId notificationEmail notificationPush preferredLanguage fallbackLanguage createdAt updatedAt
        user { id email firstName lastName }
        preferredCountry { id name code }
        preferredRegion { id name countryId country { id name code } }
        preferredLocality { id name regionId region { id name countryId } }
        preferredCategories { id name description type slug }
      }
      total page limit hasNext hasPrevious
    }
  }
`;

const GET_USER_PREFERENCE_QUERY = gql`
  query GetUserPreference($id: ID!) {
    userPreference(id: $id) {
      id userId notificationEmail notificationPush preferredLanguage fallbackLanguage createdAt updatedAt
      user { id email firstName lastName }
      preferredCountry { id name code }
      preferredRegion { id name countryId country { id name code } }
      preferredLocality { id name regionId region { id name countryId } }
      preferredCategories { id name description type slug }
    }
  }
`;

const GET_USER_PREFERENCES_BY_USER_ID_QUERY = gql`
  query GetUserPreferencesByUserId($userId: ID!) {
    userPreferencesByUserId(userId: $userId) {
      id userId notificationEmail notificationPush preferredLanguage fallbackLanguage preferredCountryId preferredRegionId preferredLocalityId createdAt updatedAt
      user { id email firstName lastName }
      preferredCountry { id name code }
      preferredRegion { id name countryId country { id name code } }
      preferredLocality { id name regionId region { id name countryId } }
      preferredCategories { id name description type slug }
    }
  }
`;

const GET_MY_USER_PREFERENCES_QUERY = gql`
  query GetMyUserPreferences {
    myUserPreferences {
      id userId notificationEmail notificationPush preferredLanguage fallbackLanguage createdAt updatedAt
      preferredCountry { id name code }
      preferredRegion { id name countryId country { id name code } }
      preferredLocality { id name regionId region { id name countryId } }
      preferredCategories { id name description type slug }
    }
  }
`;

const GET_USER_PREFERENCES_BY_LANGUAGE_QUERY = gql`
  query GetUserPreferencesByLanguage($language: String!) {
    userPreferencesByLanguage(language: $language) {
      id userId preferredLanguage fallbackLanguage
      user { id email firstName lastName }
    }
  }
`;

const GET_BULK_NOTIFICATION_PREFERENCES_QUERY = gql`
  query GetBulkNotificationPreferences($userIds: [ID!]!) {
    bulkNotificationPreferences(userIds: $userIds) {
      id userId notificationEmail notificationPush preferredLanguage
      user { id email firstName lastName }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_USER_PREFERENCES_MUTATION = gql`
  mutation CreateUserPreferences($input: CreateUserPreferencesInput!) {
    createUserPreferences(input: $input) {
      success error
      userPreferences {
        id userId notificationEmail notificationPush preferredLanguage fallbackLanguage createdAt updatedAt
        user { id email firstName lastName }
        preferredCountry { id name code }
        preferredRegion { id name countryId }
        preferredLocality { id name regionId }
        preferredCategories { id name description type slug }
      }
    }
  }
`;

const UPDATE_USER_PREFERENCES_MUTATION = gql`
  mutation UpdateUserPreferences($input: UpdateUserPreferencesInput!) {
    updateUserPreferences(input: $input) {
      success error
      userPreferences {
        id userId notificationEmail notificationPush preferredLanguage fallbackLanguage updatedAt
        preferredCountry { id name code }
        preferredRegion { id name countryId }
        preferredLocality { id name regionId }
        preferredCategories { id name description type slug }
      }
    }
  }
`;

const DELETE_USER_PREFERENCES_MUTATION = gql`
  mutation DeleteUserPreferences($id: ID!) {
    deleteUserPreferences(id: $id) {
      success error
      userPreferences { id userId }
    }
  }
`;

const ADD_PREFERRED_CATEGORY_MUTATION = gql`
  mutation AddPreferredCategory($userPreferencesId: ID!, $categoryId: ID!) {
    addPreferredCategory(userPreferencesId: $userPreferencesId, categoryId: $categoryId) {
      success error
      userPreferences { id preferredCategories { id name type slug } }
    }
  }
`;

const REMOVE_PREFERRED_CATEGORY_MUTATION = gql`
  mutation RemovePreferredCategory($userPreferencesId: ID!, $categoryId: ID!) {
    removePreferredCategory(userPreferencesId: $userPreferencesId, categoryId: $categoryId) {
      success error
      userPreferences { id preferredCategories { id name type slug } }
    }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getUserPreferences(where?: UserPreferencesFilter, orderBy?: UserPreferencesOrderBy, take?: number, skip?: number, accessToken?: string): Promise<UserPreferencesListResponse> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_USER_PREFERENCES_QUERY, variables: { where, orderBy, take, skip }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.userPreferences) throw new Error('Failed to fetch user preferences');
    return data.userPreferences as UserPreferencesListResponse;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while fetching user preferences');
  }
}

export async function getUserPreference(id: string, accessToken?: string): Promise<UserPreferences> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_USER_PREFERENCE_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.userPreference) throw new Error('User preferences not found');
    return data.userPreference as UserPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while fetching user preference');
  }
}

export async function getUserPreferencesByUserId(userId: string, accessToken: string): Promise<UserPreferences> {
  try {
    const { data } = await apolloClient.query({ query: GET_USER_PREFERENCES_BY_USER_ID_QUERY, variables: { userId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.userPreferencesByUserId) throw new Error('User preferences not found');
    return data.userPreferencesByUserId as UserPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while fetching user preferences by user ID');
  }
}

export async function getMyUserPreferences(accessToken: string): Promise<UserPreferences> {
  try {
    const { data } = await apolloClient.query({ query: GET_MY_USER_PREFERENCES_QUERY, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.myUserPreferences) throw new Error('User preferences not found');
    return data.myUserPreferences as UserPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while fetching my user preferences');
  }
}

export async function getUserPreferencesByLanguage(language: string, accessToken?: string): Promise<UserPreferences[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_USER_PREFERENCES_BY_LANGUAGE_QUERY, variables: { language }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.userPreferencesByLanguage) throw new Error('Failed to fetch user preferences by language');
    return data.userPreferencesByLanguage as UserPreferences[];
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while fetching user preferences by language');
  }
}

export async function getBulkNotificationPreferences(userIds: string[], accessToken?: string): Promise<UserPreferences[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_BULK_NOTIFICATION_PREFERENCES_QUERY, variables: { userIds }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.bulkNotificationPreferences) throw new Error('Failed to fetch bulk notification preferences');
    return data.bulkNotificationPreferences as UserPreferences[];
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while fetching bulk notification preferences');
  }
}

export async function createUserPreferences(input: CreateUserPreferencesInput, accessToken: string): Promise<UserPreferences> {
  try {
    const { data } = await apolloClient.mutate({ mutation: CREATE_USER_PREFERENCES_MUTATION, variables: { input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
    if (!data?.createUserPreferences?.success) throw new Error(data?.createUserPreferences?.error || 'Failed to create user preferences');
    return data.createUserPreferences.userPreferences as UserPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while creating user preferences');
  }
}

export async function updateUserPreferences(input: UpdateUserPreferencesInput, accessToken: string): Promise<UserPreferences> {
  try {
    if (!accessToken) throw new Error('Authentication token is required');
    const { data } = await apolloClient.mutate({ mutation: UPDATE_USER_PREFERENCES_MUTATION, variables: { input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
    if (!data?.updateUserPreferences?.success) throw new Error(data?.updateUserPreferences?.error || 'Failed to update user preferences');
    return data.updateUserPreferences.userPreferences as UserPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while updating user preferences');
  }
}

export async function deleteUserPreferences(id: string, accessToken: string): Promise<{ id: string; userId: string }> {
  try {
    const { data } = await apolloClient.mutate({ mutation: DELETE_USER_PREFERENCES_MUTATION, variables: { id }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
    if (!data?.deleteUserPreferences?.success) throw new Error(data?.deleteUserPreferences?.error || 'Failed to delete user preferences');
    return data.deleteUserPreferences.userPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while deleting user preferences');
  }
}

export async function addPreferredCategory(userPreferencesId: string, categoryId: string, accessToken: string): Promise<UserPreferences> {
  try {
    const { data } = await apolloClient.mutate({ mutation: ADD_PREFERRED_CATEGORY_MUTATION, variables: { userPreferencesId, categoryId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
    if (!data?.addPreferredCategory?.success) throw new Error(data?.addPreferredCategory?.error || 'Failed to add preferred category');
    return data.addPreferredCategory.userPreferences as UserPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while adding preferred category');
  }
}

export async function removePreferredCategory(userPreferencesId: string, categoryId: string, accessToken: string): Promise<UserPreferences> {
  try {
    const { data } = await apolloClient.mutate({ mutation: REMOVE_PREFERRED_CATEGORY_MUTATION, variables: { userPreferencesId, categoryId }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
    if (!data?.removePreferredCategory?.success) throw new Error(data?.removePreferredCategory?.error || 'Failed to remove preferred category');
    return data.removePreferredCategory.userPreferences as UserPreferences;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred while removing preferred category');
  }
}

// ========== UTILITY FUNCTIONS ==========
export async function getUserPreferencesByLocation(countryId?: string, regionId?: string, localityId?: string, accessToken?: string): Promise<UserPreferences[]> {
  const where: UserPreferencesFilter = {};
  if (countryId) where.preferredCountryId = countryId;
  if (regionId) where.preferredRegionId = regionId;
  if (localityId) where.preferredLocalityId = localityId;
  const result = await getUserPreferences(where, { createdAt: 'desc' }, undefined, undefined, accessToken);
  return result.userPreferences;
}

export async function getUsersWithNotificationsEnabled(emailNotifications: boolean = true, pushNotifications: boolean = true, accessToken?: string): Promise<UserPreferences[]> {
  const where: UserPreferencesFilter = { notificationEmail: emailNotifications, notificationPush: pushNotifications };
  const result = await getUserPreferences(where, { createdAt: 'desc' }, undefined, undefined, accessToken);
  return result.userPreferences;
}

export async function searchUserPreferences(language?: string, countryId?: string, accessToken?: string): Promise<UserPreferences[]> {
  const where: UserPreferencesFilter = {};
  if (language) where.preferredLanguage = language;
  if (countryId) where.preferredCountryId = countryId;
  const result = await getUserPreferences(where, { updatedAt: 'desc' }, undefined, undefined, accessToken);
  return result.userPreferences;
}
