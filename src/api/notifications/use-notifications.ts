import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getMyNotifications, 
  getUnreadNotificationCount, 
  getMyNotificationPreferences,
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  updateNotificationPreference, 
  deleteNotification,
  type PaginationInput,
  type NotificationFiltersInput,
  type UpdateNotificationPreferenceInput
} from './notification-service';

// Get user notifications with pagination and filters
export const useNotifications = (
  pagination?: PaginationInput,
  filters?: NotificationFiltersInput
) => {
  return useQuery({
    queryKey: ['notifications', pagination, filters],
    queryFn: () => getMyNotifications(pagination, filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 1,
  });
};

// Get unread notification count
export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['unreadNotificationCount'],
    queryFn: getUnreadNotificationCount,
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
  });
};

// Get notification preferences
export const useNotificationPreferences = () => {
  return useQuery({
    queryKey: ['notificationPreferences'],
    queryFn: getMyNotificationPreferences,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Mark notification as read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      // Invalidate and refetch notifications and unread count
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
};

// Mark all notifications as read
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      // Invalidate and refetch notifications and unread count
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
};

// Update notification preference
export const useUpdateNotificationPreference = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: UpdateNotificationPreferenceInput) => 
      updateNotificationPreference(input),
    onSuccess: () => {
      // Invalidate notification preferences
      queryClient.invalidateQueries({ queryKey: ['notificationPreferences'] });
    },
  });
};

// Delete notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      // Invalidate and refetch notifications and unread count
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
};
