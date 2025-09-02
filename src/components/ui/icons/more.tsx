import React from 'react';
import { Svg, Circle } from 'react-native-svg';

import type { IconProps } from './types';

export const MoreIcon = ({ color = '#000', size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={1} fill={color} />
    <Circle cx={19} cy={12} r={1} fill={color} />
    <Circle cx={5} cy={12} r={1} fill={color} />
  </Svg>
);
