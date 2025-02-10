import React, { useState } from "react";
import HeaderAppBar from "../../../../components/ui/HeaderAppBar";
import SortOffers, {
  SelectFilterValue,
} from "../../../../components/ui/SortOffers";
import { useAppSelector } from "../../../../redux/hooks";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { client } from "../../../../network/action";
import { router } from "expo-router";

function TopOffersPage() {
  const state = useAppSelector((e) => e.feedSlice);

  return (
    <HeaderAppBar title="Top Offers">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {state.data?.topOffers.map((e) => {
          return (
            <Pressable
              onPress={() => {
                router.push(`/shareperk/pages/offers/view/${e._id}`);
              }}
              className="h-52 mb-5 "
              key={e._id}
            >
              <Image
                src={client.baseUrl + "/" + e.bannerImage}
                height={100}
                key={"banner-"}
                className="  rounded-3xl w-full h-full object-contain bg-gray-100"
              />
            </Pressable>
          );
        })}
        {state.data?.bannerGiftCards.gifterCards.map((e) => {
          return (
            <Pressable
              onPress={() => {
                router.push(`/shareperk/giftcard/view/gifter/${e._id}`);
              }}
              className="h-52 mb-5 "
              key={e._id}
            >
              <Image
                src={client.baseUrl + "/" + e.GiftCardImage}
                height={100}
                key={"banner-"}
                className="  rounded-3xl w-full h-full object-contain bg-gray-100"
              />
            </Pressable>
          );
        })}
        {state.data?.bannerGiftCards.whoowCards.map((e) => {
          return (
            <Pressable
              onPress={() => {
                router.push(`/shareperk/giftcard/view/whoow/${e._id}`);
              }}
              className="h-52 mb-5 "
              key={e._id}
            >
              <Image
                src={client.baseUrl + "/" + e.GiftCardImage}
                height={100}
                key={"banner-"}
                className="  rounded-3xl w-full h-full object-contain bg-gray-100"
              />
            </Pressable>
          );
        })}
        <View className="h-32" />
      </ScrollView>
    </HeaderAppBar>
  );
}

export default TopOffersPage;
