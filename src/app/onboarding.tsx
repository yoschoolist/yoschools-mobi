import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';

import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';


const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    title: "It's Appsolutely Easy...",
    subtitle:
      'Find the School That Fits You Best. Discover world-class schools that match your future goals.',
  },
  {
    id: 2,
    title: 'Discover, Follow, Rate Schools',
    subtitle:
      'Get personalized recommendations and track your favorites all in one powerful platform.',
  },
  {
    id: 3,
    title: 'Get Notified & Stay Connected',
    subtitle:
      'Create an account with YoSchools for instant access to track all your schools online, in just a few clicks.',
  },
];

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <View className="flex-row items-center justify-center gap-3 mb-10 w-full">
      {Array.from({ length: 2 }).map((_, index) => (
        <View
          key={index}
          className={`h-2.5 rounded-full ${
            index === Math.floor((currentStep / (totalSteps - 1)) * 1) 
              ? 'bg-secondary-500 w-12' 
              : 'bg-white/40 w-2.5'
          }`}
        />
      ))}
    </View>
  );
}

interface ContentCarouselProps {
  onScroll: (event: any) => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
}

function ContentCarousel({ onScroll, scrollViewRef }: ContentCarouselProps) {
  return (
    <View className="w-full h-40 mb-6 items-center">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ 
          width: width * onboardingSteps.length,
          alignItems: 'center'
        }}
        style={{ width: width }}
      >
        {onboardingSteps.map((step, _index) => (
          <View 
            key={step.id} 
            className="items-center justify-center px-8"
            style={{ width: width }}
          >
            <View className="items-center max-w-xs">
              <Text className="text-primary-800 text-2xl font-bold text-center mb-4 leading-tight tracking-tight">
                {step.title}
              </Text>
              <Text className="text-[#4a4a4a] text-lg font-medium text-center leading-7">
                {step.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

interface NextButtonProps {
  currentStep: number;
  onPress: () => void;
}

function NextButton({ currentStep, onPress }: NextButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      disabled={false}
      className="bg-primary-800 px-12 py-4 rounded-2xl w-full items-center flex-row justify-center"
    >
      <Text className="text-white text-xl font-bold mr-3">
        {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
      </Text>
      <Text className="text-white text-2xl font-bold">→</Text>
    </TouchableOpacity>
  );
}

export default function Onboarding() {
  // Use local state instead of the problematic hook for iOS compatibility
  const [isFirstTime, setIsFirstTime] = useState(true);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Simple storage that works on both platforms
  const safeSetIsFirstTime = async (value: boolean) => {
    try {
      // Skip storage for now since AsyncStorage is not installed
      console.log('Storage skipped - AsyncStorage not available');
    } catch (error) {
      console.warn('Storage failed, but continuing with navigation:', error);
    }
  };

  const navigateToRegister = async () => {
    try {
      setIsNavigating(true);
      console.log('Starting navigation to register...');
      
      // Try to store the first time flag (but don't fail if it doesn't work)
      try {
        await safeSetIsFirstTime(false);
      } catch (storageError) {
        console.warn('Storage failed, but continuing with navigation:', storageError);
      }
      
      // Multiple navigation strategies for iOS compatibility
      if (router && typeof router.replace === 'function') {
        try {
          console.log('Attempting router.replace navigation...');
          router.replace('/register');
          return; // Exit if successful
        } catch (routerError) {
          console.warn('Router.replace failed:', routerError);
        }
      }
      
      // Fallback 1: Try router.push
      if (router && typeof router.push === 'function') {
        try {
          console.log('Attempting router.push navigation...');
          router.push('/register');
          return; // Exit if successful
        } catch (pushError) {
          console.warn('Router.push failed:', pushError);
        }
      }
      
      // Fallback 2: Try after a delay
      console.log('Trying delayed navigation...');
      setTimeout(() => {
        try {
          if (router && typeof router.replace === 'function') {
            console.log('Delayed router.replace attempt...');
            router.replace('/register');
          } else if (router && typeof router.push === 'function') {
            console.log('Delayed router.push attempt...');
            router.push('/register');
          }
        } catch (fallbackError) {
          console.error('All navigation attempts failed:', fallbackError);
          setIsNavigating(false);
        }
      }, 200);
      
    } catch (error) {
      console.error('Navigation error:', error);
      setIsNavigating(false);
    }
  };

  const handleNext = async () => {
    if (isNavigating) return;
    
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      console.log('Moving to step:', nextStep, 'from step:', currentStep);
      
      // Set flag to prevent scroll event interference
      setIsProgrammaticScroll(true);
      setCurrentStep(nextStep);
      
      if (scrollViewRef.current) {
        const scrollX = nextStep * width;
        console.log('Scrolling to x position:', scrollX);
        scrollViewRef.current.scrollTo({
          x: scrollX,
          animated: true,
        });
      } else {
        console.warn('ScrollView ref is not available');
      }
      
      // Reset flag after a short delay
      setTimeout(() => setIsProgrammaticScroll(false), 500);
    } else {
      console.log('Last step reached, navigating to register');
      await navigateToRegister();
    }
  };



  const handleScroll = (event: any) => {
    // Don't handle scroll events during programmatic scrolling
    if (isProgrammaticScroll) {
      console.log('Ignoring scroll event during programmatic scroll');
      return;
    }
    
    const contentOffset = event.nativeEvent.contentOffset.x;
    const step = Math.round(contentOffset / width);
    console.log('Scroll event - offset:', contentOffset, 'calculated step:', step);
    if (step >= 0 && step < onboardingSteps.length && step !== currentStep) {
      console.log('Updating step from', currentStep, 'to', step);
      setCurrentStep(step);
    }
  };

  // Handle manual swipe navigation
  useEffect(() => {
    if (scrollViewRef.current) {
      const scrollX = currentStep * width;
      console.log('useEffect scroll - step:', currentStep, 'position:', scrollX);
      scrollViewRef.current.scrollTo({
        x: scrollX,
        animated: true,
      });
    }
  }, [currentStep, width]);

  // Check if navigation is ready
  useEffect(() => {
    if (!router) {
      console.warn('Router not available in onboarding');
    }
  }, [router]);

  return (
    <View className="flex-1 bg-primary-800 relative overflow-hidden">
      <FocusAwareStatusBar />

      {/* Background Depth Layers */}
      <View className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-20 z-0" />
      <View className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/15 opacity-15 z-0" />
      <View className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-10 z-0" />
      
      {/* Subtle Pattern Overlay */}
      <View className="absolute inset-0 opacity-15 z-0" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px, 100px 100px'
      }} />
      
      {/* Floating Elements */}
      <Animated.View className="absolute top-20 left-10 w-16 h-16 bg-white/5 rounded-full z-0" />
      <Animated.View className="absolute top-40 right-20 w-12 h-12 bg-white/3 rounded-lg z-0" />
      <Animated.View className="absolute bottom-40 left-20 w-20 h-20 bg-white/4 rounded-full z-0" />
      <Animated.View className="absolute top-60 left-1/4 w-8 h-8 bg-white/2 rounded-full z-0" />
      <Animated.View className="absolute bottom-20 right-1/3 w-14 h-14 bg-white/3 rounded-lg z-0" />



      {/* Kid Image - Big Background Starting from Top */}
      <View className="flex-1 items-center justify-start pt-2">
        <Image
          source={require('../../assets/kid.png')}
          className="w-96 h-96 opacity-90"
          resizeMode="contain"
        />
      </View>

      {/* Green Background Container - Covers Bottom 2/3 */}
      <View className="absolute bottom-0 left-0 right-0 bg-green-50 rounded-t-[32px] px-8 pt-6 pb-12 h-2/3 justify-center shadow-2xl shadow-black/10">
        {/* Logo at the top of white container */}
        <View className="items-center mb-6">
          <Image
            source={require('../../assets/login-bg.png')}
            className="w-[414px] h-[207px]"
            resizeMode="contain"
          />
        </View>

        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={onboardingSteps.length}
        />

        <ContentCarousel onScroll={handleScroll} scrollViewRef={scrollViewRef} />

        <NextButton currentStep={currentStep} onPress={handleNext} />
      </View>

      <SafeAreaView className="h-5" />
    </View>
  );
}
