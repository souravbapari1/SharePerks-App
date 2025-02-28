import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { WelcomeTitle } from "../../components/widgets/WelcomeTitle";
import OTPTextInput from "react-native-otp-textinput";
import { useLocalSearchParams, useRouter } from "expo-router";
import AppButton from "../../components/widgets/AppButton";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../constants/toaste-config";
import {
  authUserResendOtp,
  authUserVerifyOtp,
} from "../../network/worker/auth";
import { setUserAuthToken } from "../../network/action";
import { useAppDispatch } from "../../redux/hooks";
import { setUserData } from "../../redux/slice/userSlice";
import { getUser } from "../../network/worker/user";
import { OneSignal } from "react-native-onesignal";

export type OtpScreenParams = {
  mobile: string;
};
const OtpScreen = () => {
  const router = useRouter();
  const { width } = Dimensions.get("screen");
  const [loading, setLoading] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>("");
  const params = useLocalSearchParams<OtpScreenParams>();
  const dispatch = useAppDispatch();
  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await authUserVerifyOtp(
        parseInt(params.mobile),
        parseInt(otpInput)
      );

      await setUserAuthToken(response.token);
      OneSignal.login(response.user._id);
      if (response.user.completeProfile) {
        const data = await getUser();
        dispatch(setUserData(data));
        router.dismissAll();
        router.replace("/shareperk");
        setLoading(false);
      } else {
        setLoading(false);
        router.dismissAll();
        router.replace("/auth/steps");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      Toast.show({
        ...toastConfig,
        text1: error?.response.message || error.message.toString(),
        text2: "Please try again",
        type: "error",
      });
    }
  };

  const resendOtp = async () => {
    try {
      const data = await authUserResendOtp(parseInt(params.mobile));
      Toast.show({
        ...toastConfig,
        text1: "Success",
        text2: "Your otp resend successfully",
        type: "success",
      });
    } catch (error: any) {
      console.log(error);

      Toast.show({
        ...toastConfig,
        text1: error?.response.message || error.message.toString(),
        text2: "Please try again",
        type: "error",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-24 p-8">
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
      <View className="mt-11 mb-20 authBox">
        <Text className="text-xl text-blue-950 mb-5 font-medium ">
          Enter the 4- digit authentication code we sent to your mobile no.
        </Text>
        <OTPTextInput
          keyboardType="number-pad"
          textInputStyle={{
            borderWidth: 1,
            borderBottomWidth: 1,
            borderRadius: 14,
          }}
          handleTextChange={setOtpInput}
          offTintColor="#ebebeb"
          tintColor="#bfd5ff"
        />
        <AppButton buttonText="NEXT" disabled={loading} onClick={verifyOtp} />
        <View className="flex-row gap-2 mt-6 flex justify-start">
          <Text className=" text-gray-900">Don’t receive the code?</Text>
          <Pressable onPress={resendOtp}>
            <Text className=" font-medium text-orange-600">Resend</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default OtpScreen;
