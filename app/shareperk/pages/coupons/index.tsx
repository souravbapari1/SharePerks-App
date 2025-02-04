import React from "react";
import HeaderAppBar from "../../../../components/ui/HeaderAppBar";
import { useAppSelector } from "../../../../redux/hooks";
import { Image, Pressable, Text, View } from "react-native";
import { client } from "../../../../network/action";
import { SECONDARY_COLOR } from "../../../../constants/colors";
import {
  getOfferProgress,
  getRemainingTime,
} from "../../../../helper/date_time/getCurrentFormattedDateTime";
import { router } from "expo-router";

function CouponsPage() {
  const state = useAppSelector((e) => e.feedSlice);

  return (
    <HeaderAppBar title="Coupon Offers">
      {state.data?.coupons.map((coupon) => {
        const progress = getOfferProgress(coupon.expDate!);
        const progressWidth = (progress / 100) * 225;

        return (
          <Pressable
            onPress={(e) => {
              router.push(`/shareperk/pages/coupons/${coupon._id}`);
            }}
            key={coupon._id}
            className="h-80 w-full p-2 border border-gray-200 rounded-2xl mb-4"
          >
            <Image
              className="h-60 w-full rounded-2xl bg-gray-50"
              source={{
                uri: client.baseUrl + "/" + coupon.bannerImage,
              }}
            />
            <View className="flex-row justify-between items-center mt-4 gap-6 px-2 mb-2">
              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-semibold text-gray-900">
                    Time left
                  </Text>
                  <Text className="text-xs" style={{ color: SECONDARY_COLOR }}>
                    {getRemainingTime(coupon.expDate!)}
                  </Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center bg-gray-100 rounded-full overflow-hidden mt-2">
                    <View
                      className="rounded-full"
                      style={{
                        backgroundColor: SECONDARY_COLOR,
                        width: progressWidth, // Set the width based on progress
                        height: 6,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                className="h-8 rounded-xl flex justify-center items-center"
                style={{ backgroundColor: SECONDARY_COLOR, width: 90 }}
              >
                <Text className="text-xs text-white">View Offer</Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </HeaderAppBar>
  );
}

export default CouponsPage;
