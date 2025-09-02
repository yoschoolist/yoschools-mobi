import React from 'react';
import { Pressable, Text, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SearchIcon, BellIcon, MessageCircleIcon, PlusIcon } from './icons';

interface TopBarProps {
  onSearchChange?: (value: string) => void;
  onNotificationPress?: () => void;
  onMessagesPress?: () => void;
  onAddPress?: () => void;
}

export const TopBar = ({
  onSearchChange,
  onNotificationPress,
  onMessagesPress,
  onAddPress,
}: TopBarProps) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200"
      style={{
        paddingTop: Math.max(insets.top, 8), // Reduced from 12 to 8
        minHeight: 56 + Math.max(insets.top, 8), // Reduced from 12 to 8
      }}
    >
      {/* Search Bar */}
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mr-3">
        <SearchIcon color="#6B7280" size={20} />
        <Text className="ml-2 text-gray-500 flex-1">Search ...</Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center space-x-2">
        <Pressable
          onPress={onNotificationPress}
          className="p-2"
          testID="notification-button"
        >
          <BellIcon color="#6B7280" size={24} />
        </Pressable>

        <Pressable
          onPress={onMessagesPress}
          className="p-2"
          testID="messages-button"
        >
          <MessageCircleIcon color="#6B7280" size={24} />
        </Pressable>

        <Pressable
          onPress={onAddPress}
          className="p-2"
          testID="add-button"
        >
          <PlusIcon color="#6B7280" size={24} />
        </Pressable>
      </View>
    </View>
  );
};
