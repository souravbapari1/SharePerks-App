import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StyleProp,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"; // Make sure to install @react-navigation/bottom-tabs if you haven't
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type MyTabBarProps = BottomTabBarProps;
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
// Define the type for the icon functions
type IconProps = {
  color?: string;
  size?: number;
  className?: string;
  style?: StyleProp<any>;
};

// Define the icons object with proper typing
const icons: {
  [key: string]: (props: IconProps) => JSX.Element;
} = {
  index: (e: IconProps) => <Feather name="home" size={24} {...e} />,
  wallet: (e: IconProps) => <Ionicons name="wallet-outline" size={24} {...e} />,
  giftcard: (e: IconProps) => (
    <MaterialIcons name="card-giftcard" size={24} {...e} />
  ),
  user: (e: IconProps) => <Feather name="user" size={24} {...e} />,
  refer: (e: IconProps) => <Feather name="user-plus" size={24} {...e} />,
};

// Define the type for the icon keys
type TIcons = keyof typeof icons;

function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  return (
    <SafeAreaView style={styles.container} className="shadow shadow-gray-300 ">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key} // Add a unique key for each TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <View className="text-orange-600">
              {icons[route.name as TIcons]({
                color: isFocused ? "#F5873B" : "#CCCCCC",
              })}
            </View>
            <Text
              style={{
                color: isFocused ? "#F5873B" : "#CCCCCC",
                fontSize: 10,
                marginTop: 4,

                fontWeight: "400",
              }}
            >
              {`${label}`}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default memo(MyTabBar);
