import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export enum InquiryStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESPONDED = 'RESPONDED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}

export enum InquiryPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface CreateSchoolInquiryInput {
  title: string;
  message: string;
  listingId: string;
  inquirerId: string;
  category?: string;
  priority?: InquiryPriority;
  contactEmail?: string;
  contactPhone?: string;
  preferredContactMethod?: string;
  attachments?: string[];
  additionalInfo?: Record<string, any>;
}

export interface UpdateSchoolInquiryInput {
  title?: string;
  message?: string;
  category?: string;
  priority?: InquiryPriority;
  contactEmail?: string;
  contactPhone?: string;
  preferredContactMethod?: string;
  attachments?: string[];
  additionalInfo?: Record<string, any>;
}

export interface SchoolInquiryFilterInput {
  listingId?: string;
  inquirerId?: string;
  status?: InquiryStatus;
  priority?: InquiryPriority;
  category?: string;
  search?: string;
  createdAfter?: string;
  createdBefore?: string;
  respondedAfter?: string;
  respondedBefore?: string;
}

export interface SchoolInquirySortInput {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  priority?: 'asc' | 'desc';
  title?: 'asc' | 'desc';
  status?: 'asc' | 'desc';
}

export interface SchoolInquiry {
  id: string;
  title: string;
  message: string;
  listingId: string;
  inquirerId: string;
  category?: string;
  priority: InquiryPriority;
  status: InquiryStatus;
  contactEmail?: string;
  contactPhone?: string;
  preferredContactMethod?: string;
  attachments: string[];
  additionalInfo?: Record<string, any>;
  responseMessage?: string;
  respondedBy?: string;
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
  listing: { id: string; name: string; slug: string };
  inquirer: { id: string; email: string; profile?: { name?: string; avatar?: string } };
  responder?: { id: string; email: string; profile?: { name?: string; avatar?: string } };
}

export interface SchoolInquiryStatsResponse {
  totalInquiries: number;
  pendingInquiries: number;
  inProgressInquiries: number;
  respondedInquiries: number;
  resolvedInquiries: number;
  closedInquiries: number;
  averageResponseTime: number;
  inquiriesByCategory: Array<{ category: string; count: number }>;
  inquiriesByPriority: Array<{ priority: InquiryPriority; count: number }>;
  recentActivity: Array<{ date: string; count: number }>;
}

// ========== FRAGMENTS ==========
const SCHOOL_INQUIRY_FRAGMENT = gql`
  fragment SchoolInquiryFragment on SchoolInquiry {
    id
    title
    message
    listingId
    inquirerId
    category
    priority
    status
    contactEmail
    contactPhone
    preferredContactMethod
    attachments
    additionalInfo
    responseMessage
    respondedBy
    respondedAt
    createdAt
    updatedAt
    listing { id name slug }
    inquirer { id email profile { name avatar } }
    responder { id email profile { name avatar } }
  }
`;

// ========== QUERIES ==========
const GET_SCHOOL_INQUIRIES_QUERY = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  query GetSchoolInquiries($filters: SchoolInquiryFilterInput, $sort: SchoolInquirySortInput) {
    getSchoolInquiries(filters: $filters, sort: $sort) {
      ...SchoolInquiryFragment
    }
  }
`;

const GET_SCHOOL_INQUIRY_BY_ID_QUERY = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  query GetSchoolInquiryById($id: String!) {
    getSchoolInquiryById(id: $id) {
      ...SchoolInquiryFragment
    }
  }
`;

const GET_INQUIRIES_BY_LISTING_QUERY = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  query GetSchoolInquiriesByListing($listingId: String!) {
    getSchoolInquiriesByListing(listingId: $listingId) {
      ...SchoolInquiryFragment
    }
  }
`;

const GET_INQUIRIES_BY_STATUS_QUERY = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  query GetSchoolInquiriesByStatus($listingId: String!, $status: String!) {
    getSchoolInquiriesByStatus(listingId: $listingId, status: $status) {
      ...SchoolInquiryFragment
    }
  }
`;

const GET_INQUIRY_STATS_QUERY = gql`
  query GetInquiryStats($listingId: String!) {
    getInquiryStats(listingId: $listingId) {
      totalInquiries
      pendingInquiries
      inProgressInquiries
      respondedInquiries
      resolvedInquiries
      closedInquiries
      averageResponseTime
      inquiriesByCategory { category count }
      inquiriesByPriority { priority count }
      recentActivity { date count }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_SCHOOL_INQUIRY_MUTATION = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  mutation CreateSchoolInquiry($input: CreateSchoolInquiryInput!) {
    createSchoolInquiry(input: $input) {
      ...SchoolInquiryFragment
    }
  }
`;

const UPDATE_SCHOOL_INQUIRY_MUTATION = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  mutation UpdateSchoolInquiry($id: String!, $input: UpdateSchoolInquiryInput!) {
    updateSchoolInquiry(id: $id, input: $input) {
      ...SchoolInquiryFragment
    }
  }
`;

const DELETE_SCHOOL_INQUIRY_MUTATION = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  mutation DeleteSchoolInquiry($id: String!) {
    deleteSchoolInquiry(id: $id) {
      ...SchoolInquiryFragment
    }
  }
`;

const UPDATE_INQUIRY_STATUS_MUTATION = gql`
  ${SCHOOL_INQUIRY_FRAGMENT}
  mutation UpdateInquiryStatus($id: String!, $status: String!) {
    updateInquiryStatus(id: $id, status: $status) {
      ...SchoolInquiryFragment
    }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getSchoolInquiries(
  filters?: SchoolInquiryFilterInput,
  sort?: SchoolInquirySortInput,
  accessToken?: string
): Promise<SchoolInquiry[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_INQUIRIES_QUERY,
    variables: { filters, sort },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getSchoolInquiries || []) as SchoolInquiry[];
}

export async function getSchoolInquiryById(
  id: string,
  accessToken?: string
): Promise<SchoolInquiry> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_INQUIRY_BY_ID_QUERY,
    variables: { id },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getSchoolInquiryById as SchoolInquiry;
}

export async function getSchoolInquiriesByListing(
  listingId: string,
  accessToken?: string
): Promise<SchoolInquiry[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_INQUIRIES_BY_LISTING_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getSchoolInquiriesByListing || []) as SchoolInquiry[];
}

export async function getSchoolInquiriesByStatus(
  listingId: string,
  status: string,
  accessToken?: string
): Promise<SchoolInquiry[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_INQUIRIES_BY_STATUS_QUERY,
    variables: { listingId, status },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getSchoolInquiriesByStatus || []) as SchoolInquiry[];
}

export async function getInquiryStats(
  listingId: string,
  accessToken?: string
): Promise<SchoolInquiryStatsResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_INQUIRY_STATS_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getInquiryStats as SchoolInquiryStatsResponse;
}

export async function createSchoolInquiry(
  input: CreateSchoolInquiryInput,
  accessToken?: string
): Promise<SchoolInquiry> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: CREATE_SCHOOL_INQUIRY_MUTATION,
    variables: { input },
    context,
    errorPolicy: 'all'
  });
  return data?.createSchoolInquiry as SchoolInquiry;
}

export async function updateSchoolInquiry(
  id: string,
  input: UpdateSchoolInquiryInput,
  accessToken?: string
): Promise<SchoolInquiry> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_SCHOOL_INQUIRY_MUTATION,
    variables: { id, input },
    context,
    errorPolicy: 'all'
  });
  return data?.updateSchoolInquiry as SchoolInquiry;
}

export async function deleteSchoolInquiry(
  id: string,
  accessToken?: string
): Promise<SchoolInquiry> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: DELETE_SCHOOL_INQUIRY_MUTATION,
    variables: { id },
    context,
    errorPolicy: 'all'
  });
  return data?.deleteSchoolInquiry as SchoolInquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: string,
  accessToken?: string
): Promise<SchoolInquiry> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_INQUIRY_STATUS_MUTATION,
    variables: { id, status },
    context,
    errorPolicy: 'all'
  });
  return data?.updateInquiryStatus as SchoolInquiry;
}


