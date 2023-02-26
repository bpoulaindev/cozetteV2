import React, { ReactElement } from 'react';
import { Pressable } from 'react-native';
import tw from 'twrnc';
import { AppText } from './appText';

const { style } = tw;

interface SimpleButtonProps {
  buttonClasses?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  contentClasses?: string;
  content: string;
  variant: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'light' | 'dark';
  buttonPressedClasses?: string;
  contentPressedClasses?: string;
}

export function SimpleButton({
  buttonClasses,
  onPress,
  accessibilityLabel,
  contentClasses,
  content,
  variant,
  color,
  buttonPressedClasses,
  contentPressedClasses
}: SimpleButtonProps) {
  const buttonComputedClasses = (pressed: boolean) => {
    switch (color) {
      case 'primary':
        return `${variant === 'contained' ? 'bg-indigo-500' : 'bg-transparent'} 
                ${variant === 'outlined' ? 'border-indigo-500' : ''}
                ${
                  pressed
                    ? (variant === 'contained' ? (buttonPressedClasses ?? 'bg-indigo-700') : '') ||
                      (variant === 'outlined' ? (buttonPressedClasses ?? 'bg-indigo-500') : '')
                    : ''
                }`;
      case 'light':
        return `${variant === 'contained' ? 'bg-indigo-100' : 'bg-transparent'}
                ${variant === 'outlined' ? 'border-indigo-100' : ''}
                ${
                  pressed
                    ? (variant === 'contained' ? '' : (buttonPressedClasses ?? 'bg-indigo-300')) &&
                      (variant === 'outlined' ? (buttonPressedClasses ?? 'bg-indigo-100') : '')
                    : ''
                }`;
      case 'dark':
        return `${variant === 'contained' ? 'bg-indigo-300' : 'bg-transparent'}
                ${variant === 'outlined' ? 'border-indigo-300' : ''} 
                ${
                  pressed
                    ? (variant === 'contained' ? '' : (buttonPressedClasses ?? 'bg-indigo-700')) &&
                      (variant === 'outlined' ? (buttonPressedClasses ?? 'bg-indigo-300') : '')
                    : ''
                }`;
      default:
        return `${variant === 'contained' ? 'bg-indigo-500' : 'bg-transparent'} 
                ${variant === 'outlined' ? 'border-indigo-500' : ''}
                ${
                  pressed
                    ? (variant === 'contained' ? (buttonPressedClasses ?? 'bg-indigo-700') : '') ||
                      (variant === 'outlined' ? (buttonPressedClasses ?? 'bg-indigo-500') : '')
                    : ''
                }`;
    }
  };
  const buttonInitialClasses = (pressed: boolean) =>
    `flex items-center px-2.5 py-1.5 border border-transparent rounded ${
        (variant !== 'text' && color) ? buttonComputedClasses(pressed) : ''
    }`;
  const contentComputedClasses = (pressed: boolean) => {
    switch (color) {
      case 'primary':
        return `${variant === 'contained' ? 'text-white' : 'text-indigo-500'}
                ${
                  pressed
                    ? (variant === 'text' ? (contentPressedClasses ?? 'text-indigo-700') : '') ||
                      (variant === 'outlined' ? (contentPressedClasses ?? 'text-white') : '')
                    : ''
                }`;
      case 'light':
        return `${variant === 'contained' ? 'text-white' : 'text-indigo-100'}
                ${
                  pressed
                    ? (variant === 'text' ? (contentPressedClasses ?? 'text-indigo-300') : '') ||
                      (variant === 'outlined' ? (contentPressedClasses ?? 'text-white') : '')
                    : ''
                }`;
      case 'dark':
        return `${variant === 'contained' ? 'bg-indigo-300' : 'bg-transparent'} 
                ${
                  pressed
                    ? (variant === 'text' ? (contentPressedClasses ?? 'text-indigo-700') : '') ||
                      (variant === 'outlined' ? (contentPressedClasses ?? 'text-white') : '')
                    : ''
                }`;
    }
  };
  return (
    <Pressable
      style={({ pressed }) => style(buttonInitialClasses(pressed), buttonClasses)}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}>
      {({ pressed }) => (
        <AppText style={style(color ? contentComputedClasses(pressed) : '', contentClasses)}>
          {content}
        </AppText>
      )}
    </Pressable>
  );
}

interface ComplexButtonProps {
  buttonClasses?: string;
  accessibilityLabel?: string;
  variant: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'light' | 'dark';
  buttonPressedClasses?: string;
  children: ReactElement;
  onPress?: () => void;
}

export function ComplexButton({
  buttonClasses,
  accessibilityLabel,
  variant,
  color,
  buttonPressedClasses,
  children,
  onPress
}: ComplexButtonProps) {
  const buttonComputedClasses = (pressed: boolean) => {
    switch (color) {
      case 'primary':
        return `${variant === 'contained' ? 'bg-indigo-500' : 'bg-transparent'}
                    ${variant === 'outlined' ? 'border-indigo-500' : ''}
                    ${
                      pressed
                        ? (variant === 'contained'
                            ? (buttonPressedClasses || 'bg-indigo-700')
                            : '') ||
                          (variant === 'outlined' ? (buttonPressedClasses || 'bg-indigo-500') : '')
                        : ''
                    }`;
      case 'light':
        return `${variant === 'contained' ? 'bg-indigo-100' : 'bg-transparent'}
                ${variant === 'outlined' ? 'border-indigo-100' : ''}
                ${
                  pressed
                    ? (variant === 'contained' ? '' : (buttonPressedClasses || 'bg-indigo-300')) &&
                      (variant === 'outlined' ? (buttonPressedClasses || 'bg-indigo-100') : '')
                    : ''
                }`;
      case 'dark':
        return `${variant === 'contained' ? 'bg-indigo-300' : 'bg-transparent'}
                ${variant === 'outlined' ? 'border-indigo-300' : ''}
                ${
                  pressed
                    ? (variant === 'contained' ? '' : (buttonPressedClasses || 'bg-indigo-700')) &&
                      (variant === 'outlined' ? (buttonPressedClasses || 'bg-indigo-300') : '')
                    : ''
                }`;
    }
  };
  const buttonInitialClasses = (pressed: boolean) =>
    `flex items-center px-2.5 py-1.5 border border-transparent rounded ${
        (variant !== 'text' && color) ? buttonComputedClasses(pressed) : ''
    }`;
  return (
    <Pressable
      style={({ pressed }) => style(buttonInitialClasses(pressed), buttonClasses)}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}>
      {({ pressed }) => children}
    </Pressable>
  );
}
