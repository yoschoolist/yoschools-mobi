import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { Text } from '@/components/ui';
import { BellIcon } from '@/components/ui/icons';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  avatar?: string;
}

interface NotificationPaneProps {
  ref: React.RefObject<BottomSheetModal>;
  notifications?: Notification[];
  onNotificationPress?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
}

// Sample notification data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New School Review',
    message: 'Sarah Johnson reviewed Lincoln High School',
    timestamp: '2 minutes ago',
    isRead: false,
    type: 'info',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: '2',
    title: 'Application Update',
    message: 'Your application to Harvard University has been reviewed',
    timestamp: '1 hour ago',
    isRead: false,
    type: 'success',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: '3',
    title: 'Event Reminder',
    message: 'School fair at Central Park starts in 30 minutes',
    timestamp: '3 hours ago',
    isRead: true,
    type: 'warning',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: '4',
    title: 'New Follower',
    message: 'John Smith started following you',
    timestamp: '1 day ago',
    isRead: true,
    type: 'info',
    avatar: 'https://via.placeholder.com/40',
  },
];

export const NotificationPane = React.forwardRef<BottomSheetModal, NotificationPaneProps>(
  (
    {
      notifications = sampleNotifications,
      onNotificationPress,
      onMarkAsRead,
      onMarkAllAsRead,
      onClearAll,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => ['75%'], []);

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

    const getNotificationIcon = (type: Notification['type']) => {
      switch (type) {
        case 'success':
          return '✅';
        case 'warning':
          return '⚠️';
        case 'error':
          return '❌';
        default:
          return 'ℹ️';
      }
    };

    const getNotificationColor = (type: Notification['type']) => {
      switch (type) {
        case 'success':
          return 'text-green-600';
        case 'warning':
          return 'text-yellow-600';
        case 'error':
          return 'text-red-600';
        default:
          return 'text-blue-600';
      }
    };

    const renderNotificationItem = ({ item }: { item: Notification }) => (
      <Pressable
        onPress={() => onNotificationPress?.(item)}
        className={`p-4 border-b border-gray-100 ${
          item.isRead ? 'bg-white' : 'bg-blue-50'
        }`}
      >
        <View className="flex-row items-start space-x-3">
          {/* Avatar */}
          <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
            {item.avatar ? (
              <Image
                source={{ uri: item.avatar }}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <BellIcon color="#6B7280" size={20} />
            )}
          </View>

          {/* Content */}
          <View className="flex-1">
            <View className="flex-row items-center space-x-2 mb-1">
              <Text className="text-sm font-semibold text-gray-900">
                {item.title}
              </Text>
              {!item.isRead && (
                <View className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </View>
            
            <Text className="text-sm text-gray-600 mb-2">
              {item.message}
            </Text>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-gray-500">
                {item.timestamp}
              </Text>
              <Text className={`text-xs ${getNotificationColor(item.type)}`}>
                {getNotificationIcon(item.type)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );

    const unreadCount = notifications.filter(n => !n.isRead).length;

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
                <BellIcon color="#6B7280" size={24} />
                <Text className="text-lg font-semibold text-gray-900">
                  Notifications
                </Text>
                {unreadCount > 0 && (
                  <View className="bg-red-500 rounded-full px-2 py-1 min-w-[20px] items-center">
                    <Text className="text-xs font-medium text-white">
                      {unreadCount}
                    </Text>
                  </View>
                )}
              </View>
              
              <View className="flex-row items-center space-x-2">
                {unreadCount > 0 && (
                  <Pressable
                    onPress={onMarkAllAsRead}
                    className="px-3 py-1 bg-blue-100 rounded-lg"
                  >
                    <Text className="text-xs font-medium text-blue-600">
                      Mark All Read
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={onClearAll}
                  className="px-3 py-1 bg-gray-100 rounded-lg"
                >
                  <Text className="text-xs font-medium text-gray-600">
                    Clear All
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={renderNotificationItem}
              className="flex-1"
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center px-4">
              <BellIcon color="#D1D5DB" size={48} />
              <Text className="text-lg font-medium text-gray-500 mt-4">
                No notifications yet
              </Text>
              <Text className="text-sm text-gray-400 text-center mt-2">
                We'll notify you when something important happens
              </Text>
            </View>
          )}
        </View>
      </BottomSheetModal>
    );
  }
);

NotificationPane.displayName = 'NotificationPane';
