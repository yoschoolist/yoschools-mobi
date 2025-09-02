import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';

import { MessagePane, NotificationPane } from '@/components/panes';
import { CustomTabBar, TopBar, View } from '@/components/ui';
import { useAuth, useIsFirstTime } from '@/lib';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  // Refs for bottom sheet modals
  const notificationModalRef = useRef<BottomSheetModal>(null);
  const messageModalRef = useRef<BottomSheetModal>(null);

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  const handlers = {
    searchChange: (value: string) => {
      // TODO: Implement global search functionality
      console.log('Search:', value);
    },
    notificationPress: () => {
      notificationModalRef.current?.present();
    },
    messagesPress: () => {
      messageModalRef.current?.present();
    },
    addPress: () => {
      // TODO: Navigate to add school form
      console.log('Add pressed');
    },
  };

  const handleNotificationPress = (notification: any) => {
    console.log('Notification pressed:', notification);
    // TODO: Handle notification press (navigate to relevant screen)
  };

  const handleMarkAsRead = (notificationId: string) => {
    console.log('Mark as read:', notificationId);
    // TODO: Implement mark as read functionality
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
    // TODO: Implement mark all as read functionality
  };

  const handleClearAll = () => {
    console.log('Clear all notifications');
    // TODO: Implement clear all functionality
  };

  const handleMessagePress = (message: any) => {
    console.log('Message pressed:', message);
    // TODO: Navigate to conversation screen
  };

  const handleNewMessage = () => {
    console.log('New message');
    // TODO: Navigate to new message screen
  };

  return (
    <View className="flex-1 bg-white">
      <TopBar
        onSearchChange={handlers.searchChange}
        onNotificationPress={handlers.notificationPress}
        onMessagesPress={handlers.messagesPress}
        onAddPress={handlers.addPress}
      />
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#111827',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Find Schools',
            tabBarButtonTestID: 'feed-tab',
            headerShown: false, // Hide header to reduce spacing
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Feed',
            headerShown: false,
            tabBarButtonTestID: 'discover-tab',
          }}
        />
        <Tabs.Screen
          name="schools"
          options={{
            title: 'Schools',
            headerShown: false,
            tabBarButtonTestID: 'schools-tab',
          }}
        />
        <Tabs.Screen
          name="inspiration"
          options={{
            title: 'Inspirations',
            headerShown: false,
            tabBarButtonTestID: 'inspiration-tab',
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            headerShown: false,
            tabBarButtonTestID: 'more-tab',
          }}
        />
      </Tabs>

      {/* Notification Pane */}
      <NotificationPane
        ref={notificationModalRef}
        onNotificationPress={handleNotificationPress}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />

      {/* Message Pane */}
      <MessagePane
        ref={messageModalRef}
        onMessagePress={handleMessagePress}
        onNewMessage={handleNewMessage}
      />
    </View>
  );
}
