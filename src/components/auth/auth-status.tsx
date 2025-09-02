import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthContext, useUser, useIsAuthenticated, useAuthActions, useAuthLoading } from '@/lib';

/**
 * Example component showing how to use auth context throughout the app
 * This component can be used anywhere in the app to display auth status
 */
export function AuthStatus() {
  // Method 1: Use the main auth context hook
  const { isAuthenticated, isLoading, user, signOut } = useAuthContext();
  
  // Method 2: Use convenience hooks (alternative approach)
  const currentUser = useUser();
  const isLoggedIn = useIsAuthenticated();
  const { signOut: signOutAlt } = useAuthActions();

  if (isLoading) {
    return (
      <View className="p-4 bg-blue-50 rounded-lg">
        <Text className="text-blue-600 text-center">🔄 Loading authentication...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View className="p-4 bg-yellow-50 rounded-lg">
        <Text className="text-yellow-600 text-center">🔒 Not authenticated</Text>
        <Text className="text-yellow-500 text-center text-sm mt-1">
          Please log in to access the app
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-green-50 rounded-lg">
      <Text className="text-green-600 text-center font-semibold">
        ✅ Authenticated
      </Text>
      <Text className="text-green-700 text-center mt-1">
        Welcome, {user?.firstName || currentUser?.firstName || 'User'}!
      </Text>
      <Text className="text-green-600 text-center text-sm mt-1">
        Email: {user?.email || currentUser?.email}
      </Text>
      <Text className="text-green-600 text-center text-sm">
        Role: {user?.role || currentUser?.role}
      </Text>
      
      <TouchableOpacity 
        onPress={signOut}
        className="mt-3 bg-red-500 p-2 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * Simple hook-based component for checking auth status
 */
export function AuthCheck() {
  const isAuthenticated = useIsAuthenticated();
  
  return (
    <View className="p-2">
      <Text className={isAuthenticated ? "text-green-600" : "text-red-600"}>
        {isAuthenticated ? "🔓 Authenticated" : "🔒 Not Authenticated"}
      </Text>
    </View>
  );
}

/**
 * Component that shows user info using the useUser hook
 */
export function UserInfo() {
  const user = useUser();
  
  if (!user) {
    return (
      <View className="p-4 bg-gray-50 rounded-lg">
        <Text className="text-gray-600 text-center">No user data available</Text>
      </View>
    );
  }
  
  return (
    <View className="p-4 bg-blue-50 rounded-lg">
      <Text className="text-blue-700 text-center font-semibold">
        User Information
      </Text>
      <Text className="text-blue-600 text-center mt-1">
        Name: {user.firstName} {user.lastName}
      </Text>
      <Text className="text-blue-600 text-center text-sm">
        Email: {user.email}
      </Text>
      <Text className="text-blue-600 text-center text-sm">
        Role: {user.role}
      </Text>
      <Text className="text-blue-600 text-center text-sm">
        ID: {user.id}
      </Text>
    </View>
  );
}

/**
 * Component that shows loading state
 */
export function AuthLoading() {
  const isLoading = useAuthLoading();
  
  if (!isLoading) {
    return null;
  }
  
  return (
    <View className="p-4 bg-blue-50 rounded-lg">
      <Text className="text-blue-600 text-center">🔄 Loading authentication...</Text>
    </View>
  );
}
