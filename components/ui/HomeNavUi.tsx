import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { ReactNode, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  StatusBar,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { MAIN_COLOR } from "../../constants/colors";
import { LOGO_LONG, LOGO_LONG2 } from "../../constants/images";
import { router } from "expo-router";

export default function HomeNavUi({ children }: { children?: ReactNode }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: "clamp",
  });
  const [Search, setSearch] = useState("");
  return (
    <View style={{ backgroundColor: MAIN_COLOR }}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: translateHeader }] },
        ]}
      >
        <Animated.View
          style={[
            { opacity: opacityTitle },
            ,
            { transform: [{ translateY: translateTitle }] },
          ]}
          className="mb-8 mt-5"
        >
          <View
            className=" overflow-hidden"
            style={{ backgroundColor: MAIN_COLOR }}
          >
            <View className="pr-10 mt-14 flex-row justify-between items-center">
              <Image
                source={LOGO_LONG2}
                style={{ width: 130, height: 40, objectFit: "contain" }}
              />
              <Pressable
                onPress={() => {
                  router.push("/shareperk/notification");
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  className="font-bold mt-1"
                  size={24}
                  color="#fff"
                />
              </Pressable>
            </View>
          </View>
        </Animated.View>

        <View className="flex-row fixed top-0 px-4  items-center bg-white gap-4  h-12  mx-5  mb-4 rounded-full shadow-sm overflow-hidden">
          <AntDesign name="search1" size={20} color="#A4A4A4" />
          <TextInput
            autoComplete="off"
            className="flex-1 bg-white h-12"
            placeholder="Search"
            value={Search}
            onChangeText={setSearch}
            onSubmitEditing={(e) => {
              if (Search.trim().length != 0) {
                router.push(`/shareperk/pages/search/${Search}`);
              }
            }}
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
      >
        <View className="bg-white flex-1  rounded-t-3xl">{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 202,
  },
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    alignItems: "stretch",
    justifyContent: "flex-end",
    backgroundColor: MAIN_COLOR,
  },
});
