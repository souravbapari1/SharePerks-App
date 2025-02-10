import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import AppButton from "../../components/widgets/AppButton";
import { WelcomeTitle } from "../../components/widgets/WelcomeTitle";
import { toastConfig } from "../../constants/toaste-config";
import { authUser } from "../../network/worker/auth";
import { navigate } from "../../utils/navigate";
import { OtpScreenParams } from "./otp";

const AuthMobile = () => {
  const { width } = Dimensions.get("screen");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    console.log(mobile);

    if (mobile.trim().length != 10) {
      Toast.show({
        ...toastConfig,
        text1: "Invalid Mobile Number",
        text2: "Please Enter a Valid Mobile Number",
        type: "error",
      });
      return false;
    }
    try {
      setLoading(true);
      const data = await authUser(parseInt(mobile));

      navigate<OtpScreenParams>({
        type: "push",
        pathname: "/auth/otp",
        params: { mobile },
      });
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      Toast.show({
        ...toastConfig,
        text1: error?.response?.message || error?.message?.toString(),
        text2: "Please try again",
        type: "error",
      });
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: 30, padding: 8 }}
    >
      <WelcomeTitle />
      <Image
        source={require("@/assets/mobile.png")}
        className="mt-10"
        style={{
          width: width,
          height: width / 1.3,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <View className="mt-11 mb-20 authBox ">
        <Text className="text-xl text-blue-950 font-medium ">
          Login Your Account
        </Text>
        <View className="authInput mt-5">
          <Ionicons name="call-outline" size={22} color="#508FE9" />
          <TextInput
            autoComplete="off"
            className="flex-1 h-14  font-semibold"
            placeholder="Enter Mobile No.."
            cursorColor="#1e3faf"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>
        <AppButton buttonText="Get OTP" loading={loading} onClick={onClick} />
      </View>
    </ScrollView>
  );
};

export default AuthMobile;
