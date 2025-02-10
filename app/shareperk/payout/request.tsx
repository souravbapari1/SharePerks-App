import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import { router, useLocalSearchParams } from "expo-router";
import UpdateInputBox from "../../../components/widgets/UpdateInputBox";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../constants/toaste-config";
import { requestPayout } from "../../../network/worker/payout";
import { getUser } from "../../../network/worker/user";
import { setUserData } from "../../../redux/slice/userSlice";

export type PayoutPageData = {
  _id: string;
  name: string;
  number: string;
  ifsc: string;
};

const request = () => {
  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();

  const pageData = useLocalSearchParams<PayoutPageData>();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const sendPayoutRequest = async () => {
    if ((user?.user.walletAmount || 0) < 10) {
      Toast.show({
        ...toastConfig,
        text1: "Insufficient Wallet Amount!",
        text2: "Your wallet is very low",
        type: "error",
      });
      return false;
    }
    try {
      setLoading(true);
      const res = await requestPayout({
        amount: parseFloat(amount),
        bank: pageData._id,
        user: user!.user._id,
      });
      console.log(res);
      const userdata = await getUser();
      dispatch(setUserData(userdata));
      Toast.show({
        ...toastConfig,
        text1: "Payout Request Send",
        text2: res.message,
        type: "success",
      });
      router.back();
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Toast.show({
        ...toastConfig,
        text1: error.response.message || "Something went wrong!",
        text2: "Not send payout request",
        type: "error",
      });
    }
  };

  return (
    <HeaderAppBar title="Payout Request">
      <View className=" bg-orange-50  mb-5 border-gray-100  rounded-xl p-5 relative ">
        <Text className=" text-gray-700 font-bold">{pageData.name}</Text>
        <Text className=" text-gray-700 text-xs mt-2 font-bold  ">
          {pageData.number}
        </Text>
      </View>
      <UpdateInputBox
        showIcon={false}
        keyboardType="number-pad"
        input={{ placeholder: "Enter Amount" }}
        value={amount}
        onChange={setAmount}
      />
      <View className="mt-8">
        <Pressable
          className="authBtn bg-primary"
          disabled={loading}
          onPress={loading ? null : sendPayoutRequest}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white">Send Payout Request</Text>
          )}
        </Pressable>
      </View>
    </HeaderAppBar>
  );
};

export default request;
