import React from "react";
import { Text, TextProps } from "react-native";

export const AppText = ({
  children,
  style,
  font,
  ...rest
}: React.PropsWithChildren<TextProps & { font?: string }>) => (
  <Text
    style={[{ fontFamily: font ?? "Lato" }, style]}
    adjustsFontSizeToFit
    {...rest}
  >
    {children}
  </Text>
);
