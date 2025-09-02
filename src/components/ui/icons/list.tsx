import React from 'react';
import { Path, Svg } from 'react-native-svg';

interface ListIconProps {
  color?: string;
  size?: number;
}

export const ListIcon = ({ color = '#000', size = 24 }: ListIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M3 12h18M3 18h18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
