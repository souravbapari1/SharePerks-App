import React from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Link } from "expo-router";

function index() {
  return (
    <View className="flex-1 bg-white flex justify-center items-center">
      <LottieView
        source={require("../../../../../assets/sucess.json")}
        autoPlay
        loop={false}
        style={{ width: 250, height: 250 }}
      />
      <View className="w-[80vw] flex justify-center items-center gap-5">
        <Text className="text-xl font-extrabold text-gray-700">
          Your Order is Successfully Placed
        </Text>
        <Text className="text-center font-light text-gray-700">
          You can check your order status in your account
        </Text>
        <Link
          replace
          href="/shareperk/giftcard/mycoupons"
          className="text-primary mt-10"
        >
          <Text className="text-center font-semibold text-primary ">
            Go to My Coupons
          </Text>
        </Link>
      </View>
    </View>
  );
}

export default index;
