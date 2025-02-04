import { View, Text, Image, Dimensions, Pressable } from "react-native";
import React from "react";
import { REFER, SHARE_BG } from "../../constants/images";
import { SECONDARY_COLOR } from "../../constants/colors";
import { router } from "expo-router";

const ReferBox = () => {
  const { width } = Dimensions.get("screen");
  return (
    <View
      style={{ flex: 1, height: 160, margin: 15 }}
      className="rounded-3xl overflow-hidden mt-10 relative"
    >
      <Image
        source={SHARE_BG}
        style={{ height: 160, objectFit: "cover", width: width - 30 }}
      />
      <View
        className="absolute bottom-0  overflow-hidden left-0 flex-1 right-0 px-6 py-4  text-white text-center rounded-3xl justify-between flex-row items-center"
        style={{ zIndex: 1, height: 160 }}
      >
        <View className="flex-1 flex-col">
          <Text className="text-xl text-[#4E0960] font-extrabold">
            Share with your friends
          </Text>
          <Text className="text-sm text-[#4E0960] font-extrabold">
            & unlock amazing offers!
          </Text>
          <Pressable
            onPress={() => {
              router.push("/shareperk/pages/refer");
            }}
            className="flex-row w-32 flex justify-center items-center bg-secondary h-10 mt-5 rounded-2xl"
          >
            <Text className="text-white font-bold text-sm">Share Now</Text>
          </Pressable>
        </View>
        <Image
          source={REFER}
          style={{
            height: 160,
            marginTop: 20,
            objectFit: "contain",
            width: 140,
          }}
        />
      </View>
    </View>
  );
};

export default ReferBox;
