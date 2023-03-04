import React, { ReactElement } from 'react';
import { Pressable } from 'react-native';

import { AppText } from './appText';
import { Audio } from 'expo-av';
import tw from '../../lib/tailwind';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const waterSound = require('../../assets/WaterDropHomemade.m4a');

const { style } = tw;

interface ButtonProps {
  buttonClasses?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  contentClasses?: string;
  content?: string;
  variant: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'tertiary' | 'gray';
  buttonPressedClasses?: string;
  contentPressedClasses?: string;
  children?: ReactElement;
  disabled?: boolean;
}

export function Button({
  buttonClasses = '',
  onPress,
  accessibilityLabel,
  contentClasses = '',
  content,
  variant = 'contained',
  color = 'primary',
  buttonPressedClasses = '',
  contentPressedClasses = '',
  children,
  disabled = false
}: ButtonProps) {
  const buttonComputedClasses = (pressed: boolean) => {
    const basicClasses = `flex items-center px-2.5 py-1.5 border border-transparent rounded-xl ${buttonClasses}`;
    switch (variant) {
      case 'contained': {
        return `${basicClasses} text-white ${
          pressed ? `bg-${color}-400 ${buttonPressedClasses}` : `bg-${color}-300`
        }`;
      }
      case 'outlined': {
        return `${basicClasses} text-${color}-300 border-${color}-300 ${
          pressed ? `bg-${color}-100 ${buttonPressedClasses}` : `bg-transparent`
        }`;
      }
      case 'text': {
        return `${basicClasses} bg-transparent ${
          pressed ? `text-${color}-400 ${buttonPressedClasses} ` : `text-${color}-300`
        }`;
      }
    }
  };
  const contentComputedClasses = (pressed: boolean) => {
    const basicClasses = `text-center ${contentClasses}`;
    switch (variant) {
      case 'contained':
        return `${basicClasses} text-white ${
          pressed ? `text-${color}-400 ${contentPressedClasses}` : ''
        }`;
      case 'outlined':
        return `${basicClasses} ${
          pressed ? `text-${color}-400 ${contentPressedClasses}` : `text-${color}-300`
        }`;
      case 'text':
        return `${basicClasses} ${
          pressed ? `text-${color}-400 ${contentPressedClasses}` : `text-${color}-300`
        }`;
    }
  };
  const customOnPress = async () => {
    const { sound } = await Audio.Sound.createAsync(waterSound);
    await sound.playAsync();
    onPress && onPress();
  };
  return (
    <Pressable
      style={({ pressed }) => style(buttonComputedClasses(pressed))}
      onPress={customOnPress}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}>
      {({ pressed }) =>
        children ?? <AppText style={style(contentComputedClasses(pressed))}>{content}</AppText>
      }
    </Pressable>
  );
}
