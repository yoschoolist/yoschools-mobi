import React from 'react';
import { View } from 'react-native';

interface PageIndicatorsProps {
  currentIndex: number;
  totalPages: number;
}

export const PageIndicators: React.FC<PageIndicatorsProps> = ({
  currentIndex,
  totalPages,
}) => {
  return (
    <View className="flex-row gap-1 items-center justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          className={`h-2.5 rounded-[20px] ${
            index === currentIndex
              ? 'bg-primary-800 w-[45px]'
              : 'bg-primary-600 w-2.5'
          }`}
        />
      ))}
    </View>
  );
};
