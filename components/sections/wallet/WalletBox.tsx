import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

import { SECONDARY_COLOR } from "../../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { connectBroker } from "../../../smallcase/smallcase";
import { setUserData } from "../../../redux/slice/userSlice";
import MyHoldings from "../../ui/MyHoldings";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../constants/toaste-config";

const WalletBox = ({
  onViewHoldingPress,
}: {
  onViewHoldingPress: Function;
}) => {
  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const conectBorkeer = async () => {
    try {
      setLoading(true);
      const data = await connectBroker();
      dispatch(setUserData(data));
      setLoading(false);
    } catch (error) {
      Toast.show({
        ...toastConfig,
        text1: "Failed to import Holdings",
        text2: "Please Try Again later",
        type: "info",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View className=" border border-orange-200 rounded-3xl p-3 ">
      <View className="py-2 h-20 rounded-xl bg-orange-100 justify-between flex-row items-center px-5">
        <View>
          <Text className="text-gray-800">Wallet Balance</Text>
          <Text className="text-2xl font-bold">
            ₹ {user?.user.walletAmount.toFixed(1)}
          </Text>
        </View>
        <View
          className="h-14 w-14 flex justify-center items-center bg-orange-300/30"
          style={{ borderRadius: 100 }}
        >
          <Entypo name="wallet" size={24} style={{ color: SECONDARY_COLOR }} />
        </View>
      </View>
      <View className="flex-row gap-4 justify-between items-center mt-4 mb-4 px-5 ">
        <View>
          <Text className="text-2xl font-bold">
            ₹ {user?.earnings.totalTransitionsPending.toFixed(1)}
          </Text>
          <Text className="text-gray-800 text-xs">Pending Earnings</Text>
        </View>
        <View className="items-end">
          <Text className="text-2xl font-bold">
            ₹ {user?.earnings.totalTransitions.toFixed(1)}
          </Text>
          <Text className="text-gray-800 text-xs">Total Earnings</Text>
        </View>
      </View>
      <View className="justify-between items-center h-1 bg-gray-100 rounded-full"></View>
      <View className="flex-row justify-between items-center rounded-full mt-4">
        {user?.user.brokerConnected ? (
          <Pressable
            className="p-2 bg-white"
            disabled={loading}
            onPress={() => onViewHoldingPress()}
          >
            <Text className="text-xs text-orange-600 underline">
              View My Holdings
            </Text>
          </Pressable>
        ) : (
          <Pressable disabled={loading} onPress={conectBorkeer}>
            {loading ? (
              <Text className="text-xs text-gray-600 underline">
                Importing...
              </Text>
            ) : (
              <Text className="text-xs text-orange-600 underline">
                Link your broker account {">"}
              </Text>
            )}
          </Pressable>
        )}

        <Pressable
          onPress={() => {
            router.push("/shareperk/payout");
          }}
          className="h-8 w-28 rounded-xl flex justify-center items-center bg-orange-500"
        >
          <Text className="text-white text-sm">Withdraw</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WalletBox;
