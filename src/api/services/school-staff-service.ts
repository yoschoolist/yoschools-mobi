import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export enum StaffRole {
  TEACHER = 'TEACHER',
  ADMINISTRATOR = 'ADMINISTRATOR',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  PRINCIPAL = 'PRINCIPAL',
  VICE_PRINCIPAL = 'VICE_PRINCIPAL',
  HEAD_TEACHER = 'HEAD_TEACHER',
  COORDINATOR = 'COORDINATOR',
  COUNSELOR = 'COUNSELOR',
  LIBRARIAN = 'LIBRARIAN',
  NURSE = 'NURSE',
  SECURITY = 'SECURITY',
  MAINTENANCE = 'MAINTENANCE',
  OTHER = 'OTHER'
}

export interface CreateSchoolStaffInput {
  userId: string;
  listingId: string;
  role: StaffRole;
  department?: string;
  subjects?: string[];
  gradeLevels?: string[];
  isActive?: boolean;
  hireDate?: string;
  employeeId?: string;
  qualification?: string;
  experience?: number;
}

export interface UpdateSchoolStaffInput {
  role?: StaffRole;
  department?: string;
  subjects?: string[];
  gradeLevels?: string[];
  isActive?: boolean;
  hireDate?: string;
  employeeId?: string;
  qualification?: string;
  experience?: number;
}

export interface SchoolStaffFilterInput {
  listingId?: string;
  userId?: string;
  role?: StaffRole;
  department?: string;
  isActive?: boolean;
  subjects?: string[];
  gradeLevels?: string[];
}

export interface SchoolStaffSortInput {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  hireDate?: 'asc' | 'desc';
  role?: 'asc' | 'desc';
  department?: 'asc' | 'desc';
}

export interface SchoolStaff {
  id: string;
  userId: string;
  listingId: string;
  role: StaffRole;
  department?: string;
  subjects: string[];
  gradeLevels: string[];
  isActive: boolean;
  hireDate?: string;
  employeeId?: string;
  qualification?: string;
  experience?: number;
  createdAt: string;
  updatedAt: string;
  user: { id: string; email: string; profile?: { name?: string; avatar?: string } };
  listing: { id: string; name: string; slug: string };
}

// ========== FRAGMENT ==========
const SCHOOL_STAFF_FRAGMENT = gql`
  fragment SchoolStaffFragment on SchoolStaff {
    id
    userId
    listingId
    role
    department
    subjects
    gradeLevels
    isActive
    hireDate
    employeeId
    qualification
    experience
    createdAt
    updatedAt
    user { id email profile { name avatar } }
    listing { id name slug }
  }
`;

// ========== QUERIES ==========
const GET_SCHOOL_STAFF_QUERY = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  query GetSchoolStaff($filter: SchoolStaffFilterInput, $sort: SchoolStaffSortInput) {
    getSchoolStaff(filter: $filter, sort: $sort) { ...SchoolStaffFragment }
  }
`;

const GET_SCHOOL_STAFF_BY_ID_QUERY = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  query GetSchoolStaffById($id: String!) {
    getSchoolStaffById(id: $id) { ...SchoolStaffFragment }
  }
`;

const GET_STAFF_BY_DEPARTMENT_QUERY = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  query GetStaffByDepartment($department: String!, $listingId: String!) {
    getStaffByDepartment(department: $department, listingId: $listingId) { ...SchoolStaffFragment }
  }
`;

const GET_STAFF_BY_LISTING_QUERY = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  query GetStaffByListing($listingId: String!) {
    getStaffByListing(listingId: $listingId) { ...SchoolStaffFragment }
  }
`;

const GET_STAFF_BY_ROLE_QUERY = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  query GetStaffByRole($listingId: String!, $role: String!) {
    getStaffByRole(listingId: $listingId, role: $role) { ...SchoolStaffFragment }
  }
`;

const GET_STAFF_BY_USER_QUERY = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  query GetStaffByUser($userId: String!) {
    getStaffByUser(userId: $userId) { ...SchoolStaffFragment }
  }
`;

// ========== MUTATIONS ==========
const CREATE_SCHOOL_STAFF_MUTATION = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  mutation CreateSchoolStaff($input: CreateSchoolStaffInput!) {
    createSchoolStaff(input: $input) { ...SchoolStaffFragment }
  }
`;

const UPDATE_SCHOOL_STAFF_MUTATION = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  mutation UpdateSchoolStaff($id: String!, $input: UpdateSchoolStaffInput!) {
    updateSchoolStaff(id: $id, input: $input) { ...SchoolStaffFragment }
  }
`;

const REMOVE_SCHOOL_STAFF_MUTATION = gql`
  ${SCHOOL_STAFF_FRAGMENT}
  mutation RemoveSchoolStaff($id: String!) {
    removeSchoolStaff(id: $id) { ...SchoolStaffFragment }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getSchoolStaff(
  filter?: SchoolStaffFilterInput,
  sort?: SchoolStaffSortInput,
  accessToken?: string
): Promise<SchoolStaff[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_STAFF_QUERY,
    variables: { filter, sort },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getSchoolStaff || []) as SchoolStaff[];
}

export async function getSchoolStaffById(id: string, accessToken?: string): Promise<SchoolStaff> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_STAFF_BY_ID_QUERY,
    variables: { id },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getSchoolStaffById as SchoolStaff;
}

export async function getStaffByDepartment(
  department: string,
  listingId: string,
  accessToken?: string
): Promise<SchoolStaff[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_STAFF_BY_DEPARTMENT_QUERY,
    variables: { department, listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getStaffByDepartment || []) as SchoolStaff[];
}

export async function getStaffByListing(
  listingId: string,
  accessToken?: string
): Promise<SchoolStaff[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_STAFF_BY_LISTING_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getStaffByListing || []) as SchoolStaff[];
}

export async function getStaffByRole(
  listingId: string,
  role: string,
  accessToken?: string
): Promise<SchoolStaff[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_STAFF_BY_ROLE_QUERY,
    variables: { listingId, role },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getStaffByRole || []) as SchoolStaff[];
}

export async function getStaffByUser(userId: string, accessToken?: string): Promise<SchoolStaff[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_STAFF_BY_USER_QUERY,
    variables: { userId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getStaffByUser || []) as SchoolStaff[];
}

export async function createSchoolStaff(
  input: CreateSchoolStaffInput,
  accessToken?: string
): Promise<SchoolStaff> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: CREATE_SCHOOL_STAFF_MUTATION,
    variables: { input },
    context,
    errorPolicy: 'all'
  });
  return data?.createSchoolStaff as SchoolStaff;
}

export async function updateSchoolStaff(
  id: string,
  input: UpdateSchoolStaffInput,
  accessToken?: string
): Promise<SchoolStaff> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_SCHOOL_STAFF_MUTATION,
    variables: { id, input },
    context,
    errorPolicy: 'all'
  });
  return data?.updateSchoolStaff as SchoolStaff;
}

export async function removeSchoolStaff(id: string, accessToken?: string): Promise<SchoolStaff> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: REMOVE_SCHOOL_STAFF_MUTATION,
    variables: { id },
    context,
    errorPolicy: 'all'
  });
  return data?.removeSchoolStaff as SchoolStaff;
}


