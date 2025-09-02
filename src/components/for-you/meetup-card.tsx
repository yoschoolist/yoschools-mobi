import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface MeetupCardProps {
  id: string;
  title: string;
  platform: string;
  date: {
    month: string;
    day: string;
  };
  categories: string[];
  onPress?: () => void;
}

export const MeetupCard: React.FC<MeetupCardProps> = ({
  title,
  platform,
  date,
  categories,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row gap-4 mb-4"
    >
      {/* Date Card */}
      <View className="bg-primary-800 px-2 py-2 rounded-[5px] items-center w-[50px]">
        <Text className="text-primary-100 font-semibold text-[12px]">
          {date.month}
        </Text>
        <Text className="text-primary-100 font-semibold text-[24px] leading-6">
          {date.day}
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 py-1">
        <Text className="text-gray-800 font-semibold text-[12px] mb-2">
          {title}
        </Text>
        
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-800 text-[10px] font-medium">
            {platform}
          </Text>
        </View>

        {/* Categories */}
        <View className="flex-row flex-wrap gap-1">
          {categories.map((category, index) => (
            <View
              key={index}
              className="bg-primary-100 px-1 py-1 rounded-full"
            >
              <Text className="text-primary-800 text-[6px] font-medium">
                {category}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};
