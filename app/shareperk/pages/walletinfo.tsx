import { View, Text, SafeAreaView } from "react-native";
import React, { memo } from "react";

import Entypo from "@expo/vector-icons/Entypo";

import { router } from "expo-router";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import { SECONDARY_COLOR } from "../../../constants/colors";
import InfoList from "../../../components/widgets/InfoList";
import { useAppSelector } from "../../../redux/hooks";
const WalletIndex = () => {
  const { user } = useAppSelector((e) => e.userSlice);

  return (
    <HeaderAppBar title="Total Earnings">
      <View className=" border border-orange-200 rounded-3xl px-7 py-5 ">
        {/* Total Gift card Earnings */}
        <View className="h-20 rounded-xl justify-between flex-row items-center ">
          <View>
            <Text className="text-gray-800 text-xs">Wallet Balance</Text>
            <Text className="text-2xl font-normal">
              ₹ {user?.earnings.wallet.toFixed(1)}
            </Text>
          </View>
          <View
            className="h-14 w-14 flex justify-center items-center bg-orange-300/30"
            style={{ borderRadius: 100 }}
          >
            <Entypo
              name="wallet"
              size={24}
              style={{ color: SECONDARY_COLOR }}
            />
          </View>
        </View>
        <View className="border border-gray-100" />
        {/* Total Gift Card Earnings */}
        <View className="h-20 rounded-xl  justify-between flex-row items-center ">
          <View>
            <Text className="text-2xl font-normal">
              ₹ {user?.earnings.totalPayouts.toFixed(1)}
            </Text>
            <Text className=" text-orange-500 text-xs">
              Total Payout Amount
            </Text>
          </View>
        </View>
        <View className="border border-gray-100" />
        {/* Total Purchase Earnings */}
        <View className="h-20 rounded-xl  justify-between flex-row items-center ">
          <View>
            <Text className="text-2xl font-normal">
              ₹ {user?.earnings.totalTransitions.toFixed(1)}
            </Text>
            <Text className=" text-orange-500 text-xs">
              Total Purchase Earnings
            </Text>
          </View>
        </View>
        <View className="border border-gray-100" />
        {/* Total Referral Rewards */}
        <View className="h-20 rounded-xl  justify-between flex-row items-center ">
          <View>
            <Text className="text-2xl font-normal">
              ₹ {user?.earnings.totalRefer.toFixed(1)}
            </Text>
            <Text className=" text-orange-500 text-xs">
              Total Referral Rewards
            </Text>
          </View>
        </View>
      </View>
      {/* ================================================================ */}
      <InfoList
        title="Transfer History"
        onPress={() => {
          router.push("/shareperk/transitions");
        }}
      />
      <InfoList title="Help & Support" />
    </HeaderAppBar>
  );
};

export default memo(WalletIndex);
