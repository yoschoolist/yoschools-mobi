import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  filters?: Record<string, any>;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  createdAt: string;
}

export interface CreateSearchHistoryInput {
  query: string;
  filters?: Record<string, any>;
  countryId?: string;
  regionId?: string;
  localityId?: string;
}

export interface SearchAnalytics {
  totalSearches: number;
  todaySearches: number;
  totalResults: number;
  averageResults: number;
  lastSearch?: string;
}

export interface PopularSearch { query: string; count: number }
export interface SearchTrend { query: string; count: number; date: string }
export interface SearchSuggestion { query: string }

// ========== FRAGMENTS ==========
const SEARCH_HISTORY_FRAGMENT = gql`
  fragment SearchHistoryFragment on SearchHistory {
    id
    userId
    query
    filters
    countryId
    regionId
    localityId
    createdAt
  }
`;

const SEARCH_ANALYTICS_FRAGMENT = gql`
  fragment SearchAnalyticsFragment on SearchAnalytics {
    totalSearches
    todaySearches
    totalResults
    averageResults
    lastSearch
  }
`;

const POPULAR_SEARCH_FRAGMENT = gql`
  fragment PopularSearchFragment on PopularSearch { query count }
`;

const SEARCH_TREND_FRAGMENT = gql`
  fragment SearchTrendFragment on SearchTrend { query count date }
`;

const SEARCH_SUGGESTION_FRAGMENT = gql`
  fragment SearchSuggestionFragment on SearchSuggestion { query }
`;

// ========== QUERIES ==========
const GET_USER_SEARCH_HISTORY_QUERY = gql`
  ${SEARCH_HISTORY_FRAGMENT}
  query GetUserSearchHistory($limit: Float!, $offset: Float!) {
    getUserSearchHistory(limit: $limit, offset: $offset) { ...SearchHistoryFragment }
  }
`;

const GET_SEARCH_HISTORY_BY_ID_QUERY = gql`
  ${SEARCH_HISTORY_FRAGMENT}
  query GetSearchHistoryById($id: String!) { getSearchHistoryById(id: $id) { ...SearchHistoryFragment } }
`;

const GET_SEARCH_ANALYTICS_QUERY = gql`
  ${SEARCH_ANALYTICS_FRAGMENT}
  query GetSearchAnalytics { getSearchAnalytics { ...SearchAnalyticsFragment } }
`;

const GET_POPULAR_SEARCHES_QUERY = gql`
  ${POPULAR_SEARCH_FRAGMENT}
  query GetPopularSearches($limit: Float!) { getPopularSearches(limit: $limit) { ...PopularSearchFragment } }
`;

const GET_SEARCH_TRENDS_QUERY = gql`
  ${SEARCH_TREND_FRAGMENT}
  query GetSearchTrends($days: Float!) { getSearchTrends(days: $days) { ...SearchTrendFragment } }
`;

const GET_SEARCH_SUGGESTIONS_QUERY = gql`
  ${SEARCH_SUGGESTION_FRAGMENT}
  query GetSearchSuggestions($query: String!, $limit: Float!) {
    getSearchSuggestions(query: $query, limit: $limit) { ...SearchSuggestionFragment }
  }
`;

// ========== MUTATIONS ==========
const CREATE_SEARCH_HISTORY_MUTATION = gql`
  ${SEARCH_HISTORY_FRAGMENT}
  mutation CreateSearchHistory($input: CreateSearchHistoryInput!) {
    createSearchHistory(input: $input) { ...SearchHistoryFragment }
  }
`;

const DELETE_OLD_SEARCH_HISTORY_MUTATION = gql`
  mutation DeleteOldSearchHistory($daysOld: Float!) { deleteOldSearchHistory(daysOld: $daysOld) }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getUserSearchHistory(limit: number = 50, offset: number = 0, accessToken?: string): Promise<SearchHistory[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_SEARCH_HISTORY_QUERY, variables: { limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserSearchHistory || []) as SearchHistory[];
}

export async function getSearchHistoryById(id: string, accessToken?: string): Promise<SearchHistory | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_SEARCH_HISTORY_BY_ID_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getSearchHistoryById || null) as SearchHistory | null;
}

export async function getSearchAnalytics(accessToken?: string): Promise<SearchAnalytics> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_SEARCH_ANALYTICS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getSearchAnalytics as SearchAnalytics;
}

export async function getPopularSearches(limit: number = 20): Promise<PopularSearch[]> {
  const { data } = await apolloClient.query({ query: GET_POPULAR_SEARCHES_QUERY, variables: { limit }, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getPopularSearches || []) as PopularSearch[];
}

export async function getSearchTrends(days: number = 7): Promise<SearchTrend[]> {
  const { data } = await apolloClient.query({ query: GET_SEARCH_TRENDS_QUERY, variables: { days }, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getSearchTrends || []) as SearchTrend[];
}

export async function getSearchSuggestions(query: string, limit: number = 10): Promise<SearchSuggestion[]> {
  const { data } = await apolloClient.query({ query: GET_SEARCH_SUGGESTIONS_QUERY, variables: { query, limit }, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getSearchSuggestions || []) as SearchSuggestion[];
}

export async function createSearchHistory(input: CreateSearchHistoryInput, accessToken?: string): Promise<SearchHistory> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_SEARCH_HISTORY_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createSearchHistory as SearchHistory;
}

export async function deleteOldSearchHistory(daysOld: number = 90, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_OLD_SEARCH_HISTORY_MUTATION, variables: { daysOld }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteOldSearchHistory === true;
}

// ========== HELPERS ==========
export function formatSearchQuery(query: string): string { return query.length > 50 ? `${query.substring(0, 50)}...` : query; }

export function formatSearchDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function getSearchQueryColor(query: string): string {
  const hash = query.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  const colors = ['bg-blue-100 text-blue-800','bg-green-100 text-green-800','bg-purple-100 text-purple-800','bg-orange-100 text-orange-800','bg-pink-100 text-pink-800','bg-indigo-100 text-indigo-800','bg-red-100 text-red-800','bg-yellow-100 text-yellow-800'];
  return colors[Math.abs(hash) % colors.length];
}

export function getSearchTrendColor(trend: number): string { if (trend > 0) return 'text-green-600'; if (trend < 0) return 'text-red-600'; return 'text-gray-600'; }
export function getSearchTrendIcon(trend: number): string { if (trend > 0) return '↗️'; if (trend < 0) return '↘️'; return '→'; }


