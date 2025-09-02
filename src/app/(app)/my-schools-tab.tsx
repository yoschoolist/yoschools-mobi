import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
  ScrollView,
  Text,
  View,
} from '@/components/ui';

export function MySchoolsTab() {
  // Mock data - in real app this would come from API
  const enrolledSchools = [
    {
      id: '1',
      name: 'Stanford University',
      program: 'Computer Science',
      startDate: '2024-01-15',
      progress: 75,
      status: 'Active',
    },
    {
      id: '2',
      name: 'MIT',
      program: 'Data Science',
      startDate: '2024-03-01',
      progress: 45,
      status: 'Active',
    },
  ];

  const followingSchools = [
    {
      id: '3',
      name: 'Harvard University',
      location: 'Cambridge, MA',
      type: 'University',
      averageRating: 4.7,
      reviewCount: 1893,
      isFollowing: true,
      lastUpdate: '2024-01-18',
      imageUrl:
        'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400',
    },
    {
      id: '4',
      name: 'UC Berkeley',
      location: 'Berkeley, CA',
      type: 'University',
      averageRating: 4.6,
      reviewCount: 1567,
      isFollowing: true,
      lastUpdate: '2024-01-22',
      imageUrl:
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
    },
  ];

  const handleToggleFollow = (schoolId: string) => {
    // TODO: Implement follow/unfollow API call
    console.log('Toggle follow for school:', schoolId);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Enrolled Schools Section */}
        <Text className="mb-4 text-xl font-bold text-gray-900">
          Enrolled Schools
        </Text>

        {enrolledSchools.length === 0 ? (
          <View className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
              No Schools Enrolled
            </Text>
            <Text className="text-center text-gray-600">
              You haven't enrolled in any schools yet. Start exploring and find
              your perfect educational match!
            </Text>
          </View>
        ) : (
          <View className="mb-8 space-y-4">
            {enrolledSchools.map((school) => (
              <View
                key={school.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-gray-900">
                    {school.name}
                  </Text>
                  <View className="rounded-full bg-green-100 px-3 py-1">
                    <Text className="text-xs font-medium text-green-800">
                      {school.status}
                    </Text>
                  </View>
                </View>

                <Text className="mb-2 text-sm text-gray-600">
                  {school.program}
                </Text>

                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-sm text-gray-500">
                    Started: {school.startDate}
                  </Text>
                  <Text className="text-sm font-medium text-blue-600">
                    {school.progress}% Complete
                  </Text>
                </View>

                {/* Progress Bar */}
                <View className="h-2 w-full rounded-full bg-gray-200">
                  <View
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${school.progress}%` }}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Following Schools Section */}
        <Text className="mb-4 text-xl font-bold text-gray-900">
          Following Schools
        </Text>

        {followingSchools.length === 0 ? (
          <View className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
              Not Following Any Schools
            </Text>
            <Text className="text-center text-gray-600">
              Start following schools you're interested in to get updates and track
              their progress!
            </Text>
          </View>
        ) : (
          <View className="mb-8 space-y-4">
            {followingSchools.map((school) => (
              <View
                key={school.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-gray-900">
                    {school.name}
                  </Text>
                  <View className="rounded-full bg-blue-100 px-3 py-1">
                    <Text className="text-xs font-medium text-blue-800">
                      Following
                    </Text>
                  </View>
                </View>

                <Text className="mb-2 text-sm text-gray-600">
                  {school.location} • {school.type}
                </Text>

                <View className="mb-3 flex-row items-center justify-between">
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-sm font-medium text-yellow-600">
                      ⭐ {school.averageRating}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      ({school.reviewCount} reviews)
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-500">
                    Updated: {school.lastUpdate}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => handleToggleFollow(school.id)}
                    className="rounded-lg bg-red-500 px-4 py-2"
                  >
                    <Text className="text-sm font-medium text-white">
                      Unfollow
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
