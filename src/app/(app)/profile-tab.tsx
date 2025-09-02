import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { ScrollView, Text, View } from '@/components/ui';
import { useAuth } from '@/lib';

export function ProfileTab() {
  const signOut = useAuth.use.signOut();
  const user = useAuth.use.user();
  const isAuthenticated = useAuth.use.status() === 'signIn';

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            console.log('🔄 Signing out...');
            await signOut();
            console.log('✅ Sign out successful');
          } catch (error) {
            console.error('❌ Sign out failed:', error);
          }
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    Alert.alert('Coming Soon', 'Edit profile functionality will be available soon.');
  };

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen
    Alert.alert('Coming Soon', 'Password change functionality will be available soon.');
  };

  const handleNotificationPreferences = () => {
    // TODO: Navigate to notification preferences
    Alert.alert('Coming Soon', 'Notification preferences will be available soon.');
  };

  const handlePrivacySettings = () => {
    // TODO: Navigate to privacy settings
    Alert.alert('Coming Soon', 'Privacy settings will be available soon.');
  };

  const handleHelpSupport = () => {
    // TODO: Navigate to help & support
    Alert.alert('Coming Soon', 'Help & support will be available soon.');
  };

  const handleAboutApp = () => {
    // TODO: Navigate to about app
    Alert.alert('About YoSchools', 'YoSchools Mobile App v1.0.0\n\nFind your perfect school and connect with the educational community.');
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="mb-4 text-xl font-bold text-gray-900">
          Profile & Settings
        </Text>

        {/* Authentication Status */}
        {!isAuthenticated && (
          <View className="mb-4 rounded-lg bg-yellow-50 p-4">
            <Text className="mb-3 text-center text-yellow-800">
              You are not signed in. Please sign in to access all features.
            </Text>
            <View className="items-center">
              <TouchableOpacity className="rounded-lg bg-blue-500 px-6 py-2">
                <Text className="font-semibold text-white">Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* User Profile Section */}
        {isAuthenticated && user && (
          <View className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <Text className="mb-3 text-lg font-semibold text-gray-900">
              Profile Information
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Name</Text>
                <Text className="font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Email</Text>
                <Text className="font-medium text-gray-900">{user.email}</Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Role</Text>
                <Text className="font-medium text-gray-900">{user.role}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleEditProfile}
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2"
            >
              <Text className="text-center font-medium text-white">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Account Management Section */}
        {isAuthenticated && (
          <View className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <Text className="mb-3 text-lg font-semibold text-gray-900">
              Account
            </Text>
            
            <View className="space-y-3">
              <TouchableOpacity
                onPress={handleChangePassword}
                className="flex-row items-center justify-between py-2"
              >
                <Text className="text-gray-700">Change Password</Text>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleNotificationPreferences}
                className="flex-row items-center justify-between py-2"
              >
                <Text className="text-gray-700">Notification Preferences</Text>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handlePrivacySettings}
                className="flex-row items-center justify-between py-2"
              >
                <Text className="text-gray-700">Privacy Settings</Text>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Support Section */}
        <View className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-semibold text-gray-900">
            Support
          </Text>
          
          <View className="space-y-3">
            <TouchableOpacity
              onPress={handleHelpSupport}
              className="flex-row items-center justify-between py-2"
            >
              <Text className="text-gray-700">Help & Support</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleAboutApp}
              className="flex-row items-center justify-between py-2"
            >
              <Text className="text-gray-700">About App</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        {isAuthenticated && (
          <TouchableOpacity
            onPress={handleLogout}
            className="mb-8 rounded-xl bg-red-500 p-4 shadow-sm"
          >
            <Text className="text-center text-lg font-semibold text-white">
              Sign Out
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
