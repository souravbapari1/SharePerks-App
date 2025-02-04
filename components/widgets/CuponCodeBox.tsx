import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SECONDARY_COLOR } from "../../constants/colors";
import {
  getOfferProgress,
  getRemainingTime,
} from "../../helper/date_time/getCurrentFormattedDateTime";
import { CouponData } from "../../interface/coupon";
import { client } from "../../network/action";
import { router } from "expo-router";

function CuponCodeBox({ data }: { data: CouponData }) {
  const progress = getOfferProgress(data.expDate!); // Get the progress as a percentage
  const progressWidth = (progress / 100) * 145; // Calculate width based on the total width of 145

  return (
    <Pressable
      className="border border-gray-100 rounded-2xl p-1 "
      key={"offers" + data._id}
      onPress={() => {
        router.push(`/shareperk/pages/coupons/${data._id}`);
      }}
    >
      <View style={{ flex: 1, height: 130, width: 260 }}>
        <Image
          className="flex-1 rounded-2xl bg-gray-50"
          source={{
            uri: client.baseUrl + "/" + data.bannerImage,
          }}
        />
      </View>
      <View className="flex-row justify-between items-center mt-3 gap-3 px-2 mb-2">
        <View className="flex-1">
          <View className="flex-row justify-between flex-1 items-center">
            <Text className="text-sm font-semibold text-gray-900">
              Time left
            </Text>
            <Text className="text-xs" style={{ color: SECONDARY_COLOR }}>
              {getRemainingTime(data.expDate!)}
            </Text>
          </View>
          <View
            className="flex-row justify-between items-center bg-gray-100 rounded-full overflow-hidden"
            style={{ height: 4, width: 145 }}
          >
            <View
              className="rounded-full"
              style={{
                backgroundColor: SECONDARY_COLOR,
                width: progressWidth, // Use the calculated width
                height: 4,
              }}
            ></View>
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
}

export default CuponCodeBox;
