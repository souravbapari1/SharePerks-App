import React from "react";
import { Image, Pressable, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useAppSelector } from "../../../redux/hooks";
import { client } from "../../../network/action";
import { router } from "expo-router";

function TopOffersSlide() {
  const state = useAppSelector((e) => e.feedSlice);
  return (
    <View style={{ flex: 1, height: 180 }}>
      <PagerView style={{ flex: 1 }}>
        {state.data?.topOffers.map((e) => {
          return (
            <Pressable
              onPress={() => {
                router.push(`/shareperk/pages/offers/view/${e._id}`);
              }}
              className="flex-1"
              key={e._id}
            >
              <Image
                src={client.baseUrl + "/" + e.bannerImage}
                key={"banner-"}
                className="flex-1 mx-6 rounded-3xl object-contain bg-gray-100"
              />
            </Pressable>
          );
        })}
      </PagerView>
    </View>
  );
}

export default TopOffersSlide;
