import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as z from 'zod';

import { Button, Text, View } from '@/components/ui';

const schema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string({
      required_error: 'Confirm password is required',
    })
    .min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit?: SubmitHandler<RegisterFormType>;
  isLoading?: boolean;
  onBack?: () => void;
  onLogin?: () => void;
  onSocialLogin?: (provider: 'google' | 'facebook' | 'linkedin') => void;
};

// Custom Input Component with Icon and Floating Label
const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  icon,
  error
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  icon: string;
  error?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-0">
      <View className={`relative rounded-lg border-2 p-2 ${
        isFocused 
          ? 'border-primary-600 bg-primary-50' 
          : 'border-primary-300 bg-primary-50'
      }`}>
        {/* Icon */}
        <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Feather 
            name={icon as any} 
            size={20} 
            color={isFocused ? "#2563eb" : "#6B7280"} 
          />
        </View>

        {/* Floating Label */}
        <View className={`absolute left-12 transition-all duration-200 ${
          isFocused || value ? '-top-2 bg-blue-50 px-2' : 'top-2'
        }`}>
          <Text className={`text-sm ${
            isFocused || value ? 'text-primary-600' : 'text-gray-500'
          }`}>
            {label}
          </Text>
        </View>

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ''}
          secureTextEntry={secureTextEntry && !showPassword}
          className="pt-2 pl-12 pr-12 px-4 text-base text-gray-900"
          placeholderTextColor="#6B7280"
        />

        {/* Password Toggle */}
        {secureTextEntry && (
          <TouchableOpacity 
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text className="text-sm text-red-500 mt-1 ml-2">
          {error}
        </Text>
      )}
    </View>
  );
};

export const RegisterForm = ({ 
  onSubmit = () => {}, 
  isLoading = false,
  onBack,
  onLogin,
  onSocialLogin
}: RegisterFormProps) => {
  const { handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormType>({
    resolver: zodResolver(schema),
  });

  const firstNameValue = watch('firstName') || '';
  const lastNameValue = watch('lastName') || '';
  const emailValue = watch('email') || '';
  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start p-2 bg-blue-50">
          {/* Logo Section */}
          <View className="items-center justify-center mb-0">
            <View className="w-48 h-48 items-center justify-center">
              <Image 
                source={require('../../assets/logo.png')}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Background Image */}
          <View className="items-center justify-center mb-3">
            <Image 
              source={require('../../assets/login-bg.png')}
              className="w-80 h-48"
              resizeMode="contain"
            />
          </View>

          <View className="items-center justify-center">
            <Text
              testID="form-title"
              className="pb-3 text-center text-4xl font-bold text-primary-800"
            >
              Create Account
            </Text>

            <Text className="mb-4 max-w-xs text-center text-primary-600">
              Join YoSchools! 🎓 Create your account to discover and rate schools.
            </Text>
          </View>

          {/* First Name and Last Name in same row */}
          <View className="flex-row space-x-3 mb-2">
            <View className="flex-1">
              <CustomInput
                label="First Name"
                value={firstNameValue}
                onChangeText={(text) => setValue('firstName', text)}
                placeholder="First name"
                icon="user"
                error={errors.firstName?.message}
              />
            </View>
            <View className="flex-1 ml-2">
              <CustomInput
                label="Last Name"
                value={lastNameValue}
                onChangeText={(text) => setValue('lastName', text)}
                placeholder="Last name"
                icon="user"
                error={errors.lastName?.message}
              />
            </View>
          </View>

          <View className="mb-2">
            <CustomInput
              label="Email"
              value={emailValue}
              onChangeText={(text) => setValue('email', text.toLowerCase())}
              placeholder="Enter your email"
              icon="mail"
              error={errors.email?.message}
            />
          </View>

          <View className="mb-2">
            <CustomInput
              label="Password"
              value={passwordValue}
              onChangeText={(text) => setValue('password', text)}
              placeholder="Enter your password"
              secureTextEntry={true}
              icon="lock"
              error={errors.password?.message}
            />
          </View>

          <View className="mb-2">
            <CustomInput
              label="Confirm Password"
              value={confirmPasswordValue}
              onChangeText={(text) => setValue('confirmPassword', text)}
              placeholder="Confirm your password"
              secureTextEntry={true}
              icon="lock"
              error={errors.confirmPassword?.message}
            />
          </View>

          <Button
            testID="register-button"
            label={isLoading ? "Creating Account..." : "Create Account"}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="bg-primary-800"
            textClassName="text-white"
          />

          {/* Social Login Section */}
          <View className="py-3">
            <View className="items-center space-y-2">
              <Text className="text-sm text-primary-700 text-center">
                Or Continue With Your Social Media Accounts
              </Text>
              
              <View className="flex-row space-x-4 mt-1">
                <TouchableOpacity
                  onPress={() => onSocialLogin?.('google')}
                  className="w-12 h-12 bg-red-500 rounded-full items-center justify-center"
                  accessibilityLabel="Sign in with Google"
                  accessibilityRole="button"
                >
                  <Feather name="globe" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onSocialLogin?.('facebook')}
                  className="w-12 h-12 bg-blue-600 rounded-full items-center justify-center ml-3"
                  accessibilityLabel="Sign in with Facebook"
                  accessibilityRole="button"
                >
                  <Feather name="facebook" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => onSocialLogin?.('linkedin')}
                  className="w-12 h-12 bg-blue-800 rounded-full items-center justify-center ml-3"
                  accessibilityLabel="Sign in with LinkedIn"
                  accessibilityRole="button"
                >
                  <Feather name="linkedin" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Login Link */}
          <View className="pb-2">
            <View className="flex-row items-center justify-center space-x-1">
              <Text className="text-sm text-primary-700">
                Already Have An Account?
              </Text>
              {onLogin && (
                <TouchableOpacity 
                  onPress={onLogin}
                  className="py-1"
                  accessibilityLabel="Sign in to existing account"
                  accessibilityRole="button"
                >
                  <Text className="text-sm text-primary-800 font-semibold ml-1">
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
