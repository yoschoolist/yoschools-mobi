import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface Feedback {
  id: string;
  userId: string;
  subject: string;
  message: string;
  category: 'BUG' | 'FEATURE_REQUEST' | 'USER_EXPERIENCE' | 'GENERAL' | string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'CLOSED' | string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackInput { subject: string; message: string; category: Feedback['category'] }
export interface UpdateFeedbackInput { subject?: string; message?: string; category?: Feedback['category']; status?: Feedback['status'] }
export interface FeedbackStatsResponse { total: number; byCategory: Array<{ category: string; count: number }>; byStatus: Array<{ status: string; count: number }> }

// ========== FRAGMENT ==========
const FEEDBACK_FRAGMENT = gql`
  fragment FeedbackFragment on Feedback {
    id
    userId
    subject
    message
    category
    status
    createdAt
    updatedAt
  }
`;

// ========== QUERIES ==========
const GET_ALL_FEEDBACK_QUERY = gql`
  ${FEEDBACK_FRAGMENT}
  query GetAllFeedback($limit: Float, $offset: Float) { getAllFeedback(limit: $limit, offset: $offset) { ...FeedbackFragment } }
`;

const GET_FEEDBACK_BY_ID_QUERY = gql`
  ${FEEDBACK_FRAGMENT}
  query GetFeedback($id: String!) { getFeedback(id: $id) { ...FeedbackFragment } }
`;

const GET_USER_FEEDBACK_QUERY = gql`
  ${FEEDBACK_FRAGMENT}
  query GetUserFeedback($limit: Float, $offset: Float) { getUserFeedback(limit: $limit, offset: $offset) { ...FeedbackFragment } }
`;

const GET_FEEDBACK_BY_CATEGORY_QUERY = gql`
  ${FEEDBACK_FRAGMENT}
  query GetFeedbackByCategory($category: FeedbackCategory!, $limit: Float, $offset: Float) { getFeedbackByCategory(category: $category, limit: $limit, offset: $offset) { ...FeedbackFragment } }
`;

const GET_FEEDBACK_STATS_QUERY = gql`
  query GetFeedbackStats {
    getFeedbackStats {
      total
      byCategory { category count }
      byStatus { status count }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_FEEDBACK_MUTATION = gql`
  ${FEEDBACK_FRAGMENT}
  mutation CreateFeedback($input: CreateFeedbackInput!) { createFeedback(input: $input) { ...FeedbackFragment } }
`;

const UPDATE_FEEDBACK_MUTATION = gql`
  ${FEEDBACK_FRAGMENT}
  mutation UpdateFeedback($id: String!, $input: UpdateFeedbackInput!) { updateFeedback(id: $id, input: $input) { ...FeedbackFragment } }
`;

const DELETE_FEEDBACK_MUTATION = gql`
  ${FEEDBACK_FRAGMENT}
  mutation DeleteFeedback($id: String!) { deleteFeedback(id: $id) { ...FeedbackFragment } }
`;

const MARK_FEEDBACK_AS_RESOLVED_MUTATION = gql`
  ${FEEDBACK_FRAGMENT}
  mutation MarkFeedbackAsResolved($id: String!, $resolution: String!) { markFeedbackAsResolved(id: $id, resolution: $resolution) { ...FeedbackFragment } }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getAllFeedback(limit?: number, offset?: number, accessToken?: string): Promise<Feedback[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_ALL_FEEDBACK_QUERY, variables: { limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getAllFeedback || []) as Feedback[];
}

export async function getFeedbackById(id: string, accessToken?: string): Promise<Feedback | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_FEEDBACK_BY_ID_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getFeedback || null) as Feedback | null;
}

export async function getUserFeedback(limit?: number, offset?: number, accessToken?: string): Promise<Feedback[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_FEEDBACK_QUERY, variables: { limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserFeedback || []) as Feedback[];
}

export async function getFeedbackByCategory(category: string, limit?: number, offset?: number, accessToken?: string): Promise<Feedback[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_FEEDBACK_BY_CATEGORY_QUERY, variables: { category, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getFeedbackByCategory || []) as Feedback[];
}

export async function getFeedbackStats(accessToken?: string): Promise<FeedbackStatsResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_FEEDBACK_STATS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getFeedbackStats || { total: 0, byCategory: [], byStatus: [] }) as FeedbackStatsResponse;
}

export async function createFeedback(input: CreateFeedbackInput, accessToken?: string): Promise<Feedback> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_FEEDBACK_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createFeedback as Feedback;
}

export async function updateFeedback(id: string, input: UpdateFeedbackInput, accessToken?: string): Promise<Feedback> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_FEEDBACK_MUTATION, variables: { id, input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateFeedback as Feedback;
}

export async function deleteFeedback(id: string, accessToken?: string): Promise<Feedback> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_FEEDBACK_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteFeedback as Feedback;
}

export async function markFeedbackAsResolved(id: string, resolution: string, accessToken?: string): Promise<Feedback> {
  const { data } = await apolloClient.mutate({ mutation: MARK_FEEDBACK_AS_RESOLVED_MUTATION, variables: { id, resolution }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.markFeedbackAsResolved as Feedback;
}

// ========== HELPERS ==========
export function getFeedbackStatusColor(status: string): string {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'REVIEWED': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'RESOLVED': return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'CLOSED': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
}

export function getFeedbackCategoryColor(category: string): string {
  switch (category) {
    case 'BUG': return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'FEATURE_REQUEST': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'USER_EXPERIENCE': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    case 'GENERAL': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
}

export function formatFeedbackDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function truncateMessage(message: string, maxLength: number = 100): string { return message.length <= maxLength ? message : message.substring(0, maxLength) + '...'; }


