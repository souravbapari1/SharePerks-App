import React from "react";
import {
  RefreshControl,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import HeaderAppBar from "../../../../components/ui/HeaderAppBar";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../../network/action";
import { useAppSelector } from "../../../../redux/hooks";
import { Card, MyCoupons } from "../../../../interface/mycoupon";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SECONDARY_COLOR } from "../../../../constants/colors";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

const index = () => {
  const state = useAppSelector((e) => e.userSlice);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      return await client
        .get("/api/v1/giftcardorder/cards/" + state.user!.user._id)
        .send<MyCoupons>();
    },
  });

  const renderCoupon = ({ item }: { item: Card }) => (
    <View className="bg-secondary/10 p-4 mb-4 rounded-lg ">
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text>Amount: ₹{item.amount}</Text>
      <Text>Code: {item.code || "N/A"}</Text>
      {item.pin && <Text>Pin: {item.pin}</Text>}

      <Text>
        Expiry:{" "}
        {item.provider == "GIFTER"
          ? item.expiredDate
          : new Date(item.expiredDate).toLocaleDateString()}
      </Text>
      <View className="w-full h-10 bg-white rounded-lg mt-5 gap-5 justify-between flex-row px-4 items-center">
        <Text className="line-clamp-1 overflow-hidden w-[60vw]">
          {item.code || "N/A"}
        </Text>
        <TouchableOpacity
          onPress={async () => {
            if (item.code) {
              await Clipboard.setStringAsync(item.code);
              Toast.show({
                text1: "Text Copy To clipboard",
              });
            }
          }}
        >
          <FontAwesome6 name="copy" size={18} color={SECONDARY_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const pendingCount = data?.pending?.length || 0;
  const refundCount = data?.failed?.filter((item) => item.refund).length || 0;

  return (
    <HeaderAppBar title="My Gift Cards" loading={isLoading}>
      <FlatList
        data={data?.cards || []}
        keyExtractor={(item) => item._id}
        renderItem={renderCoupon}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListHeaderComponent={
          pendingCount > 0 || refundCount > 0 ? (
            <View className="bg-white p-6 mb-6 rounded-xl shadow-md border border-gray-200">
              <Text className="text-xl font-bold text-gray-800 mb-2">
                Processing: {pendingCount}
              </Text>
              <Text className="text-xl font-bold text-gray-800">
                Refunded: {refundCount}
              </Text>
            </View>
          ) : (
            <></>
          )
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-4">
            No coupons available.
          </Text>
        }
      />
      <View className="h-24" />
    </HeaderAppBar>
  );
};

export default index;
