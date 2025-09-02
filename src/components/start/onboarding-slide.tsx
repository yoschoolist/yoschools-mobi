import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

interface OnboardingSlideProps {
  title: string;
  description: string;
  isActive?: boolean;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  isActive = false,
}) => {
  return (
    <View className={`h-[197px] w-[312px] ${isActive ? 'opacity-100' : 'opacity-0 absolute'}`}>
      <View className="flex-col gap-6 items-center justify-start text-center">
        <Text className="text-gray-900 text-[20px] font-semibold leading-5 w-full">
          {title}
        </Text>
        <Text className="text-gray-800 text-[16px] font-medium leading-6 w-full">
          {description}
        </Text>
      </View>
    </View>
  );
};
