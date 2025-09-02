import React from 'react';
import { Svg, Path } from 'react-native-svg';

import type { IconProps } from './types';

export const InspirationIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 12l2 2 4-4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
