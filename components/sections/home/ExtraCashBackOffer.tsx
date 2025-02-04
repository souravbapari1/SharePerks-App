import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import { client } from "../../../network/action";
import { router } from "expo-router";

function ExtraCashBackOffer() {
  const state = useAppSelector((e) => e.feedSlice);
  return (
    <ScrollView
      horizontal
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex-row gap-4 pl-6">
        {state.data?.offers.map((e, i) => {
          return (
            <Pressable
              key={"brand-loading-" + i}
              onPress={() => {
                router.push(`/shareperk/pages/offers/view/${e._id}`);
              }}
            >
              <Image
                src={client.baseUrl + "/" + e.offerImage}
                style={{ flex: 1, height: 110, width: 110 }}
                className="rounded-xl bg-gray-50"
              ></Image>
            </Pressable>
          );
        })}
      </View>

      <View className="w-6"></View>
    </ScrollView>
  );
}

export default ExtraCashBackOffer;
