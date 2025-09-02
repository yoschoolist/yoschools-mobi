import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';
import { MySchoolsTab } from './my-schools-tab';
import { MyReviewsTab } from './my-reviews-tab';
import { ProfileTab } from './profile-tab';

type TabType = 'MySchools' | 'MyReviews' | 'Profile';

const tabs = [
  { key: 'MySchools', label: 'My Schools' },
  { key: 'MyReviews', label: 'My Reviews' },
  { key: 'Profile', label: 'Profile' },
] as const;

export default function MoreScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('MySchools');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'MySchools':
        return <MySchoolsTab />;
      case 'MyReviews':
        return <MyReviewsTab />;
      case 'Profile':
        return <ProfileTab />;
      default:
        return <MySchoolsTab />;
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Custom Tab Bar */}
      <View className="flex-row bg-white border-b border-gray-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key as TabType)}
            className={`flex-1 py-3 px-4 ${
              activeTab === tab.key
                ? 'bg-blue-50 border-b-2 border-blue-500'
                : 'border-b-2 border-transparent'
            }`}
            accessibilityLabel={`${tab.label} tab`}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab.key }}
          >
            <Text
              className={`text-center font-semibold text-sm ${
                activeTab === tab.key ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}