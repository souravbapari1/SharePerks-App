import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import { client } from "../../../network/action";
import { router } from "expo-router";

function BrandsView() {
  const state = useAppSelector((e) => e.feedSlice);
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex-row  gap-4 pl-6">
        {state.data?.brands.map((e, i) => {
          return (
            <Pressable
              key={"offers-loading-" + i}
              onPress={() => {
                router.push(`/shareperk/pages/brand/view/${e._id}`);
              }}
            >
              <Image
                src={client.baseUrl + "/" + e.brandImage}
                style={{ flex: 1, height: 50, width: 50 }}
                key={"offers-loading-" + i}
                className="bg-gray-100 rounded-full"
              ></Image>
            </Pressable>
          );
        })}
      </View>
      <View className="w-6"></View>
    </ScrollView>
  );
}

export default BrandsView;
