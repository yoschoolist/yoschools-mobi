import React, { useEffect, useState, useCallback } from 'react';
import { Alert, ScrollView, TouchableOpacity, View, RefreshControl } from 'react-native';

import { LogoutButton, ProfileCard, SettingItem } from '@/components/settings';
import { FocusAwareStatusBar, Text } from '@/components/ui';
import { useAuth, useAuthContext, useUser, useIsAuthenticated } from '@/lib';

import { getToken } from '@/lib/auth/utils';

export default function MoreScreen() {
  const signOut = useAuth.use.signOut();
  const authStatus = useAuth.use.status();
  
  // Example of using the new auth context hooks
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const authUser = useUser();
  const isAuthenticatedAlt = useIsAuthenticated();
  
  console.log('🔐 MoreScreen: Auth context state:', {
    isAuthenticated,
    authLoading,
    hasUser: !!authUser,
    authStatus,
    isAuthenticatedAlt
  });
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'Loading...',
    avatar: 'https://via.placeholder.com/48',
  });
  const [loading, setLoading] = useState(true);

  // Fetch current user data
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);

      
      console.log('🔍 Fetching user data...');
      console.log('🔍 Auth status:', authStatus);
      const token = getToken();
      console.log('🔑 Token retrieved:', token ? 'Token found' : 'No token');
      
      if (token?.access) {
        console.log('✅ Access token found, length:', token.access.length);
        console.log('👤 User data in token:', token.user);
        console.log('🔑 Full token object:', token);
        
        // Use the user data directly from the token instead of making an API call
        console.log('✅ Using user data from token');
        
        const fullName = `${token.user.firstName || ''} ${token.user.lastName || ''}`.trim();
        const displayName = fullName || 'User';
        const displayEmail = token.user.email || 'No email';
        const displayAvatar = 'https://via.placeholder.com/48'; // Avatar not available in token
        
        console.log('📝 Display data from token:', {
          name: displayName,
          email: displayEmail,
          avatar: displayAvatar
        });
        
        setUser({
          name: displayName,
          email: displayEmail,
          avatar: displayAvatar,
        });
      } else {
        console.log('❌ No authentication token found');
        console.log('Token object:', token);

        // If no token, user might need to login again
        console.log('No authentication token found - user may need to login');
        // Set default user data when not authenticated
        setUser({
          name: 'Not Logged In',
          email: 'Please login to view profile',
          avatar: 'https://via.placeholder.com/48',
        });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);

      // Fallback to default data if API fails
      setUser({
        name: 'User',
        email: 'No email available',
        avatar: 'https://via.placeholder.com/48',
      });
    } finally {
      setLoading(false);
    }
  }, [authStatus]);

  useEffect(() => {
    // Only fetch user data if auth store is hydrated and user is signed in
    if (authStatus !== 'idle') {
      console.log('🔄 Auth store ready, fetching user data...');
      fetchUserData();
    } else {
      console.log('⏳ Auth store not ready yet, waiting...');
    }
  }, [authStatus]);

  const onRefresh = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            signOut();
          },
        },
      ],
    );
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    console.log('Edit profile pressed');
  };

  const handleNotificationPreferences = () => {
    // TODO: Navigate to notification preferences
    console.log('Notification preferences pressed');
  };

  const handleSocialMediaAccounts = () => {
    // TODO: Navigate to social media accounts
    console.log('Social media accounts pressed');
  };

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen
    console.log('Change password pressed');
  };

  const handleHelpSupport = () => {
    // TODO: Navigate to help & support
    console.log('Help & support pressed');
  };

  const handleAboutApp = () => {
    // TODO: Navigate to about app
    console.log('About app pressed');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity className="w-6 h-6">
            {/* Back button placeholder */}
            <View className="w-full h-full bg-gray-400 rounded" />
          </TouchableOpacity>
          <Text className="text-gray-800 text-[16px] font-medium">
            Settings
          </Text>
          <TouchableOpacity 
            onPress={fetchUserData} 
            disabled={loading}
            className="w-6 h-6 items-center justify-center"
          >
            <View className="w-4 h-4 bg-gray-400 rounded" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={['#2546CE']}
              tintColor="#2546CE"
            />
          }
        >
          <View className="px-6 gap-7">
            {/* Profile Card */}
            <ProfileCard 
              user={user} 
              onEdit={handleEditProfile} 
              loading={loading}
            />



            {/* Settings Items */}
            <View className="gap-4">
              <SettingItem
                icon={<View className="w-6 h-6 bg-primary-800 rounded" />}
                title="Notification Preferences"
                subtitle="Make changes to notifications"
                onPress={handleNotificationPreferences}
              />

              <SettingItem
                icon={<View className="w-6 h-6 bg-primary-800 rounded" />}
                title="Linked Social Media Accounts"
                subtitle="Add your social Media accounts"
                onPress={handleSocialMediaAccounts}
              />

              <SettingItem
                icon={<View className="w-6 h-6 bg-primary-800 rounded" />}
                title="Change Password"
                subtitle="Change your password if necessary"
                onPress={handleChangePassword}
              />
            </View>

            {/* Additional Settings */}
            <View className="gap-4">
              <SettingItem
                icon={<View className="w-6 h-6 bg-primary-800 rounded" />}
                title="Help & Support"
                onPress={handleHelpSupport}
              />

              <SettingItem
                icon={<View className="w-6 h-6 bg-primary-800 rounded" />}
                title="About App"
                onPress={handleAboutApp}
              />
            </View>

            {/* Logout Button */}
            <LogoutButton onPress={handleLogout} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}