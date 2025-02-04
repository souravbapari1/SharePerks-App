import React, { useEffect } from "react";
import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SECONDARY_COLOR } from "../../../constants/colors";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { OneSignal } from "react-native-onesignal";
import { setUserData } from "../../../redux/slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SmallcaseGateway from "react-native-smallcase-gateway";
function logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(logoutUser, 1000);
  }, []);

  const logoutUser = async () => {
    try {
      dispatch(setUserData(null));
      OneSignal.logout();
      await AsyncStorage.clear();
      await SmallcaseGateway.logoutUser();
      router.replace("/auth");
    } catch (error) {
      await AsyncStorage.clear();
      router.replace("/auth");
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-white flex justify-center items-center text-center">
      <View className="animate-spin">
        <AntDesign name="loading1" size={24} color={SECONDARY_COLOR} />
      </View>
    </View>
  );
}

export default logout;
