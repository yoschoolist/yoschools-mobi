import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface PostCardProps {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  categories: string[];
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  onPress?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  categories,
  stats,
  onPress,
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-[10px] p-4 shadow-sm mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
      }}
    >
      {/* Author */}
      <View className="flex-row items-center mb-2">
        <Image
          source={{ uri: author.avatar }}
          className="w-6 h-6 rounded-full mr-2"
        />
        <Text className="text-primary-800 font-semibold text-xs">
          {author.name}
        </Text>
      </View>

      {/* Content */}
      <Text className="text-gray-800 text-xs leading-4 mb-2">
        {content}
      </Text>

      {/* Categories */}
      <View className="flex-row flex-wrap gap-2 mb-2">
        {categories.map((category, index) => (
          <View
            key={index}
            className="bg-primary-100 px-2 py-1 rounded-full"
          >
            <Text className="text-primary-800 text-[8px] font-medium">
              {category}
            </Text>
          </View>
        ))}
      </View>

      {/* Stats */}
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Text className="text-gray-500 text-[8px] font-medium">
            {formatNumber(stats.views)} Views
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-500 text-[8px] font-medium">
            {formatNumber(stats.likes)} Likes
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-500 text-[8px] font-medium">
            {formatNumber(stats.comments)} Comments
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
