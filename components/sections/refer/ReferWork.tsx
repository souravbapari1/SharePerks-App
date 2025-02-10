import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, Share, Text, View } from "react-native";
import UpdateInputBox from "../../widgets/UpdateInputBox";
import { trackerLink } from "../../../constants/appInfo";
import { useAppSelector } from "../../../redux/hooks";
import * as Clipboard from "expo-clipboard";
import { toastConfig } from "../../../constants/toaste-config";
import Toast from "react-native-toast-message";
import { SECONDARY_COLOR } from "../../../constants/colors";
function ReferWork() {
  const { user } = useAppSelector((e) => e.userSlice);
  const referLink = `"Hey! 👋 Join me on SharePerks, where you can access exclusive perks and rewards. Sign up using my referral code ${user?.user.referCode} to get extra perks on your first order! 🎉 Download the app now and start enjoying the benefits!"`;
  return (
    <View
      className="authBox items-center   "
      style={{ backgroundColor: "#FAFAFC" }}
    >
      <Text className="text-xl text-center mt-3 text-gray-800 mb-4">
        Share Refer Code via
      </Text>
      <UpdateInputBox
        input={{
          readOnly: true,
          placeholder: user?.user.referCode,
          value: user?.user.referCode,
        }}
        icon={
          <Ionicons
            onPress={async () => {
              await Clipboard.setStringAsync(user?.user.referCode || "");
              Toast.show({
                ...toastConfig,
                text1: "Code Copy To Clipboard",
              });
            }}
            name="copy"
            size={20}
            color={SECONDARY_COLOR}
          />
        }
      />
      <View>
        <Text className="text-xl text-center mt-3 text-gray-800 mb-4 font-bold ">
          or
        </Text>
        <View className="flex-row gap-4 mt-3">
          <Pressable
            onPress={() => {
              Linking.openURL(
                "https://www.facebook.com/sharer/sharer.php?u=" + referLink
              );
            }}
            className="flex-row gap-3 shadow justify-center items-center h-14 w-14 bg-blue-600 rounded-2xl"
          >
            <Ionicons name="logo-facebook" size={24} color="#fff" />
          </Pressable>
          <Pressable
            onPress={async () => {
              try {
                await Linking.openURL("whatsapp://send?text=" + referLink);
              } catch (error) {
                await Linking.openURL("https://wa.me/?text=" + referLink);
              }
            }}
            className="flex-row gap-3 shadow justify-center items-center h-14 w-14 bg-green-600 rounded-2xl"
          >
            <Ionicons name="logo-whatsapp" shadow size={24} color="#fff" />
          </Pressable>
          <Pressable
            onPress={async () => {
              await Share.share({
                message: referLink,
              });
            }}
            className="flex-row gap-3 shadow justify-center items-center h-14 w-14 bg-gray-600 rounded-2xl"
          >
            <Ionicons name="share-social" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default ReferWork;
