import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { CreatePost, MeetupCard, PostCard, SelectTabs } from '@/components/for-you';
import { Text } from '@/components/ui';

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState('New');

  // Sample data - in real app, this would come from API
  const posts = [
    {
      id: '1',
      author: {
        name: 'ScholarMind123',
        avatar: 'https://via.placeholder.com/24',
      },
      content: "Hey everyone! Just wanted to share a study technique that's been super helpful for me during exam prep. It's all about breaking down complex concepts into manageable chunks...",
      categories: ['Academic Tips', 'Success Stories', 'Student Support'],
      stats: {
        views: 267400,
        likes: 6025,
        comments: 447,
      },
    },
    {
      id: '2',
      author: {
        name: 'CompassionHeart',
        avatar: 'https://via.placeholder.com/24',
      },
      content: "Hello, amazing community! If anyone's looking to support financially challenged students, I've found a fantastic scholarship opportunity. Let's join hands to...",
      categories: ['Financial Support', 'Community', 'Study Groups'],
      stats: {
        views: 449003,
        likes: 9359,
        comments: 185,
      },
    },
    {
      id: '3',
      author: {
        name: 'LanguageLover22',
        avatar: 'https://via.placeholder.com/24',
      },
      content: "Greetings, language learners! I'm offering English-Spanish language exchange sessions. Let's help each other become fluent in both languages. Also, I...",
      categories: ['Language Exchange', 'Learning Resources', 'Networking'],
      stats: {
        views: 558612,
        likes: 7791,
        comments: 429,
      },
    },
    {
      id: '4',
      author: {
        name: 'ArtisticSoul',
        avatar: 'https://via.placeholder.com/24',
      },
      content: "Hello fellow artists and art enthusiasts! I'm organizing a virtual workshop next month on acrylic painting techniques. Let's harness our creativity and create...",
      categories: ['Creative Workshops', 'Skill Sharing', 'Arts Appreciation'],
      stats: {
        views: 653518,
        likes: 5948,
        comments: 647,
      },
    },
  ];

  const meetups = [
    {
      id: '1',
      title: 'EmpowerEd Conversations',
      platform: 'EduAid Bridge • VirtualHub',
      date: { month: 'AUG', day: '01' },
      categories: ['Educational Equity', 'Mentorship Chats'],
    },
    {
      id: '2',
      title: 'GlobalLanguage Exchange',
      platform: 'LinguoConnect • ConnectMeet',
      date: { month: 'AUG', day: '17' },
      categories: ['Cultural Immersions', 'Bilingual Networking'],
    },
    {
      id: '3',
      title: 'ArtisticExpressions Unveiled',
      platform: 'ArtSync • ConnectMeet',
      date: { month: 'AUG', day: '25' },
      categories: ['Creative Workshops', 'Artistic Showcases'],
    },
  ];

  const handleCreatePost = () => {
    // TODO: Navigate to create post screen
    console.log('Create post pressed');
  };

  const handlePostPress = (postId: string) => {
    // TODO: Navigate to post detail
    console.log('Post pressed:', postId);
  };

  const handleMeetupPress = (meetupId: string) => {
    // TODO: Navigate to meetup detail
    console.log('Meetup pressed:', meetupId);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // TODO: Filter posts based on tab
    console.log('Tab changed to:', tab);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Select Tabs at the top */}
      <View className="px-4 pt-4 pb-2">
        <SelectTabs onTabChange={handleTabChange} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Create Post */}
        <View className="px-4 pt-2">
          <CreatePost onPress={handleCreatePost} />
        </View>

        {/* Posts List */}
        <View className="px-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              onPress={() => handlePostPress(post.id)}
            />
          ))}
          
          {/* See More */}
          <View className="items-center py-2">
            <Text className="text-primary-800 text-[10px] font-medium">
              See More
            </Text>
          </View>
        </View>

        {/* Meetups Section */}
        <View className="px-4">
          <View className="bg-white rounded-[10px] p-4 shadow-sm">
            <Text className="text-primary-800 text-[16px] font-medium text-center mb-4">
              Meetups
            </Text>
            
            {meetups.map((meetup) => (
              <MeetupCard
                key={meetup.id}
                {...meetup}
                onPress={() => handleMeetupPress(meetup.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
