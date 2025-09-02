import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface LogoutButtonProps {
  onPress?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary-100 rounded-[10px] px-14 py-2.5 flex-row items-center justify-center gap-4"
    >
      {/* Logout Icon */}
      <View className="w-6 h-6 items-center justify-center">
        {/* Logout icon placeholder */}
        <View className="w-4 h-4 bg-primary-800 rounded-sm" />
      </View>

      {/* Logout Text */}
      <Text className="text-primary-800 text-[18px] font-semibold capitalize">
        Logout
      </Text>
    </TouchableOpacity>
  );
};
