import React, { memo, useEffect, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DISABLE_COLOR,
  MAIN_COLOR,
  SECONDARY_COLOR,
} from "../../constants/colors";

type TProps = {
  value: boolean;
  onChange: () => void;
  onColor?: string;
  offColor?: string;
  label?: string;
  labelStyle?: any;
};

const Switch: React.FC<TProps> = ({
  value,
  onChange,
  onColor = SECONDARY_COLOR,
  offColor = DISABLE_COLOR,
  label = "",
  labelStyle,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    value && setIsEnabled(value);
  }, [value]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onChange();
  };

  const animatedValue = new Animated.Value(0);

  const moveToggle = animatedValue.interpolate({
    inputRange: [-0.2, 0.9],
    outputRange: [0, 20],
  });

  const color = value ? onColor : offColor;

  animatedValue.setValue(value ? 0 : 1);

  Animated.timing(animatedValue, {
    toValue: value ? 1 : 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity onPress={toggleSwitch} activeOpacity={1}>
        <View style={[styles.toggleContainer, { backgroundColor: color }]}>
          <Animated.View
            style={[styles.toggleWheelStyle, { marginLeft: moveToggle }]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Switch);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleContainer: {
    width: 50,
    height: 30,
    marginLeft: 3,
    borderRadius: 50,
    justifyContent: "center",
  },
  label: {
    marginRight: 2,
  },
  toggleWheelStyle: {
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: 12.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
