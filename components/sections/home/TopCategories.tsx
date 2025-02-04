import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import { router } from "expo-router";
import { navigate } from "../../../utils/navigate";
import { CategoryParams } from "../../../app/shareperk/pages/offers/[category]";

function TopCategories() {
  const state = useAppSelector((e) => e.feedSlice);
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      horizontal
      className="flex-row gap-5 px-6 "
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {state.data?.categories.map((e, i) => {
        return (
          <Pressable
            onPress={() => {
              navigate<CategoryParams>({
                pathname: `/shareperk/pages/offers/${e._id}` as any,
                params: { name: e.name },
              });
            }}
            key={"cat-loading-" + i}
            className="  px-5  justify-center items-center rounded-xl h-10  mr-3  bg-gray-100"
          >
            <Text className="text-gray-600 capitalize">{e.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export default TopCategories;
