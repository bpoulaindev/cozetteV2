import React, { useMemo } from 'react';
import { ActivitiesType, FoodType, Spot } from '../../../types/spots';
import { Palette } from '../../../lib/palette';
import { Icons } from '../../../assets/svg_components/icons';
interface SpotIconsProps {
  type: 'food' | 'activities';
  color?: 'tertiary' | 'secondary' | 'primary' | 'typedWhite';
  icon: FoodType | ActivitiesType;
  classes?: string;
  fill?: string;
}

export const SpotIcon: React.FC<SpotIconsProps> = ({ color, type, icon, classes = '' }) => {
  // @ts-ignore
  const SvgIcon = Icons[type]?.[icon ?? 'pizza'];
  return (
    <SvgIcon
      classes={`max-w-5 max-h-5 ${classes}`}
      fill={color ? Palette[color][300] : Palette.dark}
    />
  );
};
