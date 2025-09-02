import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== ENUMS ==========
export enum ActivityType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  VIEW_LISTING = 'VIEW_LISTING',
  SEARCH = 'SEARCH',
  COMPARE_LISTINGS = 'COMPARE_LISTINGS',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  PLACE_ORDER = 'PLACE_ORDER',
  ADD_TO_WISHLIST = 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST',
  WRITE_REVIEW = 'WRITE_REVIEW',
  RATE_LISTING = 'RATE_LISTING',
  SHARE_LISTING = 'SHARE_LISTING',
  DOWNLOAD_DOCUMENT = 'DOWNLOAD_DOCUMENT',
  CONTACT_SCHOOL = 'CONTACT_SCHOOL',
  APPLY_TO_SCHOOL = 'APPLY_TO_SCHOOL',
  BOOK_TOUR = 'BOOK_TOUR',
  ATTEND_EVENT = 'ATTEND_EVENT',
  JOIN_WAITLIST = 'JOIN_WAITLIST',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  REFUND_REQUEST = 'REFUND_REQUEST',
  SUPPORT_REQUEST = 'SUPPORT_REQUEST',
  FEEDBACK_SUBMISSION = 'FEEDBACK_SUBMISSION',
  EMAIL_OPEN = 'EMAIL_OPEN',
  EMAIL_CLICK = 'EMAIL_CLICK',
  PUSH_NOTIFICATION_OPEN = 'PUSH_NOTIFICATION_OPEN',
  PUSH_NOTIFICATION_DISMISS = 'PUSH_NOTIFICATION_DISMISS'
}

export enum ActivityStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  PARTIAL = 'PARTIAL'
}

// ========== TYPES ==========
export interface UserActivity {
  id: string;
  userId: string;
  activityType: ActivityType;
  status: ActivityStatus;
  description: string;
  metadata: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  deviceInfo?: {
    type: 'DESKTOP' | 'MOBILE' | 'TABLET' | 'UNKNOWN';
    browser?: string;
    browserVersion?: string;
    operatingSystem?: string;
    osVersion?: string;
    screenResolution?: string;
  };
  sessionId?: string;
  referrer?: string;
  source: 'WEB' | 'MOBILE_APP' | 'API' | 'EMAIL' | 'SMS' | 'PUSH' | 'OTHER';
  medium: 'DIRECT' | 'ORGANIC' | 'PAID' | 'REFERRAL' | 'EMAIL' | 'SOCIAL' | 'OTHER';
  campaign?: string;
  term?: string;
  content?: string;
  duration?: number;
  result?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; email: string; role: string };
}

export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  filters: Record<string, any>;
  resultsCount: number;
  clickedResults: string[];
  searchDuration: number;
  source: 'SEARCH_BAR' | 'FILTERS' | 'SUGGESTIONS' | 'RECENT_SEARCHES' | 'POPULAR_SEARCHES';
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; email: string };
}

export interface UserEngagement {
  id: string;
  userId: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  startDate: string;
  endDate: string;
  totalActivities: number;
  uniqueSessions: number;
  totalSessionDuration: number;
  averageSessionDuration: number;
  pageViews: number;
  uniquePageViews: number;
  bounceRate: number;
  returnRate: number;
  engagementScore: number;
  activityBreakdown: Record<ActivityType, number>;
  topPages: Array<{ page: string; views: number; timeOnPage: number }>;
  deviceUsage: Record<string, number>;
  locationBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
  conversionMetrics: {
    totalConversions: number;
    conversionRate: number;
    conversionValue: number;
    topConversionPaths: Array<{ path: string; count: number; conversionRate: number }>;
  };
  retentionMetrics: {
    day1Retention: number;
    day7Retention: number;
    day30Retention: number;
    churnRate: number;
  };
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; email: string };
}

export interface ActivityFilterInput {
  userId?: string;
  activityType?: ActivityType;
  status?: ActivityStatus;
  source?: string;
  medium?: string;
  startDate?: string;
  endDate?: string;
  minDuration?: number;
  maxDuration?: number;
  hasLocation?: boolean;
  hasDeviceInfo?: boolean;
}

export interface ActivitySortInput {
  field?: 'createdAt' | 'updatedAt' | 'duration' | 'activityType' | 'status';
  order?: 'ASC' | 'DESC';
}

export interface UserActivitySummary {
  totalUsers: number;
  activeUsers: number;
  totalActivities: number;
  averageActivitiesPerUser: number;
  topActivityTypes: Array<{ type: ActivityType; count: number; percentage: number }>;
  userSegments: Array<{ segment: string; count: number; percentage: number; averageEngagement: number }>;
  activityTrends: Array<{ date: string; activities: number; users: number; engagement: number }>;
  topPerformers: Array<{ userId: string; name: string; activities: number; engagement: number }>;
  deviceUsage: Record<string, number>;
  locationBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
}

// ========== FRAGMENTS ==========
const USER_ACTIVITY_FRAGMENT = gql`
  fragment UserActivityFragment on UserActivity {
    id
    userId
    activityType
    status
    description
    metadata
    ipAddress
    userAgent
    location { country region city latitude longitude }
    deviceInfo { type browser browserVersion operatingSystem osVersion screenResolution }
    sessionId
    referrer
    source
    medium
    campaign
    term
    content
    duration
    result
    errorMessage
    createdAt
    updatedAt
    user { id name email role }
  }
`;

const SEARCH_HISTORY_FRAGMENT = gql`
  fragment SearchHistoryFragment on SearchHistory {
    id
    userId
    query
    filters
    resultsCount
    clickedResults
    searchDuration
    source
    ipAddress
    userAgent
    sessionId
    createdAt
    updatedAt
    user { id name email }
  }
`;

const USER_ENGAGEMENT_FRAGMENT = gql`
  fragment UserEngagementFragment on UserEngagement {
    id
    userId
    period
    startDate
    endDate
    totalActivities
    uniqueSessions
    totalSessionDuration
    averageSessionDuration
    pageViews
    uniquePageViews
    bounceRate
    returnRate
    engagementScore
    activityBreakdown
    topPages { page views timeOnPage }
    deviceUsage
    locationBreakdown
    sourceBreakdown
    conversionMetrics { totalConversions conversionRate conversionValue topConversionPaths { path count conversionRate } }
    retentionMetrics { day1Retention day7Retention day30Retention churnRate }
    createdAt
    updatedAt
    user { id name email }
  }
`;

// ========== QUERIES ==========
const GET_USER_ACTIVITIES_QUERY = gql`
  ${USER_ACTIVITY_FRAGMENT}
  query GetUserActivities($filter: ActivityFilterInput, $sort: ActivitySortInput, $limit: Int, $offset: Int) {
    getUserActivities(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...UserActivityFragment }
  }
`;

const GET_USER_ACTIVITY_BY_ID_QUERY = gql`
  ${USER_ACTIVITY_FRAGMENT}
  query GetUserActivityById($id: String!) { getUserActivityById(id: $id) { ...UserActivityFragment } }
`;

const GET_USER_ACTIVITIES_BY_USER_QUERY = gql`
  ${USER_ACTIVITY_FRAGMENT}
  query GetUserActivitiesByUser($userId: String!, $filter: ActivityFilterInput) {
    getUserActivitiesByUser(userId: $userId, filter: $filter) { ...UserActivityFragment }
  }
`;

const GET_SEARCH_HISTORY_QUERY = gql`
  ${SEARCH_HISTORY_FRAGMENT}
  query GetSearchHistory($filter: ActivityFilterInput, $sort: ActivitySortInput, $limit: Int, $offset: Int) {
    getSearchHistory(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...SearchHistoryFragment }
  }
`;

const GET_USER_ENGAGEMENT_QUERY = gql`
  ${USER_ENGAGEMENT_FRAGMENT}
  query GetUserEngagement($filter: ActivityFilterInput, $sort: ActivitySortInput, $limit: Int, $offset: Int) {
    getUserEngagement(filter: $filter, sort: $sort, limit: $limit, offset: $offset) { ...UserEngagementFragment }
  }
`;

const GET_USER_ACTIVITY_SUMMARY_QUERY = gql`
  query GetUserActivitySummary($timeRange: AnalyticsTimeRangeInput) {
    getUserActivitySummary(timeRange: $timeRange) {
      totalUsers
      activeUsers
      totalActivities
      averageActivitiesPerUser
      topActivityTypes { type count percentage }
      userSegments { segment count percentage averageEngagement }
      activityTrends { date activities users engagement }
      topPerformers { userId name activities engagement }
      deviceUsage
      locationBreakdown
      sourceBreakdown
    }
  }
`;

const GET_USER_PERFORMANCE_QUERY = gql`
  query GetUserPerformance($userId: String!, $timeRange: AnalyticsTimeRangeInput) {
    getUserPerformance(userId: $userId, timeRange: $timeRange) {
      userId
      name
      totalActivities
      uniqueSessions
      totalSessionDuration
      averageSessionDuration
      engagementScore
      activityBreakdown { type count percentage }
      topPages { page views timeOnPage }
      deviceUsage
      locationBreakdown
      conversionMetrics { totalConversions conversionRate conversionValue }
      retentionMetrics { day1Retention day7Retention day30Retention churnRate }
      activityTrends { date activities engagement }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_USER_ACTIVITY_MUTATION = gql`
  ${USER_ACTIVITY_FRAGMENT}
  mutation CreateUserActivity($input: CreateUserActivityInput!) { createUserActivity(input: $input) { ...UserActivityFragment } }
`;

const UPDATE_USER_ACTIVITY_MUTATION = gql`
  ${USER_ACTIVITY_FRAGMENT}
  mutation UpdateUserActivity($input: UpdateUserActivityInput!) { updateUserActivity(input: $input) { ...UserActivityFragment } }
`;

const DELETE_USER_ACTIVITY_MUTATION = gql`
  mutation DeleteUserActivity($id: String!) { deleteUserActivity(id: $id) }
`;

const CREATE_SEARCH_HISTORY_MUTATION = gql`
  ${SEARCH_HISTORY_FRAGMENT}
  mutation CreateSearchHistory($input: CreateSearchHistoryInput!) { createSearchHistory(input: $input) { ...SearchHistoryFragment } }
`;

const UPDATE_SEARCH_HISTORY_MUTATION = gql`
  ${SEARCH_HISTORY_FRAGMENT}
  mutation UpdateSearchHistory($input: UpdateSearchHistoryInput!) { updateSearchHistory(input: $input) { ...SearchHistoryFragment } }
`;

const DELETE_SEARCH_HISTORY_MUTATION = gql`
  mutation DeleteSearchHistory($id: String!) { deleteSearchHistory(id: $id) }
`;

const GENERATE_USER_ENGAGEMENT_MUTATION = gql`
  ${USER_ENGAGEMENT_FRAGMENT}
  mutation GenerateUserEngagement($userId: String!, $timeRange: AnalyticsTimeRangeInput!) {
    generateUserEngagement(userId: $userId, timeRange: $timeRange) { ...UserEngagementFragment }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getUserActivities(filter?: ActivityFilterInput, sort?: ActivitySortInput, limit?: number, offset?: number, accessToken?: string): Promise<UserActivity[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_ACTIVITIES_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserActivities || []) as UserActivity[];
}

export async function getUserActivityById(id: string, accessToken?: string): Promise<UserActivity | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_ACTIVITY_BY_ID_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserActivityById || null) as UserActivity | null;
}

export async function getUserActivitiesByUser(userId: string, filter?: ActivityFilterInput, accessToken?: string): Promise<UserActivity[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_ACTIVITIES_BY_USER_QUERY, variables: { userId, filter }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserActivitiesByUser || []) as UserActivity[];
}

export async function getSearchHistory(filter?: ActivityFilterInput, sort?: ActivitySortInput, limit?: number, offset?: number, accessToken?: string): Promise<SearchHistory[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_SEARCH_HISTORY_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getSearchHistory || []) as SearchHistory[];
}

export async function getUserEngagement(filter?: ActivityFilterInput, sort?: ActivitySortInput, limit?: number, offset?: number, accessToken?: string): Promise<UserEngagement[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_ENGAGEMENT_QUERY, variables: { filter, sort, limit, offset }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return (data?.getUserEngagement || []) as UserEngagement[];
}

export async function getUserActivitySummary(timeRange?: any, accessToken?: string): Promise<UserActivitySummary> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_ACTIVITY_SUMMARY_QUERY, variables: { timeRange }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getUserActivitySummary as UserActivitySummary;
}

export async function getUserPerformance(userId: string, timeRange: any, accessToken?: string): Promise<any> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_PERFORMANCE_QUERY, variables: { userId, timeRange }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getUserPerformance as any;
}

export async function createUserActivity(input: any, accessToken?: string): Promise<UserActivity> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_USER_ACTIVITY_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createUserActivity as UserActivity;
}

export async function updateUserActivity(input: any, accessToken?: string): Promise<UserActivity> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_USER_ACTIVITY_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateUserActivity as UserActivity;
}

export async function deleteUserActivity(id: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_USER_ACTIVITY_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteUserActivity === true;
}

export async function createSearchHistory(input: any, accessToken?: string): Promise<SearchHistory> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_SEARCH_HISTORY_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createSearchHistory as SearchHistory;
}

export async function updateSearchHistory(input: any, accessToken?: string): Promise<SearchHistory> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_SEARCH_HISTORY_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateSearchHistory as SearchHistory;
}

export async function deleteSearchHistory(id: string, accessToken?: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_SEARCH_HISTORY_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.deleteSearchHistory === true;
}

export async function generateUserEngagement(userId: string, timeRange: any, accessToken?: string): Promise<UserEngagement> {
  const { data } = await apolloClient.mutate({ mutation: GENERATE_USER_ENGAGEMENT_MUTATION, variables: { userId, timeRange }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.generateUserEngagement as UserEngagement;
}

// ========== HELPERS ==========
export function getActivityTypeColor(type: ActivityType): string {
  switch (type) {
    case ActivityType.LOGIN:
    case ActivityType.CREATE_ACCOUNT: return 'bg-green-100 text-green-800';
    case ActivityType.LOGOUT: return 'bg-gray-100 text-gray-800';
    case ActivityType.VIEW_LISTING:
    case ActivityType.SEARCH: return 'bg-blue-100 text-blue-800';
    case ActivityType.COMPARE_LISTINGS: return 'bg-purple-100 text-purple-800';
    case ActivityType.ADD_TO_CART:
    case ActivityType.PLACE_ORDER: return 'bg-orange-100 text-orange-800';
    case ActivityType.PAYMENT_SUCCESS: return 'bg-green-100 text-green-800';
    case ActivityType.PAYMENT_FAILED: return 'bg-red-100 text-red-800';
    case ActivityType.WRITE_REVIEW:
    case ActivityType.RATE_LISTING: return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getActivityStatusColor(status: ActivityStatus): string {
  switch (status) {
    case ActivityStatus.SUCCESS: return 'bg-green-100 text-green-800';
    case ActivityStatus.FAILED: return 'bg-red-100 text-red-800';
    case ActivityStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
    case ActivityStatus.CANCELLED: return 'bg-gray-100 text-gray-800';
    case ActivityStatus.PARTIAL: return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getDeviceTypeColor(type: string): string {
  switch (type) {
    case 'DESKTOP': return 'bg-blue-100 text-blue-800';
    case 'MOBILE': return 'bg-green-100 text-green-800';
    case 'TABLET': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getSourceColor(source: string): string {
  switch (source.toLowerCase()) {
    case 'web': return 'bg-blue-100 text-blue-800';
    case 'mobile_app': return 'bg-green-100 text-green-800';
    case 'api': return 'bg-purple-100 text-purple-800';
    case 'email': return 'bg-indigo-100 text-indigo-800';
    case 'sms': return 'bg-orange-100 text-orange-800';
    case 'push': return 'bg-pink-100 text-pink-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getMediumColor(medium: string): string {
  switch (medium.toLowerCase()) {
    case 'direct': return 'bg-blue-100 text-blue-800';
    case 'organic': return 'bg-green-100 text-green-800';
    case 'paid': return 'bg-red-100 text-red-800';
    case 'referral': return 'bg-orange-100 text-orange-800';
    case 'email': return 'bg-indigo-100 text-indigo-800';
    case 'social': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
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

export function calculateEngagementScore(activities: number, sessions: number, sessionDuration: number, pageViews: number, bounceRate: number): number {
  const activityScore = Math.min(activities / 10, 1) * 25;
  const sessionScore = Math.min(sessions / 5, 1) * 25;
  const durationScore = Math.min(sessionDuration / 1800, 1) * 25;
  const pageScore = Math.min(pageViews / 20, 1) * 25;
  return Math.round(activityScore + sessionScore + durationScore + pageScore);
}

export function getActivityTypeIcon(type: ActivityType): string {
  switch (type) {
    case ActivityType.LOGIN: return '🔑';
    case ActivityType.VIEW_LISTING: return '👁️';
    case ActivityType.SEARCH: return '🔍';
    case ActivityType.COMPARE_LISTINGS: return '⚖️';
    case ActivityType.ADD_TO_CART: return '🛒';
    case ActivityType.PLACE_ORDER: return '📦';
    case ActivityType.WRITE_REVIEW: return '✍️';
    case ActivityType.PAYMENT_SUCCESS: return '✅';
    case ActivityType.PAYMENT_FAILED: return '❌';
    default: return '📊';
  }
}

export function getDeviceTypeIcon(type: string): string {
  switch (type) {
    case 'DESKTOP': return '💻';
    case 'MOBILE': return '📱';
    case 'TABLET': return '📱';
    default: return '❓';
  }
}

export function getSourceIcon(source: string): string {
  switch (source.toLowerCase()) {
    case 'web': return '🌐';
    case 'mobile_app': return '📱';
    case 'api': return '🔌';
    case 'email': return '📧';
    case 'sms': return '💬';
    case 'push': return '🔔';
    default: return '📊';
  }
}

export function getActivityTypeLabel(type: ActivityType): string {
  switch (type) {
    case ActivityType.LOGIN: return 'Login';
    case ActivityType.LOGOUT: return 'Logout';
    case ActivityType.VIEW_LISTING: return 'View Listing';
    case ActivityType.SEARCH: return 'Search';
    case ActivityType.COMPARE_LISTINGS: return 'Compare Listings';
    case ActivityType.CREATE_ACCOUNT: return 'Create Account';
    case ActivityType.UPDATE_PROFILE: return 'Update Profile';
    case ActivityType.SUBSCRIBE: return 'Subscribe';
    case ActivityType.UNSUBSCRIBE: return 'Unsubscribe';
    case ActivityType.ADD_TO_CART: return 'Add to Cart';
    case ActivityType.REMOVE_FROM_CART: return 'Remove from Cart';
    case ActivityType.PLACE_ORDER: return 'Place Order';
    case ActivityType.ADD_TO_WISHLIST: return 'Add to Wishlist';
    case ActivityType.REMOVE_FROM_WISHLIST: return 'Remove from Wishlist';
    case ActivityType.WRITE_REVIEW: return 'Write Review';
    case ActivityType.RATE_LISTING: return 'Rate Listing';
    case ActivityType.SHARE_LISTING: return 'Share Listing';
    case ActivityType.DOWNLOAD_DOCUMENT: return 'Download Document';
    case ActivityType.CONTACT_SCHOOL: return 'Contact School';
    case ActivityType.APPLY_TO_SCHOOL: return 'Apply to School';
    case ActivityType.BOOK_TOUR: return 'Book Tour';
    case ActivityType.ATTEND_EVENT: return 'Attend Event';
    case ActivityType.JOIN_WAITLIST: return 'Join Waitlist';
    case ActivityType.PAYMENT_SUCCESS: return 'Payment Success';
    case ActivityType.PAYMENT_FAILED: return 'Payment Failed';
    case ActivityType.REFUND_REQUEST: return 'Refund Request';
    case ActivityType.SUPPORT_REQUEST: return 'Support Request';
    case ActivityType.FEEDBACK_SUBMISSION: return 'Feedback Submission';
    case ActivityType.EMAIL_OPEN: return 'Email Open';
    case ActivityType.EMAIL_CLICK: return 'Email Click';
    case ActivityType.PUSH_NOTIFICATION_OPEN: return 'Push Notification Open';
    case ActivityType.PUSH_NOTIFICATION_DISMISS: return 'Push Notification Dismiss';
    default: return 'Unknown Activity';
  }
}

export function getEntityTypeLabel(entityType: string): string {
  switch (entityType.toLowerCase()) {
    case 'listing': return 'Listing';
    case 'school': return 'School';
    case 'product': return 'Product';
    case 'vendor': return 'Vendor';
    case 'user': return 'User';
    case 'order': return 'Order';
    case 'review': return 'Review';
    case 'event': return 'Event';
    case 'document': return 'Document';
    default: return 'Unknown Entity';
  }
}

export function formatActivityDate(date: string): string {
  const activityDate = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - activityDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Just now';
  else if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  else if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  else if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  else return activityDate.toLocaleDateString();
}

export async function getActivityStats(accessToken?: string): Promise<any> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_ACTIVITY_SUMMARY_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  return data?.getUserActivitySummary;
}

export async function getRecentActivities(limit: number = 10, accessToken?: string): Promise<UserActivity[]> {
  return getUserActivities(undefined, { field: 'createdAt', order: 'DESC' }, limit, undefined, accessToken);
}

export async function getActivityById(id: string, accessToken?: string): Promise<UserActivity | null> {
  return getUserActivityById(id, accessToken);
}
