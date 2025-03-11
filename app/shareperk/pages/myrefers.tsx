import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SECONDARY_COLOR } from "@/constants/colors";
import { useQuery } from "@tanstack/react-query";
import { client, UserAuthToken } from "@/network/action";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/interface/user";

const MyRefers = () => {
  const navigate = useNavigation();
  const data = useAppSelector((state) => state.userSlice);
  const loadData = useQuery({
    queryKey: ["myrefers", data.user?.user._id],
    queryFn: async () => {
      return await client
        .get("/api/v1/user/referrals/" + data.user?.user._id)
        .send<User[]>(await UserAuthToken());
    },
  });

  useEffect(() => {
    navigate.setOptions({
      headerShown: true,
      title: "My Referrals",
      headerLeft: () => (
        <Ionicons
          name="chevron-back"
          size={24}
          color={SECONDARY_COLOR}
          className="pr-5"
          onPress={() => navigate.goBack()}
        />
      ),
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: "#fff",
      },
    });
  }, [navigate]);

  if (loadData.isLoading) {
    return (
      <View className="flex-1 items-center justify-center h-[85vh]">
        <ActivityIndicator size="large" color={SECONDARY_COLOR} />
      </View>
    );
  }

  if (!loadData.data?.length) {
    return (
      <View className="flex-1 items-center justify-center h-[85vh]">
        <Text>No Referral Found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-5">
      {loadData.data?.map((item, index: number) => (
        <View className="flex flex-row justify-start gap-3 items-center bg-gray-50 p-5 rounded-md">
          <Image
            source={{ uri: item.image }}
            className="w-20 h-20 rounded-full"
          />
          <Text className="text-xl font-bold" key={index}>
            {item.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyRefers;
