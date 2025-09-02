import { apolloClient } from '../common/apollo-client';

// Types for messages
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';
  isRead: boolean;
  readAt?: string;
  sentAt: string;
  editedAt?: string;
  deletedAt?: string;
  replyToId?: string;
  attachments?: {
    id: string;
    type: 'IMAGE' | 'FILE';
    url: string;
    name: string;
    size: number;
  }[];
  sender?: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  };
  recipient?: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  };
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  isMuted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessagePage {
  items: Message[];
  total: number;
  hasMore: boolean;
  page: number;
  limit: number;
}

export interface ConversationPage {
  items: Conversation[];
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

export interface MessageFiltersInput {
  conversationId?: string;
  isRead?: boolean;
  messageType?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface ConversationFiltersInput {
  isArchived?: boolean;
  isMuted?: boolean;
  hasUnread?: boolean;
  participantId?: string;
}

export interface SendMessageInput {
  conversationId?: string;
  recipientId: string;
  content: string;
  messageType?: 'TEXT' | 'IMAGE' | 'FILE';
  replyToId?: string;
  attachments?: {
    type: 'IMAGE' | 'FILE';
    url: string;
    name: string;
    size: number;
  }[];
}

// GraphQL Queries
const GET_MY_CONVERSATIONS_QUERY = `
  query GetMyConversations(
    $pagination: PaginationInput
    $filters: ConversationFiltersInput
  ) {
    getMyConversations(pagination: $pagination, filters: $filters) {
      items {
        id
        participants {
          id
          name
          avatar
          isOnline
        }
        lastMessage {
          id
          content
          messageType
          isRead
          sentAt
          sender {
            id
            name
            avatar
          }
        }
        unreadCount
        isArchived
        isMuted
        createdAt
        updatedAt
      }
      total
      hasMore
      page
      limit
    }
  }
`;

const GET_CONVERSATION_MESSAGES_QUERY = `
  query GetConversationMessages(
    $conversationId: ID!
    $pagination: PaginationInput
    $filters: MessageFiltersInput
  ) {
    getConversationMessages(
      conversationId: $conversationId
      pagination: $pagination
      filters: $filters
    ) {
      items {
        id
        conversationId
        senderId
        recipientId
        content
        messageType
        isRead
        readAt
        sentAt
        editedAt
        deletedAt
        replyToId
        attachments {
          id
          type
          url
          name
          size
        }
        sender {
          id
          name
          avatar
          isOnline
        }
        recipient {
          id
          name
          avatar
          isOnline
        }
      }
      total
      hasMore
      page
      limit
    }
  }
`;

const GET_UNREAD_MESSAGE_COUNT_QUERY = `
  query GetUnreadMessageCount {
    getUnreadMessageCount
  }
`;

// GraphQL Mutations
const SEND_MESSAGE_MUTATION = `
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      conversationId
      senderId
      recipientId
      content
      messageType
      isRead
      sentAt
      sender {
        id
        name
        avatar
      }
      recipient {
        id
        name
        avatar
      }
    }
  }
`;

const MARK_MESSAGE_AS_READ_MUTATION = `
  mutation MarkMessageAsRead($messageId: ID!) {
    markMessageAsRead(messageId: $messageId)
  }
`;

const MARK_CONVERSATION_AS_READ_MUTATION = `
  mutation MarkConversationAsRead($conversationId: ID!) {
    markConversationAsRead(conversationId: $conversationId)
  }
`;

const MARK_ALL_MESSAGES_AS_READ_MUTATION = `
  mutation MarkAllMessagesAsRead {
    markAllMessagesAsRead
  }
`;

const DELETE_MESSAGE_MUTATION = `
  mutation DeleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId)
  }
`;

const ARCHIVE_CONVERSATION_MUTATION = `
  mutation ArchiveConversation($conversationId: ID!) {
    archiveConversation(conversationId: $conversationId)
  }
`;

const MUTE_CONVERSATION_MUTATION = `
  mutation MuteConversation($conversationId: ID!) {
    muteConversation(conversationId: $conversationId)
  }
`;

// Service Functions
export async function getMyConversations(
  pagination?: PaginationInput,
  filters?: ConversationFiltersInput
): Promise<ConversationPage> {
  try {
    const { data } = await apolloClient.query({
      query: GET_MY_CONVERSATIONS_QUERY,
      variables: { pagination, filters },
      fetchPolicy: 'cache-first',
    });
    return data.getMyConversations;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
}

export async function getConversationMessages(
  conversationId: string,
  pagination?: PaginationInput,
  filters?: MessageFiltersInput
): Promise<MessagePage> {
  try {
    const { data } = await apolloClient.query({
      query: GET_CONVERSATION_MESSAGES_QUERY,
      variables: { conversationId, pagination, filters },
      fetchPolicy: 'cache-first',
    });
    return data.getConversationMessages;
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    throw error;
  }
}

export async function getUnreadMessageCount(): Promise<number> {
  try {
    const { data } = await apolloClient.query({
      query: GET_UNREAD_MESSAGE_COUNT_QUERY,
      fetchPolicy: 'cache-first',
    });
    return data.getUnreadMessageCount;
  } catch (error) {
    console.error('Error fetching unread message count:', error);
    throw error;
  }
}

export async function sendMessage(input: SendMessageInput): Promise<Message> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: SEND_MESSAGE_MUTATION,
      variables: { input },
    });
    return data.sendMessage;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function markMessageAsRead(messageId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_MESSAGE_AS_READ_MUTATION,
      variables: { messageId },
    });
    return data.markMessageAsRead;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
}

export async function markConversationAsRead(conversationId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_CONVERSATION_AS_READ_MUTATION,
      variables: { conversationId },
    });
    return data.markConversationAsRead;
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    throw error;
  }
}

export async function markAllMessagesAsRead(): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MARK_ALL_MESSAGES_AS_READ_MUTATION,
    });
    return data.markAllMessagesAsRead;
  } catch (error) {
    console.error('Error marking all messages as read:', error);
    throw error;
  }
}

export async function deleteMessage(messageId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_MESSAGE_MUTATION,
      variables: { messageId },
    });
    return data.deleteMessage;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

export async function archiveConversation(conversationId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ARCHIVE_CONVERSATION_MUTATION,
      variables: { conversationId },
    });
    return data.archiveConversation;
  } catch (error) {
    console.error('Error archiving conversation:', error);
    throw error;
  }
}

export async function muteConversation(conversationId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: MUTE_CONVERSATION_MUTATION,
      variables: { conversationId },
    });
    return data.muteConversation;
  } catch (error) {
    console.error('Error muting conversation:', error);
    throw error;
  }
}
