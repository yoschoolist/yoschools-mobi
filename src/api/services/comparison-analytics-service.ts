import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface ComparisonCriteria {
  id: string;
  name: string;
  description?: string;
  category: 'ACADEMIC' | 'FACILITY' | 'FINANCIAL' | 'EXTRACURRICULAR' | 'LOCATION' | 'REPUTATION' | 'OTHER';
  weight: number;
  isActive: boolean;
  dataType: 'NUMBER' | 'PERCENTAGE' | 'RATING' | 'BOOLEAN' | 'TEXT';
  unit?: string;
  minValue?: number;
  maxValue?: number;
  options?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ComparisonScore {
  id: string;
  comparisonId: string;
  criteriaId: string;
  listingId: string;
  score: number;
  rawValue: any;
  normalizedScore: number;
  weight: number;
  weightedScore: number;
  notes?: string;
  source?: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  criteria?: ComparisonCriteria;
  listing?: { id: string; title: string; category: string };
}

export interface ComparisonAnalytics {
  id: string;
  comparisonId: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  startDate: string;
  endDate: string;
  totalComparisons: number;
  uniqueUsers: number;
  averageComparisonDuration: number;
  mostComparedListings: Array<{ listingId: string; title: string; comparisonCount: number; averageScore: number }>;
  topComparisonCriteria: Array<{ criteriaId: string; name: string; usageCount: number; averageWeight: number }>;
  comparisonOutcomes: Array<{ outcome: string; count: number; percentage: number }>;
  userEngagement: { totalSessions: number; averageSessionDuration: number; bounceRate: number; returnRate: number };
  conversionMetrics: { totalConversions: number; conversionRate: number; averageTimeToConversion: number; topConversionPaths: Array<{ path: string; count: number; conversionRate: number }> };
  createdAt: string;
  updatedAt: string;
}

export interface ComparisonList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  isDefault: boolean;
  listingCount: number;
  criteriaCount: number;
  totalScore: number;
  averageScore: number;
  lastCompared: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{ id: string; listingId: string; listing: { id: string; title: string; category: string } }>;
  criteria: Array<{ id: string; criteriaId: string; weight: number; criteria: ComparisonCriteria }>;
  user?: { id: string; name: string; email: string };
}

export interface ComparisonFilterInput {
  userId?: string;
  listingId?: string;
  criteriaId?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  minScore?: number;
  maxScore?: number;
  isActive?: boolean;
}

export interface ComparisonSortInput {
  field?: 'totalScore' | 'averageScore' | 'listingCount' | 'criteriaCount' | 'lastCompared' | 'createdAt';
  order?: 'ASC' | 'DESC';
}

export interface ComparisonSummary {
  totalComparisons: number;
  activeComparisons: number;
  totalUsers: number;
  averageComparisonScore: number;
  topComparisonCategories: Array<{ category: string; count: number; percentage: number }>;
  comparisonTrends: Array<{ date: string; comparisons: number; users: number; averageScore: number }>;
  topPerformers: Array<{ listingId: string; title: string; comparisonCount: number; averageScore: number }>;
}

// ========== FRAGMENTS ==========
const COMPARISON_CRITERIA_FRAGMENT = gql`
  fragment ComparisonCriteriaFragment on ComparisonCriteria {
    id
    name
    description
    category
    weight
    isActive
    dataType
    unit
    minValue
    maxValue
    options
    createdAt
    updatedAt
  }
`;

const COMPARISON_SCORE_FRAGMENT = gql`
  fragment ComparisonScoreFragment on ComparisonScore {
    id
    comparisonId
    criteriaId
    listingId
    score
    rawValue
    normalizedScore
    weight
    weightedScore
    notes
    source
    lastUpdated
    createdAt
    updatedAt
    criteria { ...ComparisonCriteriaFragment }
    listing { id title category }
  }
`;

const COMPARISON_ANALYTICS_FRAGMENT = gql`
  fragment ComparisonAnalyticsFragment on ComparisonAnalytics {
    id
    comparisonId
    period
    startDate
    endDate
    totalComparisons
    uniqueUsers
    averageComparisonDuration
    mostComparedListings { listingId title comparisonCount averageScore }
    topComparisonCriteria { criteriaId name usageCount averageWeight }
    comparisonOutcomes { outcome count percentage }
    userEngagement { totalSessions averageSessionDuration bounceRate returnRate }
    conversionMetrics { totalConversions conversionRate averageTimeToConversion topConversionPaths { path count conversionRate } }
    createdAt
    updatedAt
  }
`;

const COMPARISON_LIST_FRAGMENT = gql`
  fragment ComparisonListFragment on ComparisonList {
    id
    userId
    name
    description
    isPublic
    isDefault
    listingCount
    criteriaCount
    totalScore
    averageScore
    lastCompared
    createdAt
    updatedAt
    items { id listingId listing { id title category } }
    criteria { id criteriaId weight criteria { ...ComparisonCriteriaFragment } }
    user { id name email }
  }
`;

// ========== QUERIES ==========
const GET_COMPARISON_CRITERIA_QUERY = gql`
  ${COMPARISON_CRITERIA_FRAGMENT}
  query GetComparisonCriteria($filter: ComparisonFilterInput, $sort: ComparisonSortInput) {
    getComparisonCriteria(filter: $filter, sort: $sort) { ...ComparisonCriteriaFragment }
  }
`;

const GET_COMPARISON_SCORES_QUERY = gql`
  ${COMPARISON_SCORE_FRAGMENT}
  query GetComparisonScores($filter: ComparisonFilterInput, $sort: ComparisonSortInput, $limit: Int, $offset: Int) {
    getComparisonScores(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...ComparisonScoreFragment }
  }
`;

const GET_COMPARISON_ANALYTICS_QUERY = gql`
  ${COMPARISON_ANALYTICS_FRAGMENT}
  query GetComparisonAnalytics($filter: ComparisonFilterInput, $sort: ComparisonSortInput, $limit: Int, $offset: Int) {
    getComparisonAnalytics(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...ComparisonAnalyticsFragment }
  }
`;

const GET_COMPARISON_LISTS_QUERY = gql`
  ${COMPARISON_LIST_FRAGMENT}
  query GetComparisonLists($filter: ComparisonFilterInput, $sort: ComparisonSortInput, $limit: Int, $offset: Int) {
    getComparisonLists(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...ComparisonListFragment }
  }
`;

const GET_COMPARISON_SUMMARY_QUERY = gql`
  query GetComparisonSummary($timeRange: AnalyticsTimeRangeInput) {
    getComparisonSummary(timeRange: $timeRange) {
      totalComparisons
      activeComparisons
      totalUsers
      averageComparisonScore
      topComparisonCategories { category count percentage }
      comparisonTrends { date comparisons users averageScore }
      topPerformers { listingId title comparisonCount averageScore }
    }
  }
`;

const GET_COMPARISON_PERFORMANCE_QUERY = gql`
  query GetComparisonPerformance($listingId: String!, $timeRange: AnalyticsTimeRangeInput) {
    getComparisonPerformance(listingId: $listingId, timeRange: $timeRange) {
      listingId
      title
      totalComparisons
      uniqueComparisons
      averageScore
      scoreDistribution { range count percentage }
      criteriaPerformance { criteriaId name averageScore weight usageCount }
      comparisonTrends { date comparisons averageScore }
      topComparisons { comparisonId name score date }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_COMPARISON_CRITERIA_MUTATION = gql`
  ${COMPARISON_CRITERIA_FRAGMENT}
  mutation CreateComparisonCriteria($input: CreateComparisonCriteriaInput!) {
    createComparisonCriteria(input: $input) { ...ComparisonCriteriaFragment }
  }
`;

const UPDATE_COMPARISON_CRITERIA_MUTATION = gql`
  ${COMPARISON_CRITERIA_FRAGMENT}
  mutation UpdateComparisonCriteria($input: UpdateComparisonCriteriaInput!) {
    updateComparisonCriteria(input: $input) { ...ComparisonCriteriaFragment }
  }
`;

const DELETE_COMPARISON_CRITERIA_MUTATION = gql`
  mutation DeleteComparisonCriteria($id: String!) { deleteComparisonCriteria(id: $id) }
`;

const CREATE_COMPARISON_SCORE_MUTATION = gql`
  ${COMPARISON_SCORE_FRAGMENT}
  mutation CreateComparisonScore($input: CreateComparisonScoreInput!) {
    createComparisonScore(input: $input) { ...ComparisonScoreFragment }
  }
`;

const UPDATE_COMPARISON_SCORE_MUTATION = gql`
  ${COMPARISON_SCORE_FRAGMENT}
  mutation UpdateComparisonScore($input: UpdateComparisonScoreInput!) {
    updateComparisonScore(input: $input) { ...ComparisonScoreFragment }
  }
`;

const DELETE_COMPARISON_SCORE_MUTATION = gql`
  mutation DeleteComparisonScore($id: String!) { deleteComparisonScore(id: $id) }
`;

const GENERATE_COMPARISON_ANALYTICS_MUTATION = gql`
  ${COMPARISON_ANALYTICS_FRAGMENT}
  mutation GenerateComparisonAnalytics($comparisonId: String!, $timeRange: AnalyticsTimeRangeInput!) {
    generateComparisonAnalytics(comparisonId: $comparisonId, timeRange: $timeRange) { ...ComparisonAnalyticsFragment }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getComparisonCriteria(filter?: ComparisonFilterInput, sort?: ComparisonSortInput, accessToken?: string): Promise<ComparisonCriteria[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_CRITERIA_QUERY, variables: { filter, sort }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getComparisonCriteria || []) as ComparisonCriteria[];
}

export async function getComparisonScores(filter?: ComparisonFilterInput, sort?: ComparisonSortInput, limit?: number, offset?: number, accessToken?: string): Promise<ComparisonScore[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_SCORES_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getComparisonScores || []) as ComparisonScore[];
}

export async function getComparisonAnalytics(filter?: ComparisonFilterInput, sort?: ComparisonSortInput, limit?: number, offset?: number, accessToken?: string): Promise<ComparisonAnalytics[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_ANALYTICS_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getComparisonAnalytics || []) as ComparisonAnalytics[];
}

export async function getComparisonLists(filter?: ComparisonFilterInput, sort?: ComparisonSortInput, limit?: number, offset?: number, accessToken?: string): Promise<ComparisonList[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_LISTS_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getComparisonLists || []) as ComparisonList[];
}

export async function getComparisonSummary(timeRange?: any, accessToken?: string): Promise<ComparisonSummary> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_SUMMARY_QUERY, variables: { timeRange }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getComparisonSummary as ComparisonSummary;
}

export async function getComparisonPerformance(listingId: string, timeRange: any, accessToken?: string): Promise<any> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_PERFORMANCE_QUERY, variables: { listingId, timeRange }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getComparisonPerformance as any;
}

export async function createComparisonCriteria(input: any, accessToken?: string): Promise<ComparisonCriteria> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_COMPARISON_CRITERIA_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createComparisonCriteria as ComparisonCriteria;
}

export async function updateComparisonCriteria(input: any, accessToken?: string): Promise<ComparisonCriteria> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_COMPARISON_CRITERIA_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateComparisonCriteria as ComparisonCriteria;
}

export async function deleteComparisonCriteria(id: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_COMPARISON_CRITERIA_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteComparisonCriteria === true;
}

export async function createComparisonScore(input: any, accessToken?: string): Promise<ComparisonScore> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_COMPARISON_SCORE_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createComparisonScore as ComparisonScore;
}

export async function updateComparisonScore(input: any, accessToken?: string): Promise<ComparisonScore> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_COMPARISON_SCORE_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateComparisonScore as ComparisonScore;
}

export async function deleteComparisonScore(id: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_COMPARISON_SCORE_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteComparisonScore === true;
}

export async function generateComparisonAnalytics(comparisonId: string, timeRange: any, accessToken?: string): Promise<ComparisonAnalytics> {
  const { data } = await apolloClient.mutate({ mutation: GENERATE_COMPARISON_ANALYTICS_MUTATION, variables: { comparisonId, timeRange }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.generateComparisonAnalytics as ComparisonAnalytics;
}

// ========== HELPERS ==========
export function getCriteriaCategoryColor(category: string): string {
  switch (category) {
    case 'ACADEMIC': return 'bg-blue-100 text-blue-800';
    case 'FACILITY': return 'bg-green-100 text-green-800';
    case 'FINANCIAL': return 'bg-purple-100 text-purple-800';
    case 'EXTRACURRICULAR': return 'bg-orange-100 text-orange-800';
    case 'LOCATION': return 'bg-indigo-100 text-indigo-800';
    case 'REPUTATION': return 'bg-pink-100 text-pink-800';
    case 'OTHER': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getDataTypeColor(dataType: string): string {
  switch (dataType) {
    case 'NUMBER': return 'bg-blue-100 text-blue-800';
    case 'PERCENTAGE': return 'bg-green-100 text-green-800';
    case 'RATING': return 'bg-yellow-100 text-yellow-800';
    case 'BOOLEAN': return 'bg-purple-100 text-purple-800';
    case 'TEXT': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function formatScore(score: number, maxScore: number = 100): string {
  return `${score.toFixed(1)}/${maxScore}`;
}

export function getScoreColor(score: number, maxScore: number = 100): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'bg-green-100 text-green-800';
  if (percentage >= 60) return 'bg-blue-100 text-blue-800';
  if (percentage >= 40) return 'bg-yellow-100 text-yellow-800';
  if (percentage >= 20) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function calculateWeightedScore(scores: ComparisonScore[]): number {
  if (scores.length === 0) return 0;
  const totalWeightedScore = scores.reduce((sum, s) => sum + s.weightedScore, 0);
  const totalWeight = scores.reduce((sum, s) => sum + s.weight, 0);
  return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
}

export function normalizeScore(rawValue: number, minValue: number, maxValue: number, targetMin: number = 0, targetMax: number = 100): number {
  if (maxValue === minValue) return targetMin;
  const normalized = ((rawValue - minValue) / (maxValue - minValue)) * (targetMax - targetMin) + targetMin;
  return Math.max(targetMin, Math.min(targetMax, normalized));
}

export function getComparisonOutcomeColor(outcome: string): string {
  switch (outcome.toLowerCase()) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'abandoned': return 'bg-red-100 text-red-800';
    case 'partial': return 'bg-yellow-100 text-yellow-800';
    case 'saved': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function formatComparisonDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

export function getEngagementLevel(score: number): string {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Medium';
  if (score >= 40) return 'Low';
  return 'Very Low';
}

export function getEngagementColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-blue-100 text-blue-800';
  if (score >= 40) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}


