import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface CreatePostProps {
  userAvatar?: string;
  onPress?: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  userAvatar = 'https://via.placeholder.com/32',
  onPress,
}) => {
  return (
    <View className="bg-white rounded-[10px] p-4 shadow-sm mb-4">
      <View className="flex-row items-center gap-3">
        {/* User Avatar */}
        <Image
          source={{ uri: userAvatar }}
          className="w-8 h-8 rounded-full"
        />

        {/* Input Area */}
        <TouchableOpacity
          onPress={onPress}
          className="flex-1 bg-primary-100 rounded-[5px] px-3 py-2"
        >
          <Text className="text-primary-800 text-[10px]">
            Let's share what going...
          </Text>
        </TouchableOpacity>

        {/* Post Button */}
        <TouchableOpacity
          onPress={onPress}
          className="bg-primary-800 px-2 py-2 rounded-[5px]"
        >
          <Text className="text-white text-[10px] font-semibold">
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
