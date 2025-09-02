import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as z from 'zod';

import { Button, Text, View } from '@/components/ui';

const schema = z.object({
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
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading?: boolean;
  onForgotPassword?: () => void;
  onRegister?: () => void;
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
    <View className="mb-4">
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

export const LoginForm = ({ 
  onSubmit = () => {}, 
  isLoading = false,
  onForgotPassword,
  onRegister,
  onSocialLogin
}: LoginFormProps) => {
  const { handleSubmit, formState: { errors }, watch, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  
  const emailValue = watch('email') || '';
  const passwordValue = watch('password') || '';
  
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
          <View className="items-center justify-center mb-2">
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
              Sign In
            </Text>

            <Text className="mb-6 max-w-xs text-center text-primary-600">
              Welcome back! 👋 Please sign in with your credentials to access your
              account.
            </Text>
          </View>

          <CustomInput
            label="Email"
            value={emailValue}
            onChangeText={(text) => setValue('email', text.toLowerCase())}
            placeholder="Enter your email"
            icon="mail"
            error={errors.email?.message}
          />
          <CustomInput
            label="Password"
            value={passwordValue}
            onChangeText={(text) => setValue('password', text)}
            placeholder="Enter your password"
            secureTextEntry={true}
            icon="lock"
            error={errors.password?.message}
          />
          <Button
            testID="login-button"
            label={isLoading ? "Signing In..." : "Login"}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="bg-primary-800"
            textClassName="text-white"
          />

          {/* Remember Me and Forgot Password */}
          <View className="flex-row items-center justify-between mt-2">
            <TouchableOpacity 
              className="flex-row items-center space-x-2 py-2"
              accessibilityLabel="Remember me checkbox"
              accessibilityRole="checkbox"
            >
              <View className="w-5 h-5 border-2 border-primary-600 bg-primary-50 rounded" />
              <Text className="text-sm text-primary-800 ml-2">Remember Me</Text>
            </TouchableOpacity>
            
            {onForgotPassword && (
              <TouchableOpacity 
                onPress={onForgotPassword}
                className="py-2"
                accessibilityLabel="Forgot password link"
                accessibilityRole="button"
              >
                <Text className="text-sm text-primary-600 font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            )}
          </View>

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

          {/* Registration Link */}
          <View className="pb-2">
            <View className="flex-row items-center justify-center space-x-1">
              <Text className="text-sm text-primary-700">
                Don't Have An Account?
              </Text>
              {onRegister && (
                <TouchableOpacity 
                  onPress={onRegister}
                  className="py-1"
                  accessibilityLabel="Register new account"
                  accessibilityRole="button"
                >
                  <Text className="text-sm text-primary-800 font-semibold ml-1">
                    Register
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
