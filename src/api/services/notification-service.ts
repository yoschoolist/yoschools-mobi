import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Types
export enum NotificationType {
  LISTING_APPROVED = 'LISTING_APPROVED',
  LISTING_REJECTED = 'LISTING_REJECTED',
  LISTING_FOLLOWED = 'LISTING_FOLLOWED',
  LISTING_LIKED = 'LISTING_LIKED',
  LISTING_COMMENTED = 'LISTING_COMMENTED',
  LISTING_CLAIMED = 'LISTING_CLAIMED',
  USER_FOLLOWED = 'USER_FOLLOWED',
  USER_MENTIONED = 'USER_MENTIONED',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  SECURITY_ALERT = 'SECURITY_ALERT',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  BLOG_POST_PUBLISHED = 'BLOG_POST_PUBLISHED',
  BLOG_COMMENT = 'BLOG_COMMENT',
  JOB_APPLICATION = 'JOB_APPLICATION',
  JOB_INTERVIEW = 'JOB_INTERVIEW',
  EVENT_REMINDER = 'EVENT_REMINDER',
  FEED_UPDATE = 'FEED_UPDATE'
}

export enum NotificationPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED'
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  userId: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  metadata?: {
    [key: string]: any;
  };
  readAt?: string;
  archivedAt?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
}

// Input Types
export interface CreateNotificationInput {
  title: string;
  message: string;
  type: NotificationType;
  priority?: NotificationPriority;
  userId: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  metadata?: {
    [key: string]: any;
  };
}

export interface UpdateNotificationInput {
  title?: string;
  message?: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  status?: NotificationStatus;
  metadata?: {
    [key: string]: any;
  };
}

export interface NotificationFilterInput {
  search?: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  status?: NotificationStatus;
  userId?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  createdAfter?: string;
  createdBefore?: string;
  readAfter?: string;
  readBefore?: string;
}

export interface MarkAsReadInput {
  notificationIds: string[];
}

export interface MarkAsUnreadInput {
  notificationIds: string[];
}

export interface ArchiveNotificationsInput {
  notificationIds: string[];
}

export interface DeleteNotificationsInput {
  notificationIds: string[];
}

// Response Types
export interface NotificationResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NotificationStats {
  totalNotifications: number;
  unreadNotifications: number;
  readNotifications: number;
  archivedNotifications: number;
  deletedNotifications: number;
  notificationsByType: {
    [key in NotificationType]: number;
  };
  notificationsByPriority: {
    [key in NotificationPriority]: number;
  };
  averageNotificationsPerDay: number;
  mostActiveNotificationType: NotificationType;
}

// GraphQL Fragments
const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationFragment on Notification {
    id
    title
    message
    type
    priority
    status
    userId
    relatedEntityId
    relatedEntityType
    metadata
    readAt
    archivedAt
    deletedAt
    createdAt
    updatedAt
    user {
      id
      email
      firstName
      lastName
      profile {
        name
        avatar
      }
    }
  }
`;

// GraphQL Queries
const GET_NOTIFICATIONS_QUERY = gql`
  ${NOTIFICATION_FRAGMENT}
  query GetNotifications($page: Int, $limit: Int, $filter: NotificationFilterInput) {
    getNotifications(page: $page, limit: $limit, filter: $filter) {
      notifications {
        ...NotificationFragment
      }
      total
      unreadCount
      hasNextPage
      hasPreviousPage
      page
      limit
      totalPages
    }
  }
`;

const GET_NOTIFICATION_QUERY = gql`
  ${NOTIFICATION_FRAGMENT}
  query GetNotification($id: String!) {
    getNotification(id: $id) {
      ...NotificationFragment
    }
  }
`;

const GET_USER_NOTIFICATIONS_QUERY = gql`
  ${NOTIFICATION_FRAGMENT}
  query GetUserNotifications($userId: String!, $page: Int, $limit: Int, $filter: NotificationFilterInput) {
    getUserNotifications(userId: $userId, page: $page, limit: $limit, filter: $filter) {
      notifications {
        ...NotificationFragment
      }
      total
      unreadCount
      hasNextPage
      hasPreviousPage
      page
      limit
      totalPages
    }
  }
`;

const GET_UNREAD_NOTIFICATIONS_QUERY = gql`
  ${NOTIFICATION_FRAGMENT}
  query GetUnreadNotifications($userId: String!, $limit: Int) {
    getUnreadNotifications(userId: $userId, limit: $limit) {
      notifications {
        ...NotificationFragment
      }
      total
    }
  }
`;

const GET_NOTIFICATION_STATS_QUERY = gql`
  query GetNotificationStats($userId: String) {
    getNotificationStats(userId: $userId) {
      totalNotifications
      unreadNotifications
      readNotifications
      archivedNotifications
      deletedNotifications
      notificationsByType
      notificationsByPriority
      averageNotificationsPerDay
      mostActiveNotificationType
    }
  }
`;

// GraphQL Mutations
const CREATE_NOTIFICATION_MUTATION = gql`
  ${NOTIFICATION_FRAGMENT}
  mutation CreateNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      ...NotificationFragment
    }
  }
`;

const UPDATE_NOTIFICATION_MUTATION = gql`
  ${NOTIFICATION_FRAGMENT}
  mutation UpdateNotification($id: String!, $input: UpdateNotificationInput!) {
    updateNotification(id: $id, input: $input) {
      ...NotificationFragment
    }
  }
`;

const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DeleteNotification($id: String!) {
    deleteNotification(id: $id) {
      id
      title
      message
    }
  }
`;

const MARK_AS_READ_MUTATION = gql`
  mutation MarkAsRead($input: MarkAsReadInput!) {
    markAsRead(input: $input) {
      success
      message
      updatedCount
    }
  }
`;

const MARK_AS_UNREAD_MUTATION = gql`
  mutation MarkAsUnread($input: MarkAsUnreadInput!) {
    markAsUnread(input: $input) {
      success
      message
      updatedCount
    }
  }
`;

const ARCHIVE_NOTIFICATIONS_MUTATION = gql`
  mutation ArchiveNotifications($input: ArchiveNotificationsInput!) {
    archiveNotifications(input: $input) {
      success
      message
      updatedCount
    }
  }
`;

const DELETE_NOTIFICATIONS_MUTATION = gql`
  mutation DeleteNotifications($input: DeleteNotificationsInput!) {
    deleteNotifications(input: $input) {
      success
      message
      updatedCount
    }
  }
`;

const MARK_ALL_AS_READ_MUTATION = gql`
  mutation MarkAllAsRead($userId: String!) {
    markAllAsRead(userId: $userId) {
      success
      message
      updatedCount
    }
  }
`;

const CLEAR_ALL_NOTIFICATIONS_MUTATION = gql`
  mutation ClearAllNotifications($userId: String!) {
    clearAllNotifications(userId: $userId) {
      success
      message
      deletedCount
    }
  }
`;

// Service Functions
export async function getNotifications(
  page = 1,
  limit = 10,
  filter?: NotificationFilterInput,
  accessToken?: string
): Promise<NotificationResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_NOTIFICATIONS_QUERY,
      variables: { page, limit, filter },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getNotifications) {
      console.warn('No notifications returned from GraphQL query');
      return {
        notifications: [],
        total: 0,
        unreadCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        page,
        limit,
        totalPages: 0
      };
    }

    return data.getNotifications;
  } catch (error) {
    console.error('Error fetching notifications from API:', error);
    return {
      notifications: [],
      total: 0,
      unreadCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function getNotification(id: string, accessToken?: string): Promise<Notification | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_NOTIFICATION_QUERY,
      variables: { id },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getNotification) {
      console.warn('No notification found with ID:', id);
      return undefined;
    }

    return data.getNotification;
  } catch (error) {
    console.error('Error fetching notification from API:', error);
    return undefined;
  }
}

export async function getUserNotifications(
  userId: string,
  page = 1,
  limit = 10,
  filter?: NotificationFilterInput,
  accessToken?: string
): Promise<NotificationResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_USER_NOTIFICATIONS_QUERY,
      variables: { userId, page, limit, filter },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getUserNotifications) {
      console.warn('No user notifications returned from GraphQL query');
      return {
        notifications: [],
        total: 0,
        unreadCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        page,
        limit,
        totalPages: 0
      };
    }

    return data.getUserNotifications;
  } catch (error) {
    console.error('Error fetching user notifications from API:', error);
    return {
      notifications: [],
      total: 0,
      unreadCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function getUnreadNotifications(
  userId: string,
  limit = 10,
  accessToken?: string
): Promise<{ notifications: Notification[]; total: number }> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_UNREAD_NOTIFICATIONS_QUERY,
      variables: { userId, limit },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getUnreadNotifications) {
      console.warn('No unread notifications returned from GraphQL query');
      return { notifications: [], total: 0 };
    }

    return data.getUnreadNotifications;
  } catch (error) {
    console.error('Error fetching unread notifications from API:', error);
    return { notifications: [], total: 0 };
  }
}

export async function getNotificationStats(
  userId?: string,
  accessToken?: string
): Promise<NotificationStats | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_NOTIFICATION_STATS_QUERY,
      variables: { userId },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getNotificationStats) {
      console.warn('No notification stats returned from GraphQL query');
      return undefined;
    }

    return data.getNotificationStats;
  } catch (error) {
    console.error('Error fetching notification stats from API:', error);
    return undefined;
  }
}

export async function createNotification(
  input: CreateNotificationInput,
  accessToken: string
): Promise<Notification> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_NOTIFICATION_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createNotification) {
      throw new Error("Failed to create notification");
    }

    return data.createNotification;
  } catch (error: any) {
    console.error('Error creating notification:', error);
    throw new Error(error.message ?? 'Failed to create notification');
  }
}

export async function updateNotification(
  id: string,
  input: UpdateNotificationInput,
  accessToken: string
): Promise<Notification> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_NOTIFICATION_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateNotification) {
      throw new Error("Failed to update notification");
    }

    return data.updateNotification;
  } catch (error: any) {
    console.error('Error updating notification:', error);
    throw new Error(error.message ?? 'Failed to update notification');
  }
}

export async function deleteNotification(
  id: string,
  accessToken: string
): Promise<{ id: string; title: string; message: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_NOTIFICATION_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteNotification) {
      throw new Error("Failed to delete notification");
    }

    return data.deleteNotification;
  } catch (error: any) {
    console.error('Error deleting notification:', error);
    throw new Error(error.message ?? 'Failed to delete notification');
  }
}

export async function markAsRead(
  input: MarkAsReadInput,
  accessToken: string
): Promise<{ success: boolean; message: string; updatedCount: number }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_AS_READ_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.markAsRead) {
      throw new Error("Failed to mark notifications as read");
    }

    return data.markAsRead;
  } catch (error: any) {
    console.error('Error marking notifications as read:', error);
    throw new Error(error.message ?? 'Failed to mark notifications as read');
  }
}

export async function markAsUnread(
  input: MarkAsUnreadInput,
  accessToken: string
): Promise<{ success: boolean; message: string; updatedCount: number }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_AS_UNREAD_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.markAsUnread) {
      throw new Error("Failed to mark notifications as unread");
    }

    return data.markAsUnread;
  } catch (error: any) {
    console.error('Error marking notifications as unread:', error);
    throw new Error(error.message ?? 'Failed to mark notifications as unread');
  }
}

export async function archiveNotifications(
  input: ArchiveNotificationsInput,
  accessToken: string
): Promise<{ success: boolean; message: string; updatedCount: number }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ARCHIVE_NOTIFICATIONS_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.archiveNotifications) {
      throw new Error("Failed to archive notifications");
    }

    return data.archiveNotifications;
  } catch (error: any) {
    console.error('Error archiving notifications:', error);
    throw new Error(error.message ?? 'Failed to archive notifications');
  }
}

export async function deleteNotifications(
  input: DeleteNotificationsInput,
  accessToken: string
): Promise<{ success: boolean; message: string; updatedCount: number }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_NOTIFICATIONS_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteNotifications) {
      throw new Error("Failed to delete notifications");
    }

    return data.deleteNotifications;
  } catch (error: any) {
    console.error('Error deleting notifications:', error);
    throw new Error(error.message ?? 'Failed to delete notifications');
  }
}

export async function markAllAsRead(
  userId: string,
  accessToken: string
): Promise<{ success: boolean; message: string; updatedCount: number }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_ALL_AS_READ_MUTATION,
      variables: { userId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.markAllAsRead) {
      throw new Error("Failed to mark all notifications as read");
    }

    return data.markAllAsRead;
  } catch (error: any) {
    console.error('Error marking all notifications as read:', error);
    throw new Error(error.message ?? 'Failed to mark all notifications as read');
  }
}

export async function clearAllNotifications(
  userId: string,
  accessToken: string
): Promise<{ success: boolean; message: string; deletedCount: number }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CLEAR_ALL_NOTIFICATIONS_MUTATION,
      variables: { userId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.clearAllNotifications) {
      throw new Error("Failed to clear all notifications");
    }

    return data.clearAllNotifications;
  } catch (error: any) {
    console.error('Error clearing all notifications:', error);
    throw new Error(error.message ?? 'Failed to clear all notifications');
  }
}

// Utility Functions
export const getNotificationTypeLabel = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.LISTING_APPROVED:
      return 'Listing Approved';
    case NotificationType.LISTING_REJECTED:
      return 'Listing Rejected';
    case NotificationType.LISTING_FOLLOWED:
      return 'Listing Followed';
    case NotificationType.LISTING_LIKED:
      return 'Listing Liked';
    case NotificationType.LISTING_COMMENTED:
      return 'Listing Commented';
    case NotificationType.LISTING_CLAIMED:
      return 'Listing Claimed';
    case NotificationType.USER_FOLLOWED:
      return 'User Followed';
    case NotificationType.USER_MENTIONED:
      return 'User Mentioned';
    case NotificationType.SYSTEM_ANNOUNCEMENT:
      return 'System Announcement';
    case NotificationType.SECURITY_ALERT:
      return 'Security Alert';
    case NotificationType.EMAIL_VERIFICATION:
      return 'Email Verification';
    case NotificationType.PASSWORD_RESET:
      return 'Password Reset';
    case NotificationType.PROFILE_UPDATE:
      return 'Profile Update';
    case NotificationType.BLOG_POST_PUBLISHED:
      return 'Blog Post Published';
    case NotificationType.BLOG_COMMENT:
      return 'Blog Comment';
    case NotificationType.JOB_APPLICATION:
      return 'Job Application';
    case NotificationType.JOB_INTERVIEW:
      return 'Job Interview';
    case NotificationType.EVENT_REMINDER:
      return 'Event Reminder';
    case NotificationType.FEED_UPDATE:
      return 'Feed Update';
    default:
      return 'Unknown';
  }
};

export const getNotificationPriorityLabel = (priority: NotificationPriority): string => {
  switch (priority) {
    case NotificationPriority.LOW:
      return 'Low';
    case NotificationPriority.MEDIUM:
      return 'Medium';
    case NotificationPriority.HIGH:
      return 'High';
    case NotificationPriority.URGENT:
      return 'Urgent';
    default:
      return 'Unknown';
  }
};

export const getNotificationStatusLabel = (status: NotificationStatus): string => {
  switch (status) {
    case NotificationStatus.UNREAD:
      return 'Unread';
    case NotificationStatus.READ:
      return 'Read';
    case NotificationStatus.ARCHIVED:
      return 'Archived';
    case NotificationStatus.DELETED:
      return 'Deleted';
    default:
      return 'Unknown';
  }
};

export const getNotificationPriorityColor = (priority: NotificationPriority): string => {
  switch (priority) {
    case NotificationPriority.LOW:
      return 'bg-gray-100 text-gray-800';
    case NotificationPriority.MEDIUM:
      return 'bg-blue-100 text-blue-800';
    case NotificationPriority.HIGH:
      return 'bg-orange-100 text-orange-800';
    case NotificationPriority.URGENT:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getNotificationStatusColor = (status: NotificationStatus): string => {
  switch (status) {
    case NotificationStatus.UNREAD:
      return 'bg-blue-100 text-blue-800';
    case NotificationStatus.READ:
      return 'bg-gray-100 text-gray-800';
    case NotificationStatus.ARCHIVED:
      return 'bg-yellow-100 text-yellow-800';
    case NotificationStatus.DELETED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const isUnread = (notification: Notification): boolean => notification.status === NotificationStatus.UNREAD;
export const isRead = (notification: Notification): boolean => notification.status === NotificationStatus.READ;
export const isArchived = (notification: Notification): boolean => notification.status === NotificationStatus.ARCHIVED;
export const isDeleted = (notification: Notification): boolean => notification.status === NotificationStatus.DELETED;
export const isHighPriority = (notification: Notification): boolean => 
  notification.priority === NotificationPriority.HIGH || notification.priority === NotificationPriority.URGENT;
export const isUrgent = (notification: Notification): boolean => notification.priority === NotificationPriority.URGENT;

export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getNotificationIcon = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.LISTING_APPROVED:
    case NotificationType.LISTING_REJECTED:
    case NotificationType.LISTING_FOLLOWED:
    case NotificationType.LISTING_LIKED:
    case NotificationType.LISTING_COMMENTED:
    case NotificationType.LISTING_CLAIMED:
      return 'BuildingOfficeIcon';
    case NotificationType.USER_FOLLOWED:
    case NotificationType.USER_MENTIONED:
      return 'UserIcon';
    case NotificationType.SYSTEM_ANNOUNCEMENT:
      return 'SpeakerWaveIcon';
    case NotificationType.SECURITY_ALERT:
      return 'ShieldExclamationIcon';
    case NotificationType.EMAIL_VERIFICATION:
    case NotificationType.PASSWORD_RESET:
      return 'EnvelopeIcon';
    case NotificationType.PROFILE_UPDATE:
      return 'UserCircleIcon';
    case NotificationType.BLOG_POST_PUBLISHED:
    case NotificationType.BLOG_COMMENT:
      return 'DocumentTextIcon';
    case NotificationType.JOB_APPLICATION:
    case NotificationType.JOB_INTERVIEW:
      return 'BriefcaseIcon';
    case NotificationType.EVENT_REMINDER:
      return 'CalendarIcon';
    case NotificationType.FEED_UPDATE:
      return 'RssIcon';
    default:
      return 'BellIcon';
  }
};
