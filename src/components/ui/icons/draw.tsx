import React from 'react';
import { Path, Svg } from 'react-native-svg';

interface DrawIconProps {
  color?: string;
  size?: number;
}

export const DrawIcon = ({ color = '#000', size = 24 }: DrawIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
