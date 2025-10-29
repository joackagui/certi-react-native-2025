import { Animated } from "react-native";

export const FadeView = ({ opacity, translateY, children }) => {
  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY: translateY || 0 }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
