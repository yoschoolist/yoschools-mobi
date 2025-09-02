import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import type { RegisterFormProps } from '@/components/register-form';
import { RegisterForm } from '@/components/register-form';
import { FocusAwareStatusBar } from '@/components/ui/focus-aware-status-bar';
import { useRegister } from '@/api/hooks/use-auth';

export default function Register() {
  const router = useRouter();
  const { register, loading, error } = useRegister();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: RegisterFormProps['onSubmit'] = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log('📝 Register attempt:', data);
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log('✅ Registration successful');
      Alert.alert(
        'Registration Successful',
        'Your account has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/login')
          }
        ]
      );
    } catch (err) {
      console.error('❌ Registration failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      Alert.alert('Registration Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'linkedin') => {
    // TODO: Implement social registration functionality
    Alert.alert('Social Registration', `${provider} registration is coming soon!`);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <RegisterForm
        onSubmit={onSubmit}
        isLoading={isSubmitting || loading}
        onBack={handleBack}
        onLogin={handleLogin}
        onSocialLogin={handleSocialLogin}
      />
    </>
  );
}
