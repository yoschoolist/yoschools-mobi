import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import { NextButton, OnboardingSlide, PageIndicators, SplashIllustration } from '@/components/start';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

const { width } = Dimensions.get('window');

export default function StartScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to "EduAid"',
      description: '"Your Journey to Education Support Begins Here as a Bridge Between Students and Donors"',
    },
    {
      title: 'Transforming Lives Together',
      description: '"Our app bridges the gap between compassionate donors and students striving for excellence."',
    },
    {
      title: 'Empower Your Educational Journey',
      description: '"Discover Scholarships, Connect with a Supportive Community, Access Resources, and Plan Your Financial Future."',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Navigate to login on last slide
      router.replace('/login');
    }
  };

  return (
    <View className="flex-1 bg-primary-800">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        {/* Status Bar */}
        <View className="flex-row items-end justify-between px-5 py-2">
          <Text className="text-gray-900 text-[11px] font-medium">
            9:30
          </Text>
          <View className="w-12 h-2.5 bg-gray-900 rounded" />
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center px-6">
          {/* Splash Illustration */}
          <View className="absolute top-[148px]">
            <SplashIllustration />
          </View>

          {/* Splash Card */}
          <View className="bg-white rounded-[20px] w-full max-w-[360px] h-[375px] pb-10 pt-3 px-6">
            {/* Page Indicators */}
            <View className="items-center mb-9">
              <PageIndicators currentIndex={currentSlide} totalPages={slides.length} />
            </View>

            {/* Content Area */}
            <View className="h-[197px] w-full mb-9">
              {slides.map((slide, index) => (
                <OnboardingSlide
                  key={index}
                  title={slide.title}
                  description={slide.description}
                  isActive={index === currentSlide}
                />
              ))}
            </View>

            {/* Next Button */}
            <NextButton
              onPress={handleNext}
              isLastSlide={currentSlide === slides.length - 1}
            />
          </View>
        </View>

        {/* Bottom Indicator */}
        <View className="items-center pb-2">
          <View className="w-[72px] h-1 bg-gray-900 rounded-lg" />
        </View>
      </SafeAreaView>
    </View>
  );
}