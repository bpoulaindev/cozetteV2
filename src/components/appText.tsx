import React from 'react';
import { Text, TextProps } from 'react-native';

export const AppText = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps & { font?: string }>) => (
  <Text style={style} adjustsFontSizeToFit {...rest}>
    {children}
  </Text>
);
