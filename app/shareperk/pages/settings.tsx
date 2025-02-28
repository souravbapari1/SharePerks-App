import HeaderAppBar from "@/components/ui/HeaderAppBar";
import Switch from "@/components/widgets/Switch";
import { updateProfile } from "@/network/worker/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserData } from "@/redux/slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { OneSignal } from "react-native-onesignal";

const settings = () => {
  return (
    <HeaderAppBar title="Settings & Security">
      <View className="flex-1 bg-white p-3">
        <Text className="text-xl text-gray-800 font-semibold">
          Notification Settings
        </Text>
        <View className="gap-4 mt-8">
          <NofiticationItem />
          <EmailAlertsItem />
        </View>
      </View>
    </HeaderAppBar>
  );
};

export default settings;

function NofiticationItem() {
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("notification").then((e) => {
      setNotification(e === "true");
    });
  }, []);

  useEffect(() => {
    try {
      if (notification) {
        OneSignal.User.pushSubscription.optIn();
      } else {
        OneSignal.User.pushSubscription.optOut();
      }
    } catch (error) {
      console.log(error);
    }
    AsyncStorage.setItem("notification", notification.toString());
  }, [notification]);

  return (
    <SettingItem
      title="Message Notifications"
      onPress={() => setNotification(!notification)}
      value={notification}
    />
  );
}

function EmailAlertsItem() {
  const [notification, setNotification] = useState(false);

  const state = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notification != state.user?.user.emailAlerts) {
      updateAlert();
    }
  }, [notification]);

  useEffect(() => {
    setNotification(state.user?.user.emailAlerts || false);
  }, []);

  const updateAlert = async () => {
    const useData = await updateProfile({ emailAlerts: notification });
    dispatch(setUserData(useData));
  };

  return (
    <SettingItem
      title="Email Notifications"
      onPress={() => setNotification(!notification)}
      value={notification}
    />
  );
}

const SettingItem = React.memo(
  ({
    title,
    value,
    onPress,
  }: {
    title: string;
    value: boolean;
    onPress: () => void;
  }) => {
    return (
      <View className="justify-between items-center w-full flex-row">
        <Text className="text-lg text-gray-500">{title}</Text>
        <Switch value={value} onChange={onPress} />
      </View>
    );
  }
);
