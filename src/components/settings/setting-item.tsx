import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-[10px] p-4 shadow-sm w-full"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          {/* Icon */}
          <View className="bg-primary-100 p-2 rounded-full">
            {icon}
          </View>

          {/* Content */}
          <View className="flex-1">
            <Text className="text-primary-800 text-[12px] font-medium">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-gray-800 text-[10px] font-normal mt-1">
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Chevron */}
        {showChevron && (
          <View className="w-6 h-6 items-center justify-center">
            {/* Chevron icon placeholder */}
            <View className="w-3 h-3 border-r border-b border-primary-800 transform rotate-45" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
