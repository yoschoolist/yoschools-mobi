import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface Profile {
  id: string;
  name?: string;
  slug?: string;
  bio?: string;
  avatar?: string;
  imageId?: string;
  website?: string;
  birthDate?: string;
  gender?: string;
  phoneNumber?: string;
  professionalTitle?: string;
  experience?: string;
  qualifications?: string;
  specializations?: string;
  userId: string;
}

export interface Account {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  emailVerified: boolean;
  followerCount: number;
  isActive: boolean;
  locked: boolean;
  role: string;
  subscribeNewsletter: boolean;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  lastLocationUpdateAt?: string;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
}

export interface UpdateAccountInput {
  title?: string;
  firstName?: string;
  lastName?: string;
  subscribeNewsletter?: boolean;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  timezone?: string;
  name?: string;
  bio?: string;
  phoneNumber?: string;
  website?: string;
  gender?: string;
  avatar?: string;
  imageId?: string;
  qualifications?: string;
  specializations?: string;
  professionalTitle?: string;
  experience?: string;
  latitude?: number;
  longitude?: number;
  birthDate?: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ========== QUERIES ==========
const GET_ACCOUNT_QUERY = gql`
  query Me {
    me {
      id title firstName lastName email emailVerified followerCount isActive locked role subscribeNewsletter latitude longitude timezone lastLocationUpdateAt createdAt updatedAt
      profile { id name slug bio avatar imageId website birthDate gender phoneNumber professionalTitle experience qualifications specializations userId }
    }
  }
`;

// ========== MUTATIONS ==========
const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      id title firstName lastName email emailVerified followerCount isActive locked role subscribeNewsletter latitude longitude timezone lastLocationUpdateAt createdAt updatedAt
      profile { id name slug bio avatar imageId website birthDate gender phoneNumber professionalTitle experience qualifications specializations userId }
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordDto!) {
    changePassword(input: $input) { success message }
  }
`;

// ========== HELPER ==========
function transformToUpdateAccountInput(formData: any): UpdateAccountInput {
  const input: UpdateAccountInput = {};
  if (formData.title !== undefined) input.title = formData.title;
  if (formData.firstName !== undefined) input.firstName = formData.firstName;
  if (formData.lastName !== undefined) input.lastName = formData.lastName;
  if (formData.subscribeNewsletter !== undefined) input.subscribeNewsletter = formData.subscribeNewsletter;
  if (formData.countryId !== undefined) input.countryId = formData.countryId;
  if (formData.regionId !== undefined) input.regionId = formData.regionId;
  if (formData.localityId !== undefined) input.localityId = formData.localityId;
  if (formData.timezone !== undefined) input.timezone = formData.timezone;
  if (formData.name !== undefined) input.name = formData.name;
  if (formData.bio !== undefined) input.bio = formData.bio;
  if (formData.phoneNumber !== undefined) input.phoneNumber = formData.phoneNumber;
  if (formData.website !== undefined) input.website = formData.website;
  if (formData.gender !== undefined) input.gender = formData.gender;
  if (formData.avatar !== undefined) input.avatar = formData.avatar;
  if (formData.imageId !== undefined) input.imageId = formData.imageId;
  if (formData.qualifications !== undefined) input.qualifications = formData.qualifications;
  if (formData.specializations !== undefined) input.specializations = formData.specializations;
  if (formData.professionalTitle !== undefined) input.professionalTitle = formData.professionalTitle;
  if (formData.experience !== undefined) input.experience = formData.experience;
  if (formData.latitude !== undefined && formData.latitude !== '') input.latitude = parseFloat(formData.latitude);
  if (formData.longitude !== undefined && formData.longitude !== '') input.longitude = parseFloat(formData.longitude);
  if (formData.birthDate !== undefined && formData.birthDate !== '') input.birthDate = formData.birthDate;
  return input;
}

// ========== SERVICE FUNCTIONS ==========
export async function getAccount(accessToken?: string): Promise<Account | null> {
  try {
    const { data, error, errors } = await apolloClient.query({
      query: GET_ACCOUNT_QUERY,
      context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    });

    if (error || (errors && errors.length > 0)) {
      const errorMessage = errors?.[0]?.message || error?.message || 'GraphQL query failed';
      console.error('Get account error:', errorMessage);
      throw new Error(errorMessage);
    }

    if (!data?.me) return null;
    return data.me as Account;
  } catch (error: any) {
    console.error('Get account error:', error);
    throw error;
  }
}

export async function updateAccount(formData: any, accessToken?: string): Promise<Account> {
  try {
    const input = transformToUpdateAccountInput(formData);
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};

    const { data } = await apolloClient.mutate({
      mutation: UPDATE_ACCOUNT_MUTATION,
      variables: { input },
      context,
      errorPolicy: 'all',
      update: (cache, { data: mutationData }) => {
        if (mutationData?.updateAccount) {
          cache.writeQuery({ query: GET_ACCOUNT_QUERY, data: { me: mutationData.updateAccount } });
        }
      },
    });

    if (!data?.updateAccount) throw new Error('Account update failed');
    return data.updateAccount as Account;
  } catch (error: any) {
    console.error('Update account error:', error);
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred during account update');
  }
}

export async function changePassword(oldPassword: string, newPassword: string, confirmPassword: string, accessToken?: string): Promise<boolean> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.mutate({
      mutation: CHANGE_PASSWORD_MUTATION,
      variables: { input: { oldPassword, newPassword, confirmPassword } },
      context,
      errorPolicy: 'all'
    });

    if (!data?.changePassword?.success) throw new Error(data?.changePassword?.message ?? 'Password change failed');
    return true;
  } catch (error: any) {
    if (error.graphQLErrors?.length > 0) throw new Error(error.graphQLErrors[0].message);
    if (error.networkError) throw new Error('Network error occurred');
    throw new Error(error.message ?? 'An error occurred during password change');
  }
}
