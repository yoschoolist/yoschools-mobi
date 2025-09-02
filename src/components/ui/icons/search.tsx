import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

import type { IconProps } from './types';

export const SearchIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx={11}
      cy={11}
      r={8}
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="m21 21-4.35-4.35"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
