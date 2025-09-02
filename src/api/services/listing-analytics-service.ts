import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface ListingView {
  id: string;
  listingId: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  source: 'DIRECT' | 'SEARCH' | 'SOCIAL' | 'REFERRAL' | 'EMAIL' | 'PAID_ADS';
  medium: 'ORGANIC' | 'CPC' | 'EMAIL' | 'SOCIAL' | 'REFERRAL' | 'DIRECT';
  campaign?: string;
  term?: string;
  content?: string;
  sessionId?: string;
  pageViews: number;
  timeOnPage: number;
  bounceRate: number;
  conversionRate: number;
  createdAt: string;
  updatedAt: string;
  listing?: { id: string; title: string; category: string };
  user?: { id: string; name: string; email: string };
}

export interface ListingAnalytics {
  id: string;
  listingId: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  startDate: string;
  endDate: string;
  totalViews: number;
  uniqueViews: number;
  totalVisitors: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
  clickThroughRate: number;
  engagementScore: number;
  searchImpressions: number;
  searchClicks: number;
  searchClickThroughRate: number;
  socialShares: number;
  socialClicks: number;
  socialEngagement: number;
  referralTraffic: number;
  emailTraffic: number;
  paidTraffic: number;
  organicTraffic: number;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  customerAcquisitionCost: number;
  returnOnAdSpend: number;
  createdAt: string;
  updatedAt: string;
  listing?: { id: string; title: string; category: string };
}

export interface AnalyticsFilterInput {
  listingId?: string;
  userId?: string;
  source?: string;
  medium?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  minViews?: number;
  maxViews?: number;
  minEngagement?: number;
  maxEngagement?: number;
}

export interface AnalyticsSortInput {
  field?: 'totalViews' | 'uniqueViews' | 'engagementScore' | 'conversionRate' | 'totalRevenue' | 'createdAt';
  order?: 'ASC' | 'DESC';
}

// ========== FRAGMENTS ==========
const LISTING_VIEW_FRAGMENT = gql`
  fragment ListingViewFragment on ListingView {
    id
    listingId
    userId
    ipAddress
    userAgent
    referrer
    source
    medium
    campaign
    term
    content
    sessionId
    pageViews
    timeOnPage
    bounceRate
    conversionRate
    createdAt
    updatedAt
    listing { id title category }
    user { id name email }
  }
`;

const LISTING_ANALYTICS_FRAGMENT = gql`
  fragment ListingAnalyticsFragment on ListingAnalytics {
    id
    listingId
    period
    startDate
    endDate
    totalViews
    uniqueViews
    totalVisitors
    uniqueVisitors
    averageTimeOnPage
    bounceRate
    conversionRate
    clickThroughRate
    engagementScore
    searchImpressions
    searchClicks
    searchClickThroughRate
    socialShares
    socialClicks
    socialEngagement
    referralTraffic
    emailTraffic
    paidTraffic
    organicTraffic
    totalRevenue
    totalOrders
    averageOrderValue
    customerAcquisitionCost
    returnOnAdSpend
    createdAt
    updatedAt
    listing { id title category }
  }
`;

// ========== QUERIES ==========
const GET_LISTING_VIEWS_QUERY = gql`
  ${LISTING_VIEW_FRAGMENT}
  query GetListingViews($filter: AnalyticsFilterInput, $sort: AnalyticsSortInput, $limit: Int, $offset: Int) {
    getListingViews(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...ListingViewFragment }
  }
`;

const GET_LISTING_ANALYTICS_QUERY = gql`
  ${LISTING_ANALYTICS_FRAGMENT}
  query GetListingAnalytics($filter: AnalyticsFilterInput, $sort: AnalyticsSortInput, $limit: Int, $offset: Int) {
    getListingAnalytics(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...ListingAnalyticsFragment }
  }
`;

const GET_LISTING_ANALYTICS_BY_ID_QUERY = gql`
  ${LISTING_ANALYTICS_FRAGMENT}
  query GetListingAnalyticsById($id: String!) { getListingAnalyticsById(id: $id) { ...ListingAnalyticsFragment } }
`;

const GET_LISTING_ANALYTICS_SUMMARY_QUERY = gql`
  query GetListingAnalyticsSummary($timeRange: AnalyticsTimeRangeInput) {
    getListingAnalyticsSummary(timeRange: $timeRange) {
      totalListings
      totalViews
      totalVisitors
      averageEngagement
      averageConversion
      totalRevenue
      topPerformers { listingId title views engagement revenue }
      trafficSources { source views percentage }
      trends { date views visitors engagement }
    }
  }
`;

const GET_LISTING_PERFORMANCE_QUERY = gql`
  query GetListingPerformance($listingId: String!, $timeRange: AnalyticsTimeRangeInput) {
    getListingPerformance(listingId: $listingId, timeRange: $timeRange) {
      listingId
      title
      totalViews
      uniqueViews
      totalVisitors
      uniqueVisitors
      averageTimeOnPage
      bounceRate
      conversionRate
      engagementScore
      trafficSources { source views percentage }
      dailyStats { date views visitors engagement conversions }
      topReferrers { referrer views percentage }
      userSegments { segment count percentage }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_LISTING_VIEW_MUTATION = gql`
  ${LISTING_VIEW_FRAGMENT}
  mutation CreateListingView($input: CreateListingViewInput!) { createListingView(input: $input) { ...ListingViewFragment } }
`;

const UPDATE_LISTING_VIEW_MUTATION = gql`
  ${LISTING_VIEW_FRAGMENT}
  mutation UpdateListingView($input: UpdateListingViewInput!) { updateListingView(input: $input) { ...ListingViewFragment } }
`;

const DELETE_LISTING_VIEW_MUTATION = gql`
  mutation DeleteListingView($id: String!) { deleteListingView(id: $id) }
`;

const GENERATE_LISTING_ANALYTICS_MUTATION = gql`
  ${LISTING_ANALYTICS_FRAGMENT}
  mutation GenerateListingAnalytics($listingId: String!, $timeRange: AnalyticsTimeRangeInput!) {
    generateListingAnalytics(listingId: $listingId, timeRange: $timeRange) { ...ListingAnalyticsFragment }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getListingViews(filter?: AnalyticsFilterInput, sort?: AnalyticsSortInput, limit?: number, offset?: number, accessToken?: string): Promise<ListingView[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_LISTING_VIEWS_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getListingViews || []) as ListingView[];
}

export async function getListingAnalytics(filter?: AnalyticsFilterInput, sort?: AnalyticsSortInput, limit?: number, offset?: number, accessToken?: string): Promise<ListingAnalytics[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_LISTING_ANALYTICS_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getListingAnalytics || []) as ListingAnalytics[];
}

export async function getListingAnalyticsById(id: string, accessToken?: string): Promise<ListingAnalytics | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_LISTING_ANALYTICS_BY_ID_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getListingAnalyticsById || null) as ListingAnalytics | null;
}

export async function getListingAnalyticsSummary(timeRange?: any, accessToken?: string): Promise<any> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_LISTING_ANALYTICS_SUMMARY_QUERY, variables: { timeRange }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getListingAnalyticsSummary as any;
}

export async function getListingPerformance(listingId: string, timeRange: any, accessToken?: string): Promise<any> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_LISTING_PERFORMANCE_QUERY, variables: { listingId, timeRange }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getListingPerformance as any;
}

export async function createListingView(input: any, accessToken?: string): Promise<ListingView> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_LISTING_VIEW_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createListingView as ListingView;
}

export async function updateListingView(input: any, accessToken?: string): Promise<ListingView> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_LISTING_VIEW_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateListingView as ListingView;
}

export async function deleteListingView(id: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_LISTING_VIEW_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteListingView === true;
}

export async function generateListingAnalytics(listingId: string, timeRange: any, accessToken?: string): Promise<ListingAnalytics> {
  const { data } = await apolloClient.mutate({ mutation: GENERATE_LISTING_ANALYTICS_MUTATION, variables: { listingId, timeRange }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.generateListingAnalytics as ListingAnalytics;
}

// ========== HELPERS ==========
export function getTrafficSourceColor(source: string): string {
  switch (source.toLowerCase()) {
    case 'direct': return 'bg-blue-100 text-blue-800';
    case 'search': return 'bg-green-100 text-green-800';
    case 'social': return 'bg-purple-100 text-purple-800';
    case 'referral': return 'bg-orange-100 text-orange-800';
    case 'email': return 'bg-indigo-100 text-indigo-800';
    case 'paid_ads': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getMediumColor(medium: string): string {
  switch (medium.toLowerCase()) {
    case 'organic': return 'bg-green-100 text-green-800';
    case 'cpc': return 'bg-red-100 text-red-800';
    case 'email': return 'bg-indigo-100 text-indigo-800';
    case 'social': return 'bg-purple-100 text-purple-800';
    case 'referral': return 'bg-orange-100 text-orange-800';
    case 'direct': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function formatEngagementScore(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Average';
  if (score >= 20) return 'Poor';
  return 'Very Poor';
}

export function getEngagementColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-blue-100 text-blue-800';
  if (score >= 40) return 'bg-yellow-100 text-yellow-800';
  if (score >= 20) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function formatBounceRate(rate: number): string { return `${rate.toFixed(1)}%`; }

export function getBounceRateColor(rate: number): string {
  if (rate <= 30) return 'bg-green-100 text-green-800';
  if (rate <= 50) return 'bg-blue-100 text-blue-800';
  if (rate <= 70) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export function formatConversionRate(rate: number): string { return `${rate.toFixed(2)}%`; }

export function getConversionRateColor(rate: number): string {
  if (rate >= 5) return 'bg-green-100 text-green-800';
  if (rate >= 3) return 'bg-blue-100 text-blue-800';
  if (rate >= 1) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export function formatTimeOnPage(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

export function calculateEngagementScore(timeOnPage: number, pageViews: number, bounceRate: number, conversionRate: number): number {
  const timeScore = Math.min(timeOnPage / 300, 1) * 25;
  const pageScore = Math.min(pageViews / 5, 1) * 25;
  const bounceScore = (1 - bounceRate / 100) * 25;
  const conversionScore = Math.min(conversionRate / 10, 1) * 25;
  return Math.round(timeScore + pageScore + bounceScore + conversionScore);
}

export function getTrafficSourceIcon(source: string): string {
  switch (source.toLowerCase()) {
    case 'direct': return '🔗';
    case 'search': return '🔍';
    case 'social': return '📱';
    case 'referral': return '↗️';
    case 'email': return '📧';
    case 'paid_ads': return '💰';
    default: return '📊';
  }
}

export function getPeriodLabel(period: string): string {
  switch (period) {
    case 'DAILY': return 'Daily';
    case 'WEEKLY': return 'Weekly';
    case 'MONTHLY': return 'Monthly';
    case 'YEARLY': return 'Yearly';
    default: return 'Unknown';
  }
}

export function getPeriodColor(period: string): string {
  switch (period) {
    case 'DAILY': return 'bg-blue-100 text-blue-800';
    case 'WEEKLY': return 'bg-green-100 text-green-800';
    case 'MONTHLY': return 'bg-purple-100 text-purple-800';
    case 'YEARLY': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}


