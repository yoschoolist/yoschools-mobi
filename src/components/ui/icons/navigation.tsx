import React from 'react';
import { Path, Svg } from 'react-native-svg';

interface NavigationIconProps {
  color?: string;
  size?: number;
}

export const NavigationIcon = ({ color = '#000', size = 24 }: NavigationIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11l19-9-9 19-2-8-8-2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
