import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface SelectTabsProps {
  onTabChange?: (tab: string) => void;
}

export const SelectTabs: React.FC<SelectTabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('New');

  const tabs = [
    { id: 'New', label: 'New' },
    { id: 'Popular', label: 'Popular' },
    { id: 'Following', label: 'Following' },
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <View className="bg-primary-800 rounded-[10px] p-3 flex-row justify-between">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => handleTabPress(tab.id)}
          className={`px-3 py-1 rounded-[5px] ${
            activeTab === tab.id
              ? 'bg-primary-100'
              : 'bg-transparent'
          }`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 3,
          }}
        >
          <Text
            className={`text-[10px] font-semibold ${
              activeTab === tab.id
                ? 'text-primary-800'
                : 'text-primary-100'
            }`}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
