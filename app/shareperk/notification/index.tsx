import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NotificationData } from "../../../interface/notifications";
import {
  deleteNotification,
  loadNotification,
} from "../../../network/worker/notificaation";
import { useAppSelector } from "../../../redux/hooks";
import {
  formatDate,
  formatRelativeTime,
} from "../../../helper/date_time/getCurrentFormattedDateTime";
const index = () => {
  const state = useAppSelector((e) => e.userSlice);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<NotificationData[]>([]);

  const loadData = async () => {
    try {
      const notifications = await loadNotification(state.user!.user._id);
      setData(notifications);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteData = async () => {
    try {
      await deleteNotification(state.user!.user._id);
      setData([]);
      setLoading(false);
    } catch (error) {
      setData([]);

      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <HeaderAppBar
      loading={loading}
      title="Notifications"
      action={
        <Pressable onPress={deleteData}>
          <AntDesign name="delete" size={20} color="white" />
        </Pressable>
      }
    >
      {loading ? null : data.length == 0 ? (
        <Text className="text-center mt-36 text-gray-700 text-xl">
          No Notifications
        </Text>
      ) : (
        <ScrollView>
          {data.map((e) => {
            return <NotificationBox data={e} key={e._id} />;
          })}
        </ScrollView>
      )}
    </HeaderAppBar>
  );
};

export default index;

export function NotificationBox({ data }: { data: NotificationData }) {
  return (
    <View className="w-full mb-3 min-h-20 border-secondary/10 rounded-xl border flex flex-row   justify-start items-center">
      <View className="p-4">
        <Ionicons
          name="notifications-outline"
          size={24}
          color={SECONDARY_COLOR}
        />
      </View>
      <View className="pr-20">
        <View className="flex justify-between items-center w-full flex-row mb-1">
          <Text className=" text-md line-clamp-1 capitalize ">
            {data.title}
          </Text>
          <Text className="text-xs capitalize text-gray-500">
            {formatRelativeTime(data.createdAt)}
          </Text>
        </View>
        <Text className="text-xs text-gray-500 line-clamp-2">
          {data.message}
        </Text>
      </View>
    </View>
  );
}
