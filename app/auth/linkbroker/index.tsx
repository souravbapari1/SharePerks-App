import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { connectBroker } from "../../../smallcase/smallcase";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../constants/toaste-config";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slice/userSlice";

const LinkBroker = () => {
  const { width } = Dimensions.get("screen");
  const dispatch = useAppDispatch();
  const connectToBroker = async () => {
    try {
      const userData = await connectBroker();
      dispatch(setUserData(userData));
      router.replace("/shareperk");
    } catch (error) {
      Toast.show({
        ...toastConfig,
        text1: "Failed to import Holdings",
        text2: "Please Try Again later",
        type: "info",
      });
      console.log(error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-24 p-8">
      <Text className="text-xl font-bold text-blue-950">
        Enter your details and browse offers!
      </Text>
      <Image
        source={require("../../../assets/mobile.png")}
        className="mt-10"
        style={{
          width: width,
          height: width / 1.3,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <View className="mt-11 mb-14 authBox">
        <Text className="text-md mb-2 text-blue-950 font-medium ">
          Your details are saved!
        </Text>
        <Text className="text-xl font-bold text-blue-950">
          Connect your brokerage to browse rewards
        </Text>
        <Text className="text-gray-600 mt-3">
          Get started by linking your brokerage account via Plaid. This allows
          us to verify your ownership and show you tailored benefits.
        </Text>

        <View className="flex-row mt-6 justify-between items-center">
          <Pressable
            onPress={() => {
              router.replace("/shareperk");
            }}
          >
            <Text className="text-gray-800">Skip</Text>
          </Pressable>

          <Pressable
            onPress={connectToBroker}
            className="w-36 h-11 bg-blue-900  justify-center items-center rounded-xl"
          >
            <Text className="font-semibold text-white">Link account</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default LinkBroker;
