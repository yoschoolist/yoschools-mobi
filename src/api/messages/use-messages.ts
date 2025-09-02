import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getMyConversations, 
  getConversationMessages,
  getUnreadMessageCount,
  sendMessage,
  markMessageAsRead,
  markConversationAsRead,
  markAllMessagesAsRead,
  deleteMessage,
  archiveConversation,
  muteConversation,
  type PaginationInput,
  type MessageFiltersInput,
  type ConversationFiltersInput,
  type SendMessageInput
} from './message-service';

// Get user conversations with pagination and filters
export const useConversations = (
  pagination?: PaginationInput,
  filters?: ConversationFiltersInput
) => {
  return useQuery({
    queryKey: ['conversations', pagination, filters],
    queryFn: () => getMyConversations(pagination, filters),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 1,
  });
};

// Get conversation messages
export const useConversationMessages = (
  conversationId: string,
  pagination?: PaginationInput,
  filters?: MessageFiltersInput
) => {
  return useQuery({
    queryKey: ['conversationMessages', conversationId, pagination, filters],
    queryFn: () => getConversationMessages(conversationId, pagination, filters),
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
    enabled: !!conversationId,
  });
};

// Get unread message count
export const useUnreadMessageCount = () => {
  return useQuery({
    queryKey: ['unreadMessageCount'],
    queryFn: getUnreadMessageCount,
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
  });
};

// Send message
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: SendMessageInput) => sendMessage(input),
    onSuccess: (data) => {
      // Invalidate conversations and messages
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversationMessages', data.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['unreadMessageCount'] });
    },
  });
};

// Mark message as read
export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: () => {
      // Invalidate conversations and unread count
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['unreadMessageCount'] });
    },
  });
};

// Mark conversation as read
export const useMarkConversationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markConversationAsRead,
    onSuccess: () => {
      // Invalidate conversations and unread count
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['unreadMessageCount'] });
    },
  });
};

// Mark all messages as read
export const useMarkAllMessagesAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markAllMessagesAsRead,
    onSuccess: () => {
      // Invalidate conversations and unread count
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['unreadMessageCount'] });
    },
  });
};

// Delete message
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      // Invalidate conversations and messages
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversationMessages'] });
    },
  });
};

// Archive conversation
export const useArchiveConversation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: archiveConversation,
    onSuccess: () => {
      // Invalidate conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

// Mute conversation
export const useMuteConversation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: muteConversation,
    onSuccess: () => {
      // Invalidate conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
