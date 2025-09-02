import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { FocusAwareStatusBar } from '@/components/ui/focus-aware-status-bar';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useLogin } from '@/api/hooks/use-auth';

export default function Login() {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Hide the splash screen when login page loads
    SplashScreen.hideAsync();
  }, []);

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log('🔐 Login attempt:', data);
      await login(data.email, data.password);
      console.log('✅ Login successful');
      router.replace('/(app)');
    } catch (err) {
      console.error('❌ Login failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      Alert.alert('Login Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    Alert.alert('Forgot Password', 'This feature is coming soon!');
  };

  const handleRegister = () => {
    // Navigate to registration page
    router.push('/register');
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'linkedin') => {
    // TODO: Implement social login functionality
    Alert.alert('Social Login', `${provider} login is coming soon!`);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm 
        onSubmit={onSubmit} 
        isLoading={isSubmitting || loading}
        onForgotPassword={handleForgotPassword}
        onRegister={handleRegister}
        onSocialLogin={handleSocialLogin}
      />
    </>
  );
}
