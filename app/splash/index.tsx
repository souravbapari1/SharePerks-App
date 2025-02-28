import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedSplashLogo from "../../components/widgets/AnimatedSplashLogo";
import { Link, router } from "expo-router";
import { getUserAuthToken } from "../../network/action";
import { getUser } from "../../network/worker/user";
import { useAppDispatch } from "../../redux/hooks";
import { setUserData } from "../../redux/slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../constants/toaste-config";
import { smallCaseProvideUserToken } from "../../smallcase/smallcase";
import { OneSignal } from "react-native-onesignal";
const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const [isNew, setIsNew] = useState(false);
  const getUserData = async () => {
    const token = await getUserAuthToken();
    await smallCaseProvideUserToken();
    if (!token) {
      // setIsNew(true);
      router.replace("/auth");
      return false;
    } else {
      try {
        const user = await getUser();
        OneSignal.login(user.user._id);

        if (user.user.completeProfile == true) {
          dispatch(setUserData(user));

          router.replace("/shareperk");
          // router.replace("/shareperk/giftcard/view/sucess");
        } else {
          router.replace("/auth/steps");
        }
      } catch (error: any) {
        console.log(error);

        if (error?.response?.statusCode == 404) {
          await AsyncStorage.clear();

          router.replace("/auth");
        } else {
          Toast.show({
            ...toastConfig,
            text1: error?.response?.message || error?.message?.toString(),
            text2: "Please try again",
            type: "error",
          });
        }
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View className="flex-1 justify-between items-center bg-primary">
      <View className="h-60"></View>
      <AnimatedSplashLogo />
      <View className="h-60 flex justify-center items-center">
        {isNew ? (
          <>
            <Pressable
              onPress={() => {
                router.replace("/shareperk");
              }}
              className="bg-secondary w-44 text-center px-5 py-3 mb-5 rounded-full"
            >
              <Text className="text-white/70 text-center font-semibold">
                Continue
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                router.replace("/auth");
              }}
              className="bg-white w-32 text-center px-5 py-3 rounded-full"
            >
              <Text className="text-gray-500/70 text-center font-semibold">
                Sign In
              </Text>
            </Pressable>
          </>
        ) : (
          <ActivityIndicator color="#FFFFFF" />
        )}
      </View>
    </View>
  );
};

export default SplashScreen;
