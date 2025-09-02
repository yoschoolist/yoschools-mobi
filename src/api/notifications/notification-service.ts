import { apolloClient } from '../common/apollo-client';

// Types for notifications
export enum NotificationType {
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  FOLLOWER_NEW_LISTING = 'FOLLOWER_NEW_LISTING',
  FOLLOWER_NEW_REVIEW = 'FOLLOWER_NEW_REVIEW',
  LISTING_REVIEWED = 'LISTING_REVIEWED',
  LISTING_FEATURED = 'LISTING_FEATURED',
  REVIEW_LIKED = 'REVIEW_LIKED',
  REVIEW_REPLIED = 'REVIEW_REPLIED',
  COMPARISON_SHARED = 'COMPARISON_SHARED',
  WEEKLY_DIGEST = 'WEEKLY_DIGEST',
  MONTHLY_SUMMARY = 'MONTHLY_SUMMARY',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  // Mobile-specific notification types
  APPLICATION_STATUS_UPDATE = 'APPLICATION_STATUS_UPDATE',
  APPLICATION_INTERVIEW_SCHEDULED = 'APPLICATION_INTERVIEW_SCHEDULED',
  APPLICATION_ACCEPTED = 'APPLICATION_ACCEPTED',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  SCHOOL_ANNOUNCEMENT = 'SCHOOL_ANNOUNCEMENT',
  ASSIGNMENT_DUE = 'ASSIGNMENT_DUE',
  GRADE_POSTED = 'GRADE_POSTED',
  EVENT_REMINDER = 'EVENT_REMINDER'
}

export enum NotificationContextType {
  USER = 'USER',
  LISTING = 'LISTING',
  REVIEW = 'REVIEW',
  COMPARISON = 'COMPARISON',
  RANKLIST = 'RANKLIST',
  APPLICATION = 'APPLICATION',
  EVENT = 'EVENT'
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
  SMS = 'SMS'
}

export enum NotificationFrequency {
  IMMEDIATE = 'IMMEDIATE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  NEVER = 'NEVER'
}

export interface Notification {
  id: string;
  templateId?: string;
  userId: string;
  title: string;
  content: string;
  contextType: NotificationContextType;
  contextId?: string;
  contextData?: any;
  actorId?: string;
  actorData?: any;
  status: NotificationStatus;
  channels: NotificationChannel[];
  deliveryAttempts: number;
  sentAt?: string;
  readAt?: string;
  clickedAt?: string;
  scheduledFor?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  template?: {
    id: string;
    type: NotificationType;
    language: string;
    title: string;
    content: string;
    channels: NotificationChannel[];
    variables: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  attempts?: {
    id: string;
    channel: NotificationChannel;
    success: boolean;
    error?: string;
    attemptedAt: string;
  }[];
}

export interface NotificationPage {
  items: Notification[];
  total: number;
  hasMore: boolean;
  page: number;
  limit: number;
}

export interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface NotificationFiltersInput {
  status?: NotificationStatus[];
  type?: NotificationType[];
  contextType?: NotificationContextType[];
  channels?: NotificationChannel[];
  isRead?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface UpdateNotificationPreferenceInput {
  type: NotificationType;
  channels: NotificationChannel[];
  enabled: boolean;
  frequency: NotificationFrequency;
}

// GraphQL Queries
const GET_MY_NOTIFICATIONS_QUERY = `
  query GetMyNotifications(
    $pagination: PaginationInput
    $filters: NotificationFiltersInput
  ) {
    getMyNotifications(pagination: $pagination, filters: $filters) {
      items {
        id
        templateId
        userId
        title
        content
        contextType
        contextId
        contextData
        actorId
        actorData
        status
        channels
        deliveryAttempts
        sentAt
        readAt
        clickedAt
        scheduledFor
        expiresAt
        createdAt
        updatedAt
        template {
          id
          type
          language
          title
          content
          channels
          variables
          isActive
          createdAt
          updatedAt
        }
        attempts {
          id
          channel
          success
          error
          attemptedAt
        }
      }
      total
      hasMore
      page
      limit
    }
  }
`;

const GET_UNREAD_NOTIFICATION_COUNT_QUERY = `
  query GetUnreadNotificationCount {
    getUnreadNotificationCount
  }
`;

const GET_MY_NOTIFICATION_PREFERENCES_QUERY = `
  query GetMyNotificationPreferences {
    getMyNotificationPreferences {
      id
      userId
      type
      channels
      enabled
      frequency
      quietHours
    }
  }
`;

// GraphQL Mutations
const MARK_NOTIFICATION_AS_READ_MUTATION = `
  mutation MarkNotificationAsRead($notificationId: ID!) {
    markNotificationAsRead(notificationId: $notificationId)
  }
`;

const MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION = `
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead
  }
`;

const UPDATE_NOTIFICATION_PREFERENCE_MUTATION = `
  mutation UpdateNotificationPreference($input: UpdateNotificationPreferenceInput!) {
    updateNotificationPreference(input: $input)
  }
`;

const DELETE_NOTIFICATION_MUTATION = `
  mutation DeleteNotification($notificationId: ID!) {
    deleteNotification(notificationId: $notificationId)
  }
`;

// Service Functions
export async function getMyNotifications(
  pagination?: PaginationInput,
  filters?: NotificationFiltersInput
): Promise<NotificationPage> {
  try {
    const { data } = await apolloClient.query({
      query: GET_MY_NOTIFICATIONS_QUERY,
      variables: { pagination, filters },
      fetchPolicy: 'cache-first',
    });
    return data.getMyNotifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  try {
    const { data } = await apolloClient.query({
      query: GET_UNREAD_NOTIFICATION_COUNT_QUERY,
      fetchPolicy: 'cache-first',
    });
    return data.getUnreadNotificationCount;
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    throw error;
  }
}

export async function getMyNotificationPreferences() {
  try {
    const { data } = await apolloClient.query({
      query: GET_MY_NOTIFICATION_PREFERENCES_QUERY,
      fetchPolicy: 'cache-first',
    });
    return data.getMyNotificationPreferences;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_NOTIFICATION_AS_READ_MUTATION,
      variables: { notificationId },
    });
    return data.markNotificationAsRead;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION,
    });
    return data.markAllNotificationsAsRead;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}

export async function updateNotificationPreference(
  input: UpdateNotificationPreferenceInput
): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_NOTIFICATION_PREFERENCE_MUTATION,
      variables: { input },
    });
    return data.updateNotificationPreference;
  } catch (error) {
    console.error('Error updating notification preference:', error);
    throw error;
  }
}

export async function deleteNotification(notificationId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_NOTIFICATION_MUTATION,
      variables: { notificationId },
    });
    return data.deleteNotification;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
}
