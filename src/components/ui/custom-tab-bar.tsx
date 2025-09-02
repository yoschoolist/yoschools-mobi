import React from 'react';
import { Platform, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Pressable, Text } from 'react-native';
import {
  HeartIcon,
  InspirationIcon,
  MoreIcon,
  SchoolIcon,
  SearchIcon,
} from '@/components/ui/icons';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const getTabIcon = (routeName: string, color: string, size: number) => {
    switch (routeName) {
      case 'discover':
        return <HeartIcon color={color} size={size} />;
      case 'index':
        return <SearchIcon color={color} size={size} />;
      case 'schools':
        return <SchoolIcon color={color} size={size} />;
      case 'inspiration':
        return <InspirationIcon color={color} size={size} />;
      case 'more':
        return <MoreIcon color={color} size={size} />;
      default:
        return null;
    }
  };

  const getTabTitle = (routeName: string) => {
    switch (routeName) {
      case 'discover':
        return 'Feed';
      case 'index':
        return 'Find Schools';
      case 'schools':
        return 'Schools';
      case 'inspiration':
        return 'Inspirations';
      case 'more':
        return 'More';
      default:
        return routeName;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#2546CE', // Primary blue from theme
        paddingBottom: Platform.OS === 'ios' ? Math.max(insets.bottom, 4) : 4,
        paddingTop: 6,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = getTabTitle(route.name);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 4,
            }}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {getTabIcon(route.name, '#ffffff', 28)}
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 8,
                  fontWeight: '400',
                  marginTop: 2,
                  fontFamily: 'Poppins-Regular',
                }}
              >
                {label}
              </Text>
              {/* Active indicator */}
              {isFocused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    width: 72,
                    height: 4,
                    backgroundColor: '#1c1c1c',
                    borderRadius: 8,
                  }}
                />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
