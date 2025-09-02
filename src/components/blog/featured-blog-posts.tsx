import React from 'react';
import { ScrollView, View } from 'react-native';

import { BlogCard } from './blog-card';
import { Text } from '@/components/ui';
import { BellIcon } from '@/components/ui/icons';
import type { BlogPost } from '@/api/blog/blog-service';

interface FeaturedBlogPostsProps {
  posts: BlogPost[];
  onPostPress?: (post: BlogPost) => void;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export const FeaturedBlogPosts: React.FC<FeaturedBlogPostsProps> = ({
  posts,
  onPostPress,
  onLike,
  onBookmark,
  onShare,
}) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      {/* Header */}
      <View className="flex-row items-center space-x-2 mb-4 px-4">
        <BellIcon size={20} color="#F59E0B" />
        <Text className="text-lg font-semibold text-gray-900">
          Featured Posts
        </Text>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingRight: 32,
        }}
      >
        {posts.map((post, index) => (
          <View
            key={post.id}
            className="mr-4"
            style={{ width: 280 }}
          >
            <BlogCard
              post={post}
              onPress={onPostPress}
              onLike={onLike}
              onBookmark={onBookmark}
              onShare={onShare}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
