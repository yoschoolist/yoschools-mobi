import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

interface NextButtonProps {
  onPress?: () => void;
  isLastSlide?: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({
  onPress,
  isLastSlide = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary-800 rounded-[100px] px-10 py-2.5 flex-row items-center justify-center gap-2.5 w-full"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Text className="text-white text-[20px] font-semibold">
        {isLastSlide ? 'Get Started' : 'Next'}
      </Text>
      
      {/* Arrow Icon */}
      <View className="w-6 h-6 items-center justify-center">
        <View className="w-4 h-4 border-r-2 border-b-2 border-white transform rotate-45" />
      </View>
    </TouchableOpacity>
  );
};
