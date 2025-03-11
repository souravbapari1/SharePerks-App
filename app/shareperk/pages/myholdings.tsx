import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SECONDARY_COLOR } from "@/constants/colors";
import SmallcaseGateway from "react-native-smallcase-gateway";
import { updateProfile } from "@/network/worker/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserData } from "@/redux/slice/userSlice";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/constants/toaste-config";
import { navigate } from "@/utils/navigate";
import {
  connectBroker,
  SmallcaseGatewayTriggerTransaction,
} from "@/smallcase/smallcase";
const MyHoldings = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((e) => e.userSlice);

  const [loading, setLoading] = useState(false);

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      console.log("Disconnecting user...");
      try {
        await SmallcaseGateway.logoutUser();
      } catch (error) {
        console.log(error);
      }
      const data = await updateProfile({
        brokerConnected: false,
      });

      dispatch(setUserData(data));

      Toast.show({
        type: "success",
        text1: "Broker Account Disconnected Successfully",
        ...toastConfig,
      });

      navigation.goBack(); // Using React Navigation instead of router.back()
    } catch (error) {
      console.log("Error disconnecting:", error);

      Toast.show({
        type: "error",
        text1: "Error Disconnecting Broker Account. Try Again!",
        ...toastConfig,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      console.log("Disconnecting user...");

      const userData = await connectBroker();
      dispatch(setUserData(userData));

      Toast.show({
        type: "success",
        text1: "Holding Refresh Successfully",
        ...toastConfig,
      });
    } catch (error) {
      console.log("Error disconnecting:", error);

      Toast.show({
        type: "error",
        text1: "Error Refresh Holding. Try Again!",
        ...toastConfig,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Holdings",
      headerShown: true,
      headerRight: () => {
        return (
          <View className="gap-3 flex-row">
            <TouchableOpacity
              disabled={loading}
              style={{ opacity: loading ? 0.5 : 1 }}
              onPress={handleRefresh}
              className="flex-row gap-2 text-white items-center justify-center bg-primary rounded-full p-2 px-4"
            >
              <AntDesign name="reload1" size={15} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              style={{ opacity: loading ? 0.5 : 1 }}
              onPress={handleDisconnect}
              className="flex-row gap-2 text-white items-center justify-center bg-secondary rounded-full p-2 px-4"
            >
              <AntDesign name="disconnect" size={15} color="white" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, loading]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="py-8 px-5">
        {user?.holdings?.data.securities.map((e) => {
          return (
            <TouchableOpacity
              key={e.isin}
              onPress={() => {
                navigate({
                  pathname: ("/shareperk/pages/offers/broker/" + e.isin) as any,
                  params: {
                    name: e.name,
                  },
                });
              }}
            >
              <View className="flex-row justify-between py-3 bg-gray-50 mb-2 rounded-xl px-4">
                <Text className="font-semibold text-gray-600">{e.name}</Text>
                <Text className="text-gray-800 font-bold">
                  {e.transactableQuantity}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MyHoldings;
