import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
  ScrollView,
  Text,
  View,
} from '@/components/ui';

export function MyReviewsTab() {
  // Mock data - in real app this would come from API
  const reviews = [
    {
      id: '1',
      schoolName: 'Stanford University',
      rating: 5,
      review: 'Excellent academic environment with world-class faculty. The campus is beautiful and the resources available are outstanding.',
      date: '2024-01-15',
      helpful: 12,
      isVerified: true,
    },
    {
      id: '2',
      schoolName: 'MIT',
      rating: 4,
      review: 'Great for technical education. Very challenging but rewarding. The research opportunities are incredible.',
      date: '2024-01-10',
      helpful: 8,
      isVerified: true,
    },
    {
      id: '3',
      schoolName: 'Harvard University',
      rating: 5,
      review: 'Amazing experience overall. The professors are brilliant and the networking opportunities are unmatched.',
      date: '2024-01-05',
      helpful: 15,
      isVerified: true,
    },
  ];

  const handleEditReview = (reviewId: string) => {
    // TODO: Navigate to edit review screen
    console.log('Edit review:', reviewId);
  };

  const handleDeleteReview = (reviewId: string) => {
    // TODO: Show confirmation dialog and delete review
    console.log('Delete review:', reviewId);
  };

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} className="text-yellow-500">
            {star <= rating ? '★' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="mb-4 text-xl font-bold text-gray-900">
          My Reviews
        </Text>

        {reviews.length === 0 ? (
          <View className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
              No Reviews Yet
            </Text>
            <Text className="text-center text-gray-600">
              Start reviewing schools you've attended or visited to help other students
              make informed decisions!
            </Text>
          </View>
        ) : (
          <View className="mb-8 space-y-4">
            {reviews.map((review) => (
              <View
                key={review.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                {/* Header */}
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-gray-900">
                    {review.schoolName}
                  </Text>
                  {review.isVerified && (
                    <View className="rounded-full bg-green-100 px-2 py-1">
                      <Text className="text-xs font-medium text-green-800">
                        ✓ Verified
                      </Text>
                    </View>
                  )}
                </View>

                {/* Rating */}
                <View className="mb-3 flex-row items-center space-x-2">
                  {renderStars(review.rating)}
                  <Text className="text-sm text-gray-500">
                    {review.rating}/5
                  </Text>
                </View>

                {/* Review Text */}
                <Text className="mb-3 text-gray-700 leading-relaxed">
                  {review.review}
                </Text>

                {/* Footer */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center space-x-4">
                    <Text className="text-sm text-gray-500">
                      {review.date}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {review.helpful} found helpful
                    </Text>
                  </View>
                  
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      onPress={() => handleEditReview(review.id)}
                      className="rounded-lg bg-blue-500 px-3 py-1"
                    >
                      <Text className="text-xs font-medium text-white">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => handleDeleteReview(review.id)}
                      className="rounded-lg bg-red-500 px-3 py-1"
                    >
                      <Text className="text-xs font-medium text-white">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Add Review Button */}
        <TouchableOpacity className="mb-8 rounded-xl bg-blue-500 p-4 shadow-sm">
          <Text className="text-center text-lg font-semibold text-white">
            + Add New Review
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
