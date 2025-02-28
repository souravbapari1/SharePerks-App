import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import AppButton from "../../../components/widgets/AppButton";
import { completeUserProfile } from "../../../network/worker/auth";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../constants/toaste-config";
import { getUser } from "../../../network/worker/user";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slice/userSlice";
import { isValidEmail } from "../../../helper/validate/validateEmail";
import { OneSignal } from "react-native-onesignal";

const SetUpProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [referCode, setReferCode] = useState<string>("");
  const dispatch = useAppDispatch();
  const completeProfile = async () => {
    if (!isValidEmail(email)) {
      Toast.show({
        ...toastConfig,
        text1: "Invalid Email ID",
        text2: "Please enter a valid Email ID",
        type: "error",
      });
      return false;
    }

    if (name.trim().length == 0) {
      Toast.show({
        ...toastConfig,
        text1: "Enter Your name",
        text2: "Please enter your name",
        type: "error",
      });
      return false;
    }

    try {
      setLoading(true);
      const response = await completeUserProfile({
        email,
        name,
        referCode,
      });
      const user = await getUser();
      // Pass in email provided by customer
      OneSignal.User.addEmail(user.user.email);

      // Pass in phone number provided by customer
      OneSignal.User.addSms("+91" + user.user.mobile);
      OneSignal.User.addTag("JoinDate", user.user.createdAt);
      dispatch(setUserData(user));
      router.replace("/auth/linkbroker");
      setLoading(false);
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

  const { width } = Dimensions.get("screen");
  return (
    <ScrollView className="flex-1 bg-white pt-24 p-8">
      <Text className="text-xl font-bold text-blue-950">
        Enter your details and browse offers!
      </Text>
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
        <Text className="text-xl text-blue-950 font-medium ">
          Please fill the details carefully
        </Text>
        <View className="authInput mt-5">
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color="#508FE9"
          />
          <TextInput
            autoComplete="off"
            className="flex-1 h-14  font-semibold"
            placeholder="Enter Email"
            cursorColor="#1e3faf"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View className="authInput mt-5">
          <FontAwesome name="user-o" size={21} color="#508FE9" />
          <TextInput
            autoComplete="off"
            className="flex-1 h-14  font-semibold"
            placeholder="Enter Name"
            cursorColor="#1e3faf"
            keyboardType="default"
            onChangeText={setName}
            value={name}
          />
        </View>
        <View className="authInput mt-5">
          <Entypo name="slideshare" size={21} color="#508FE9" />
          <TextInput
            autoComplete="off"
            className="flex-1 h-14  font-semibold"
            placeholder="Refer Code (Optional)"
            cursorColor="#1e3faf"
            keyboardType="numeric"
            value={referCode}
            onChangeText={setReferCode}
          />
        </View>
        <AppButton
          buttonText="Complete Profile"
          onClick={completeProfile}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

export default SetUpProfile;
