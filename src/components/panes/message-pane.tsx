import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { Text } from '@/components/ui';
import { MessageCircleIcon } from '@/components/ui/icons';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface MessagePaneProps {
  ref: React.RefObject<BottomSheetModal>;
  messages?: Message[];
  onMessagePress?: (message: Message) => void;
  onNewMessage?: () => void;
}

// Sample message data
const sampleMessages: Message[] = [
  {
    id: '1',
    sender: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://via.placeholder.com/40',
    },
    lastMessage: 'Thanks for the school recommendation!',
    timestamp: '2 minutes ago',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    sender: {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://via.placeholder.com/40',
    },
    lastMessage: 'Are you attending the school fair tomorrow?',
    timestamp: '1 hour ago',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: '3',
    sender: {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://via.placeholder.com/40',
    },
    lastMessage: 'The application deadline is next week',
    timestamp: '3 hours ago',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '4',
    sender: {
      id: '4',
      name: 'David Kim',
      avatar: 'https://via.placeholder.com/40',
    },
    lastMessage: 'Great review on Lincoln High School!',
    timestamp: '1 day ago',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '5',
    sender: {
      id: '5',
      name: 'Lisa Wang',
      avatar: 'https://via.placeholder.com/40',
    },
    lastMessage: 'Can you share the scholarship information?',
    timestamp: '2 days ago',
    unreadCount: 0,
    isOnline: true,
  },
];

export const MessagePane = React.forwardRef<BottomSheetModal, MessagePaneProps>(
  (
    {
      messages = sampleMessages,
      onMessagePress,
      onNewMessage,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => ['80%'], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    const renderMessageItem = ({ item }: { item: Message }) => (
      <Pressable
        onPress={() => onMessagePress?.(item)}
        className="p-4 border-b border-gray-100 bg-white"
      >
        <View className="flex-row items-center space-x-3">
          {/* Avatar with online indicator */}
          <View className="relative">
            <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
              {item.sender.avatar ? (
                <Image
                  source={{ uri: item.sender.avatar }}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <MessageCircleIcon color="#6B7280" size={24} />
              )}
            </View>
            {item.isOnline && (
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </View>

          {/* Message Content */}
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-base font-semibold text-gray-900">
                {item.sender.name}
              </Text>
              <Text className="text-xs text-gray-500">
                {item.timestamp}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text 
                className={`text-sm flex-1 mr-2 ${
                  item.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                }`}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
              
              {item.unreadCount > 0 && (
                <View className="bg-blue-500 rounded-full px-2 py-1 min-w-[20px] items-center">
                  <Text className="text-xs font-medium text-white">
                    {item.unreadCount > 99 ? '99+' : item.unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    );

    const totalUnreadCount = messages.reduce((sum, message) => sum + message.unreadCount, 0);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#E5E7EB' }}
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="px-4 py-3 border-b border-gray-200">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <MessageCircleIcon color="#6B7280" size={24} />
                <Text className="text-lg font-semibold text-gray-900">
                  Messages
                </Text>
                {totalUnreadCount > 0 && (
                  <View className="bg-red-500 rounded-full px-2 py-1 min-w-[20px] items-center">
                    <Text className="text-xs font-medium text-white">
                      {totalUnreadCount}
                    </Text>
                  </View>
                )}
              </View>
              
              <Pressable
                onPress={onNewMessage}
                className="px-3 py-1 bg-blue-500 rounded-lg"
              >
                <Text className="text-xs font-medium text-white">
                  New Message
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Messages List */}
          {messages.length > 0 ? (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={renderMessageItem}
              className="flex-1"
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center px-4">
              <MessageCircleIcon color="#D1D5DB" size={48} />
              <Text className="text-lg font-medium text-gray-500 mt-4">
                No messages yet
              </Text>
              <Text className="text-sm text-gray-400 text-center mt-2">
                Start a conversation with other users
              </Text>
            </View>
          )}
        </View>
      </BottomSheetModal>
    );
  }
);

MessagePane.displayName = 'MessagePane';
