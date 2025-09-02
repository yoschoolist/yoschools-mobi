import React, { useState } from 'react';
import { View } from 'react-native';

import { InspirationTabs } from '@/components/inspiration';
import { EmptyList, Text } from '@/components/ui';

export default function InspirationScreen() {
  const [activeTab, setActiveTab] = useState('Blog');

  // Temporarily disable React Query hooks
  const blogPostsData = { items: [], hasMore: false };
  const blogPostsLoading = false;
  const featuredPosts = [];
  const featuredLoading = false;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  const handlePostPress = (post: any) => {
    console.log('Post pressed:', post.id);
    // TODO: Navigate to blog post detail
  };

  const handleLike = (postId: string) => {
    console.log('Like post:', postId);
    // TODO: Implement like functionality with Apollo Client
  };

  const handleBookmark = (postId: string) => {
    console.log('Bookmark post:', postId);
    // TODO: Implement bookmark functionality with Apollo Client
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
    // TODO: Implement share functionality with Apollo Client
  };

  const handleRefresh = () => {
    console.log('Refresh blog posts');
    // TODO: Implement refresh functionality with Apollo Client
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Inspiration Tabs at the top */}
      <View className="px-4 pt-4 pb-2">
        <InspirationTabs onTabChange={handleTabChange} />
      </View>

      {/* Content based on active tab */}
      <View className="flex-1">
        {activeTab === 'Blog' && (
          <View className="flex-1 px-4 pt-2">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Blog Posts
            </Text>
            <EmptyList isLoading={false} />
            <Text className="text-center text-gray-500 mt-4">
              Blog functionality will be implemented with Apollo Client
            </Text>
          </View>
        )}
        
        {activeTab === 'Events' && (
          <View className="flex-1 px-4 pt-2">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Events
            </Text>
            <EmptyList isLoading={false} />
          </View>
        )}
        
        {activeTab === 'Jobs' && (
          <View className="flex-1 px-4 pt-2">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Job Opportunities
            </Text>
            <EmptyList isLoading={false} />
          </View>
        )}
      </View>
    </View>
  );
}
