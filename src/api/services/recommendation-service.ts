import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== ENUMS ==========
export enum RecommendationType {
  SCHOOLS = 'SCHOOLS',
  COURSES = 'COURSES',
  EVENTS = 'EVENTS',
  JOBS = 'JOBS'
}

// ========== TYPES ==========
export interface RecommendationScore {
  itemId: string;
  score: number;
  reason: string;
  confidence: number;
  distance?: number;
  categories: string[];
  location?: string;
  isFollowedCategory: boolean;
}

export interface RecommendationResponse {
  recommendations: RecommendationScore[];
  total: number;
  type: RecommendationType;
  timestamp: string;
}

export interface RecommendationUserPreferences {
  userId: string;
  categories: string[];
  lastUpdated: string;
}

export interface RecommendationFilters {
  categories?: string[];
  location?: string;
  maxDistance?: number;
  minScore?: number;
  excludeIds?: string[];
}

// ========== FRAGMENTS ==========
const RECOMMENDATION_SCORE_FRAGMENT = gql`
  fragment RecommendationScoreFragment on RecommendationScore {
    itemId
    score
    reason
    confidence
    distance
    categories
    location
    isFollowedCategory
  }
`;

const RECOMMENDATION_RESPONSE_FRAGMENT = gql`
  fragment RecommendationResponseFragment on RecommendationResponse {
    recommendations { ...RecommendationScoreFragment }
    total
    type
    timestamp
  }
  ${RECOMMENDATION_SCORE_FRAGMENT}
`;

// ========== QUERIES ==========
export const GET_RECOMMENDATIONS_QUERY = gql`
  query GetRecommendations($type: RecommendationType!, $limit: Int, $filters: RecommendationFilters) {
    getRecommendations(type: $type, limit: $limit, filters: $filters) { ...RecommendationResponseFragment }
  }
  ${RECOMMENDATION_RESPONSE_FRAGMENT}
`;

export const GET_ALL_RECOMMENDATIONS_QUERY = gql`
  query GetAllRecommendations($limit: Int) {
    getAllRecommendations(limit: $limit) { ...RecommendationResponseFragment }
  }
  ${RECOMMENDATION_RESPONSE_FRAGMENT}
`;

export const GET_USER_RECOMMENDATION_PREFERENCES_QUERY = gql`
  query GetUserRecommendationPreferences {
    getUserRecommendationPreferences { userId categories lastUpdated }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getRecommendations(type: RecommendationType, limit?: number, filters?: RecommendationFilters, accessToken?: string): Promise<RecommendationResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_RECOMMENDATIONS_QUERY, variables: { type, limit, filters }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getRecommendations as RecommendationResponse;
}

export async function getAllRecommendations(limit?: number, accessToken?: string): Promise<RecommendationResponse[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_ALL_RECOMMENDATIONS_QUERY, variables: { limit }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getAllRecommendations || []) as RecommendationResponse[];
}

export async function getUserRecommendationPreferences(accessToken?: string): Promise<RecommendationUserPreferences | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_RECOMMENDATION_PREFERENCES_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserRecommendationPreferences || null) as RecommendationUserPreferences | null;
}

// ========== HELPER FUNCTIONS ==========
export function getRecommendationTypeLabel(type: RecommendationType): string {
  switch (type) {
    case RecommendationType.SCHOOLS: return 'Schools';
    case RecommendationType.COURSES: return 'Courses';
    case RecommendationType.EVENTS: return 'Events';
    case RecommendationType.JOBS: return 'Jobs';
    default: return 'Unknown';
  }
}

export function getRecommendationTypeColor(type: RecommendationType): string {
  switch (type) {
    case RecommendationType.SCHOOLS: return 'bg-blue-100 text-blue-800';
    case RecommendationType.COURSES: return 'bg-green-100 text-green-800';
    case RecommendationType.EVENTS: return 'bg-purple-100 text-purple-800';
    case RecommendationType.JOBS: return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 0.8) return 'bg-green-100 text-green-800';
  if (score >= 0.6) return 'bg-yellow-100 text-yellow-800';
  if (score >= 0.4) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.8) return 'bg-green-100 text-green-800';
  if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
  if (confidence >= 0.4) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function formatScore(score: number): string {
  return (score * 100).toFixed(0) + '%';
}

export function formatConfidence(confidence: number): string {
  return (confidence * 100).toFixed(0) + '%';
}

export function formatDistance(distance?: number): string {
  if (!distance) return 'N/A';
  return `${distance.toFixed(1)} km`;
}
