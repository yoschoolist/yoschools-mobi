import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

export const SplashIllustration: React.FC = () => {
  return (
    <View className="items-center justify-center gap-2">
      {/* Illustration placeholder - you can replace with actual illustration */}
      <View className="h-[136px] w-[173px] bg-primary-100 rounded-lg items-center justify-center">
        <View className="w-20 h-20 bg-primary-800 rounded-full" />
      </View>
      
      <Text className="text-primary-100 text-[18px] font-medium">
        Bridge
      </Text>
    </View>
  );
};
