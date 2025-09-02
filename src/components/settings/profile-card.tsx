import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: () => void;
  loading?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onEdit,
  loading = false,
}) => {
  return (
    <View className="bg-primary-800 rounded-[10px] p-4 w-full">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-5 flex-1">
          {/* Avatar */}
          <View className="w-12 h-12">
            <Image
              source={{ uri: user.avatar || 'https://via.placeholder.com/48' }}
              className="w-full h-full rounded-full"
            />
          </View>

          {/* User Info */}
          <View className="flex-1">
            <Text className="text-white text-[18px] font-semibold uppercase">
              {loading ? 'Loading...' : user.name}
            </Text>
            <Text className="text-primary-100 text-[12px] font-medium">
              {loading ? 'Loading...' : user.email}
            </Text>
            {loading && (
              <View className="mt-1">
                <View className="h-1 bg-primary-100 rounded-full overflow-hidden">
                  <View className="h-full bg-white animate-pulse" style={{ width: '60%' }} />
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity onPress={onEdit} className="w-6 h-6" disabled={loading}>
          <View className="w-full h-full items-center justify-center">
            {/* Edit icon placeholder - you can replace with actual icon */}
            <View className="w-4 h-4 bg-white rounded-sm" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
