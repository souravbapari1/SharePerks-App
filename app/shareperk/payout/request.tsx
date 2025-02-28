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
import { Ionicons } from "@expo/vector-icons";
import { SECONDARY_COLOR } from "@/constants/colors";

export type PayoutPageData = {
  _id: string;
  name: string;
  number: string;
  ifsc: string;
};

const request = () => {
  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();

  // const pageData = useLocalSearchParams<PayoutPageData>();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [upi, setUpi] = useState("");

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
    if (upi == "") {
      Toast.show({
        ...toastConfig,
        text1: "Please enter upi",
        text2: "Please enter upi",
        type: "error",
      });
      return false;
    }
    try {
      setLoading(true);
      const res = await requestPayout({
        amount: parseFloat(amount),

        user: user!.user._id,
        upi: upi,
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

  const state = useAppSelector((e) => e.userSlice);

  return (
    <HeaderAppBar
      title="Payout Request"
      action={
        <View className="flex-row items-center gap-2">
          <Ionicons name="wallet" size={24} color={"#ffffff"} />
          <Text className="text-white font-bold">
            {state.user?.user.walletAmount.toFixed(1) || "0.0"}
          </Text>
        </View>
      }
    >
      <UpdateInputBox
        showIcon={false}
        keyboardType="url"
        input={{ placeholder: "Enter Upi ID" }}
        value={upi}
        onChange={setUpi}
      />
      <View className="mt-4" />
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
