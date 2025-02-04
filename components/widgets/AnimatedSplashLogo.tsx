import { View, Image, Dimensions } from "react-native";
import React, { memo, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LOGO_LONG } from "../../constants/images";

const AnimatedSplashLogo = () => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${rotation.value}deg` }],
    };
  });

  const startRotation = () => {
    rotation.value = withTiming(rotation.value + 360 * 2, {
      duration: 1500,
      easing: Easing.ease,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      startRotation();
    }, 500);
  }, []);
  const { width } = Dimensions.get("screen");
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      }}
    >
      {/* <Animated.Image
        source={require("../../assets/money.png")}
        style={[
          {
            width: 50,
            height: 50,
            objectFit: "contain",
          },
          animatedStyle,
        ]}
      /> */}
      <Image
        source={LOGO_LONG}
        style={{
          width: width,
          height: 120,
          objectFit: "contain",
        }}
      />
    </View>
  );
};

export default memo(AnimatedSplashLogo);
