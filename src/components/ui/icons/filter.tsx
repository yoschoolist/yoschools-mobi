import React from 'react';
import { Path, Svg } from 'react-native-svg';

interface FilterIconProps {
  color?: string;
  size?: number;
}

export const FilterIcon = ({ color = '#000', size = 24 }: FilterIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      fill={color}
    />
  </Svg>
);
