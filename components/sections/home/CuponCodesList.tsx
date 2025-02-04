import React from "react";

import { useAppSelector } from "../../../redux/hooks";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import CuponCodeBox from "../../widgets/CuponCodeBox";

function CouponCodesList() {
  const state = useAppSelector((e) => e.feedSlice);
  return (
    <View>
      <View className="flex-row justify-between items-center mx-6 mt-5 mb-3">
        <Text className="titleHome">Coupon Code offers</Text>
        <Pressable
          onPress={() => {
            router.push("/shareperk/pages/coupons");
          }}
        >
          <Text className="text-gray-600 font-medium">view all</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-row  gap-4 pl-6 mb-10">
          {state.data?.coupons.map((e) => {
            return <CuponCodeBox data={e} key={e._id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default CouponCodesList;
