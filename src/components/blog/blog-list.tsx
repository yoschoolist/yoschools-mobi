import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { BlogCard } from './blog-card';
import { FeaturedBlogPosts } from './featured-blog-posts';
import { EmptyList, Text } from '@/components/ui';
import type { BlogPost } from '@/api/blog/blog-service';

interface BlogListProps {
  posts: BlogPost[];
  featuredPosts?: BlogPost[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onPostPress?: (post: BlogPost) => void;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
  hasMore?: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  featuredPosts,
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  onLoadMore,
  onPostPress,
  onLike,
  onBookmark,
  onShare,
  hasMore = false,
}) => {
  const renderPost = ({ item }: { item: BlogPost }) => (
    <BlogCard
      post={item}
      onPress={onPostPress}
      onLike={onLike}
      onBookmark={onBookmark}
      onShare={onShare}
    />
  );

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center py-12">
      <EmptyList isLoading={isLoading} />
      {!isLoading && (
        <View className="items-center mt-4">
          <Text className="text-lg font-medium text-gray-500 mb-2">
            No blog posts found
          </Text>
          <Text className="text-sm text-gray-400 text-center">
            Check back later for new content
          </Text>
        </View>
      )}
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    
    return (
      <View className="py-4 items-center">
        <Text className="text-sm text-gray-500">
          Loading more posts...
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    if (!featuredPosts || featuredPosts.length === 0) return null;
    
    return (
      <FeaturedBlogPosts
        posts={featuredPosts}
        onPostPress={onPostPress}
        onLike={onLike}
        onBookmark={onBookmark}
        onShare={onShare}
      />
    );
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderPost}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#2546CE']}
            tintColor="#2546CE"
          />
        ) : undefined
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
    />
  );
};
