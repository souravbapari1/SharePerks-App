import React, { useEffect, useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import {
  MAIN_COLOR,
  SECONDARY_COLOR,
  statusColors,
} from "../../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PayoutData } from "../../../interface/payout";
import { getUserPayouts } from "../../../network/worker/payout";
import { formatDate } from "../../../helper/date_time/getCurrentFormattedDateTime";

function PayoutHistory() {
  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PayoutData[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const payouts = await getUserPayouts(user!.user._id);

      setData(payouts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <HeaderAppBar title="History">
      <ScrollView>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="titleHome mb-6">Withdraw History</Text>
        </View>
        {loading && (
          <View className="h-96 justify-center items-center">
            <ActivityIndicator />
          </View>
        )}
        {!loading && data.length == 0 && (
          <View className="h-96 justify-center items-center">
            <Text>No Payouts Found!</Text>
          </View>
        )}
        {data.map((e) => (
          <View
            className="flex-row justify-between items-center mb-6"
            key={e._id}
          >
            <View className="flex-row justify-between items-center gap-5">
              <View className="flex justify-center items-center w-12 h-12 rounded-2xl bg-orange-100 ">
                <MaterialIcons
                  name="payment"
                  size={20}
                  color={SECONDARY_COLOR}
                />
              </View>
              <View className="justify-between gap-1 ">
                <Text className="text-lg font-bold">{e.bank.name}</Text>
                <Text className="text-xs text-black/40">
                  Date: {formatDate(e.createdAt.toString())}
                </Text>
              </View>
            </View>
            <View className="justify-between items-end gap-1 ">
              <Text className="text-lg font-bold text-gray-800">
                ₹ {e.amount}
              </Text>
              <Text
                className="text-xs font-bold  capitalize"
                style={{ color: statusColors[e.status] }}
              >
                {e.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </HeaderAppBar>
  );
}

export default PayoutHistory;
