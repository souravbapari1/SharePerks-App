import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Linking,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import SmallcaseGateway from "react-native-smallcase-gateway";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/slice/userSlice";
import { OneSignal } from "react-native-onesignal";

function UserNavigateList({ onOpenPolicy }: { onOpenPolicy: Function }) {
  return (
    <View className="flex-1 bg-white rounded-t-3xl -mt-7 p-8 ">
      <Text className="text-xl text-gray-800 font-bold">Profile</Text>
      <View className="gap-3 mt-8">
        <UserList
          onPress={() => {
            router.push("/shareperk/pages/updateProfile");
          }}
        >
          <AntDesign name="user" size={22} color="black" />
          <Text className="font-semibold  mt-1 ">Update Profile</Text>
        </UserList>
        <UserList
          onPress={() => {
            router.push("/shareperk/pages/walletinfo");
          }}
        >
          <Ionicons name="wallet-outline" size={22} color="black" />
          <Text className="font-semibold  mt-1 ">Total Earnings</Text>
        </UserList>
        <UserList
          onPress={() => {
            router.push("/shareperk/pages/myrefers");
          }}
        >
          <Ionicons name="grid-outline" size={22} color="black" />
          <Text className="font-semibold  mt-1 ">My Referrals</Text>
        </UserList>
        <UserList onPress={() => {}}>
          <Feather name="info" size={22} color="black" />
          <Text
            className="font-semibold  mt-1 "
            onPress={() => {
              router.push("/shareperk/pages/helpandsupport");
            }}
          >
            Help Centre
          </Text>
        </UserList>
        <UserList
          onPress={() => {
            router.push("/shareperk/pages/settings");
          }}
        >
          <AntDesign name="setting" size={22} color="black" />
          <Text className="font-semibold  mt-1 ">Settings & Security</Text>
        </UserList>

        <UserList
          onPress={() => {
            // alert(<ActivityIndicator size="large" color="black" />);
            router.push("/shareperk/pages/privacypolicy");
          }}
        >
          <Ionicons name="lock-open-outline" size={22} color="black" />
          <Text className="font-semibold  mt-1 ">Privacy Policy</Text>
        </UserList>
        <View className="border border-gray-100" />
        <UserList
          onPress={async () => {
            router.replace("/shareperk/pages/logout");
          }}
        >
          <AntDesign name="logout" size={20} color="black" />
          <Text className="font-semibold  mt-1 ">Logout</Text>
        </UserList>
        <UserList
          onPress={() => {
            Linking.openURL("https://admin.shareperks.in/delete");
          }}
        >
          <AntDesign name="delete" size={22} color="#FF0000" />
          <Text className="font-semibold   text-[#FF0000]">Delete account</Text>
        </UserList>
      </View>
    </View>
  );
}

export default UserNavigateList;

function UserList({
  children,
  onPress,
}: {
  children?: ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-4 py-2  ">
      {children}
    </Pressable>
  );
}
