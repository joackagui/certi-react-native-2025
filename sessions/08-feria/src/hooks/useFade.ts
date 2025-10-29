import { Animated } from "react-native";
import { FadeOptions } from "../types";
import { useRef } from "react";

export const useFade = (initial: number) => {
  const opacity = useRef(new Animated.Value(initial)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const run = (toValue: number = 1, options: FadeOptions = {}) => {
    return new Promise<void>((resolve) => {
      Animated.timing(opacity, {
        toValue,
        duration: options.duration || 300,
        delay: options.delay || 0,
        easing: options.easing,
        useNativeDriver: true,
      }).start(() => resolve());
    });
  };

  const fadeIn = (options: FadeOptions = {}) => run(options.to ?? 1, options);
  const fadeOut = (options: FadeOptions = {}) => run(options.to ?? 0, options);

  const moveDown = (options: FadeOptions = {}) => {
    Animated.timing(translateY, {
      toValue: options.distance ?? 50,
      duration: options.duration ?? 500,
      useNativeDriver: true,
    }).start();
  };

  const moveUp = (options: FadeOptions = {}) => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: options.duration ?? 500,
      useNativeDriver: true,
    }).start();
  };

  return {
    opacity,
    translateY,
    fadeIn,
    fadeOut,
    moveDown,
    moveUp,
  };
};
