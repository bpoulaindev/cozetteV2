import React, { ReactElement } from "react";
import { Pressable } from "react-native";
import tw from "twrnc";
import { AppText } from "./appText";
const style = tw.style;

interface SimpleButtonProps {
  buttonClasses?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  contentClasses?: string;
  content: string;
  variant: "text" | "contained" | "outlined";
  color?: "primary" | "light" | "dark";
  buttonPressedClasses?: string;
  contentPressedClasses?: string;
  font?: string;
}

export const SimpleButton = ({
  buttonClasses,
  onPress,
  accessibilityLabel,
  contentClasses,
  content,
  variant,
  color,
  buttonPressedClasses,
  contentPressedClasses,
  font,
}: SimpleButtonProps) => {
  const buttonComputedClasses = (pressed: boolean) => {
    switch (color) {
      case "primary":
        return `${
          variant === "contained" ? "bg-primary-200" : "bg-transparent"
        } 
                    ${variant === "outlined" ? "border-primary-200" : ""}
                    ${
                      pressed
                        ? (variant === "contained"
                            ? buttonPressedClasses ?? "bg-primary-700"
                            : "") ||
                          (variant === "outlined"
                            ? buttonPressedClasses ?? "bg-primary-200"
                            : "")
                        : ""
                    }`;
      case "light":
        return `${variant === "contained" ? "bg-primary-100" : "bg-transparent"}
                ${variant === "outlined" ? "border-primary-100" : ""}
                ${
                  pressed
                    ? (variant === "contained"
                        ? ""
                        : buttonPressedClasses ?? "bg-primary-300") &&
                      (variant === "outlined"
                        ? buttonPressedClasses ?? "bg-primary-100"
                        : "")
                    : ""
                }`;
      case "dark":
        return `${variant === "contained" ? "bg-primary-300" : "bg-transparent"}
                ${variant === "outlined" ? "border-primary-300" : ""} 
                ${
                  pressed
                    ? (variant === "contained"
                        ? ""
                        : buttonPressedClasses ?? "bg-primary-700") &&
                      (variant === "outlined"
                        ? buttonPressedClasses ?? "bg-primary-300"
                        : "")
                    : ""
                }`;
    }
  };
  const buttonInitialClasses = (pressed: boolean) =>
    `flex items-center px-2.5 py-1.5 border border-transparent rounded ${
      variant !== "text" && color ? buttonComputedClasses(pressed) : ""
    }`;
  const contentComputedClasses = (pressed: boolean) => {
    switch (color) {
      case "primary":
        return `${variant === "contained" ? "text-white" : "text-primary-200"}
                ${
                  pressed
                    ? (variant === "text"
                        ? contentPressedClasses ?? "text-primary-700"
                        : "") ||
                      (variant === "outlined"
                        ? contentPressedClasses ?? "text-white"
                        : "")
                    : ""
                }`;
      case "light":
        return `${variant === "contained" ? "text-white" : "text-primary-100"}
                ${
                  pressed
                    ? (variant === "text"
                        ? contentPressedClasses ?? "text-primary-300"
                        : "") ||
                      (variant === "outlined"
                        ? contentPressedClasses ?? "text-white"
                        : "")
                    : ""
                }`;
      case "dark":
        return `${
          variant === "contained" ? "bg-primary-300" : "bg-transparent"
        } 
                ${
                  pressed
                    ? (variant === "text"
                        ? contentPressedClasses ?? "text-primary-700"
                        : "") ||
                      (variant === "outlined"
                        ? contentPressedClasses ?? "text-white"
                        : "")
                    : ""
                }`;
    }
  };
  return (
    <Pressable
      style={({ pressed }) =>
        style(buttonInitialClasses(pressed), buttonClasses)
      }
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      {({ pressed }) => (
        <AppText
          style={tw.style(
            color && contentComputedClasses(pressed),
            contentClasses
          )}
          font={font}
        >
          {content}
        </AppText>
      )}
    </Pressable>
  );
};

interface ComplexButtonProps {
  buttonClasses?: string;
  accessibilityLabel?: string;
  variant: "text" | "contained" | "outlined";
  color?: "primary" | "light" | "dark";
  buttonPressedClasses?: string;
  children: ReactElement;
  onPress?: () => void;
}

export const ComplexButton = ({
  buttonClasses,
  accessibilityLabel,
  variant,
  color,
  buttonPressedClasses,
  children,
  onPress,
}: ComplexButtonProps) => {
  const buttonComputedClasses = (pressed: boolean) => {
    switch (color) {
      case "primary":
        return `${variant === "contained" ? "bg-primary-200" : "bg-transparent"}
                    ${variant === "outlined" ? "border-primary-200" : ""}
                    ${
                      pressed
                        ? (variant === "contained"
                            ? buttonPressedClasses || "bg-primary-700"
                            : "") ||
                          (variant === "outlined"
                            ? buttonPressedClasses || "bg-primary-200"
                            : "")
                        : ""
                    }`;
      case "light":
        return `${variant === "contained" ? "bg-primary-100" : "bg-transparent"}
                ${variant === "outlined" ? "border-primary-100" : ""}
                ${
                  pressed
                    ? (variant === "contained"
                        ? ""
                        : buttonPressedClasses || "bg-primary-300") &&
                      (variant === "outlined"
                        ? buttonPressedClasses || "bg-primary-100"
                        : "")
                    : ""
                }`;
      case "dark":
        return `${variant === "contained" ? "bg-primary-300" : "bg-transparent"}
                ${variant === "outlined" ? "border-primary-300" : ""}
                ${
                  pressed
                    ? (variant === "contained"
                        ? ""
                        : buttonPressedClasses || "bg-primary-700") &&
                      (variant === "outlined"
                        ? buttonPressedClasses || "bg-primary-300"
                        : "")
                    : ""
                }`;
    }
  };
  const buttonInitialClasses = (pressed: boolean) =>
    `flex items-center px-2.5 py-1.5 border border-transparent rounded ${
      variant !== "text" && color ? buttonComputedClasses(pressed) : ""
    }`;
  return (
    <Pressable
      style={({ pressed }) =>
        tw.style(buttonInitialClasses(pressed), buttonClasses)
      }
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    >
      {({ pressed }) => children}
    </Pressable>
  );
};
