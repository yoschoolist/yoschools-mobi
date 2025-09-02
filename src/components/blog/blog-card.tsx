import React from 'react';
import { Image, Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { HeartIcon, MessageCircleIcon, BellIcon } from '@/components/ui/icons';
import type { BlogPost } from '@/api/blog/blog-service';

interface BlogCardProps {
  post: BlogPost;
  onPress?: (post: BlogPost) => void;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onPress,
  onLike,
  onBookmark,
  onShare,
}) => {
  const handlePress = () => {
    onPress?.(post);
  };

  const handleLike = () => {
    onLike?.(post.id);
  };

  const handleBookmark = () => {
    onBookmark?.(post.id);
  };

  const handleShare = () => {
    onShare?.(post.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatReadTime = (minutes: number) => {
    return `${minutes} min read`;
  };

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 overflow-hidden"
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <View className="h-48 w-full">
          <Image
            source={{ uri: post.featuredImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      )}

      <View className="p-4">
        {/* Category and Type */}
        <View className="flex-row items-center space-x-2 mb-2">
          {post.category && (
            <View 
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: post.category.color || '#E5E7EB' }}
            >
              <Text className="text-xs font-medium text-white">
                {post.category.name}
              </Text>
            </View>
          )}
          <View className="px-2 py-1 bg-gray-100 rounded-full">
            <Text className="text-xs font-medium text-gray-600">
              {post.type}
            </Text>
          </View>
          {post.isFeatured && (
            <View className="px-2 py-1 bg-yellow-100 rounded-full">
              <Text className="text-xs font-medium text-yellow-800">
                Featured
              </Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text className="text-lg font-semibold text-gray-900 mb-2" numberOfLines={2}>
          {post.title}
        </Text>

        {/* Excerpt */}
        <Text className="text-sm text-gray-600 mb-3" numberOfLines={3}>
          {post.excerpt}
        </Text>

        {/* Author Info */}
        <View className="flex-row items-center space-x-3 mb-3">
          <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center">
            {post.author.avatar ? (
              <Image
                source={{ uri: post.author.avatar }}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <Text className="text-sm font-medium text-gray-600">
                {post.author.name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-900">
              {post.author.name}
            </Text>
            <Text className="text-xs text-gray-500">
              {post.author.role}
              {post.school && ` • ${post.school.name}`}
            </Text>
          </View>
        </View>

        {/* Meta Info */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center space-x-1">
              <BellIcon size={14} color="#6B7280" />
              <Text className="text-xs text-gray-500">
                {formatReadTime(post.readTime)}
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <BellIcon size={14} color="#6B7280" />
              <Text className="text-xs text-gray-500">
                {post.viewCount.toLocaleString()}
              </Text>
            </View>
            <Text className="text-xs text-gray-500">
              {formatDate(post.publishedAt || post.createdAt)}
            </Text>
          </View>
        </View>

        {/* Tags */}
        {post.tags.length > 0 && (
          <View className="flex-row flex-wrap mb-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <View key={index} className="mr-2 mb-1">
                <Text className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  #{tag}
                </Text>
              </View>
            ))}
            {post.tags.length > 3 && (
              <Text className="text-xs text-gray-500">
                +{post.tags.length - 3} more
              </Text>
            )}
          </View>
        )}

        {/* Actions */}
        <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
          <View className="flex-row items-center space-x-4">
            <Pressable
              onPress={handleLike}
              className="flex-row items-center space-x-1"
            >
              <HeartIcon 
                size={18} 
                color={post.isLiked ? "#EF4444" : "#6B7280"}
              />
              <Text className={`text-sm ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                {post.likeCount}
              </Text>
            </Pressable>

            <View className="flex-row items-center space-x-1">
              <MessageCircleIcon size={18} color="#6B7280" />
              <Text className="text-sm text-gray-500">
                {post.commentCount}
              </Text>
            </View>

            <Pressable
              onPress={handleShare}
              className="flex-row items-center space-x-1"
            >
              <BellIcon size={18} color="#6B7280" />
              <Text className="text-sm text-gray-500">
                {post.shareCount}
              </Text>
            </Pressable>
          </View>

          <Pressable onPress={handleBookmark}>
            <BellIcon 
              size={18} 
              color={post.isBookmarked ? "#3B82F6" : "#6B7280"}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
