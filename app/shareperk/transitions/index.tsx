import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import { useAppSelector } from "../../../redux/hooks";
import { getUserTransitions } from "../../../network/worker/transitions";
import { TransitionsData } from "../../../interface/transitions";
import { DISABLE_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { client } from "../../../network/action";
import { TransitionsType } from "../../../constants/appInfo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const index = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TransitionsData[]>([]);
  const [filter, setFilter] = useState<string | null>(null); // Filter state
  const bottomSheetRef = useRef<BottomSheet>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const transitions = await getUserTransitions(user!.user._id);
      setData(transitions);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Function to filter data based on status
  const filteredData = filter
    ? data.filter((e) => e.status.toLowerCase() === filter.toLowerCase())
    : data;

  const isActive = (status: string | null) => filter === status; // Helper function to check active filter

  return (
    <GestureHandlerRootView>
      <HeaderAppBar title="Transitions History" loading={loading}>
        <ScrollView>
          <View className="flex-row justify-between items-center mb-8">
            <Text className="titleHome">Transfer History</Text>
            <Pressable
              onPress={() => {
                bottomSheetRef.current?.snapToIndex(1);
              }}
              className="flex-row items-center justify-center gap-2 rounded-2xl bg-orange-100 p-2 px-4"
            >
              <AntDesign name="filter" size={14} color={SECONDARY_COLOR} />
              <Text className=" font-medium text-sm text-orange-500">
                Filter
              </Text>
            </Pressable>
          </View>
          {filteredData.length === 0 && (
            <View className="flex justify-center items-center  mt-20 ">
              <Text className="text-lg font-bold capitalize">
                No History found
              </Text>
            </View>
          )}

          {filteredData.map((e) => (
            <TransferHistoryList data={e} key={e._id} />
          ))}
        </ScrollView>
      </HeaderAppBar>

      <BottomSheet
        style={{ borderTopWidth: 1, borderColor: DISABLE_COLOR }}
        ref={bottomSheetRef}
        snapPoints={[1, 350]}
      >
        <BottomSheetView>
          <View className="flex justify-center items-center px-5 gap-4">
            <Pressable
              onPress={() => setFilter("pending")}
              className={`${
                isActive("pending")
                  ? "bg-orange-500 border-orange-500"
                  : "bg-orange-200/30 border-orange-200"
              } px-10 w-full py-5 border rounded-xl mt-3`}
            >
              <Text
                className={`font-bold text-center uppercase ${
                  isActive("pending") ? "text-white" : SECONDARY_COLOR
                }`}
              >
                Pending Payments
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setFilter("complete")}
              className={`${
                isActive("complete")
                  ? "bg-green-600 border-green-600"
                  : "bg-green-600/30 border-green-300/40"
              } px-10 w-full py-5 border rounded-xl`}
            >
              <Text
                className={`font-bold text-center uppercase ${
                  isActive("complete") ? "text-white" : "text-green-600"
                }`}
              >
                Complete Payments
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setFilter("failed")}
              className={`${
                isActive("failed")
                  ? "bg-red-600 border-red-600"
                  : "bg-red-600/20 border-red-400/30"
              } px-10 w-full py-5 border rounded-xl`}
            >
              <Text
                className={`font-bold text-center uppercase ${
                  isActive("failed") ? "text-white" : "text-red-600"
                }`}
              >
                Failed Payments
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setFilter(null)} // Clear filter
              className={`${
                isActive(null)
                  ? "bg-gray-500 border-gray-500/10"
                  : "bg-gray-200 border-gray-300 "
              } px-10 w-full py-5 border  rounded-xl`}
            >
              <Text
                className={`font-bold text-center uppercase ${
                  isActive(null) ? "text-white" : "text-gray-600"
                }`}
              >
                Show All
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default index;

const TransferHistoryList = ({ data }: { data: TransitionsData }) => {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row justify-between items-center gap-5">
        {data.type == TransitionsType.REFERRAL ? (
          <View className="flex justify-center items-center w-12 h-12 rounded-2xl bg-orange-100 ">
            <AntDesign name="gift" size={18} color={SECONDARY_COLOR} />
          </View>
        ) : (
          <View className="flex justify-center items-center overflow-hidden w-12 h-12 rounded-2xl bg-orange-100 ">
            <Image
              width={18}
              height={18}
              source={{
                uri: client.baseUrl + "/" + data.brandData.brandImage,
              }}
              className="w-12 h-12"
            />
          </View>
        )}
        <View className="justify-between gap-1 ">
          <Text className="text-lg font-bold">{data.title}</Text>
          <Text className="text-xs text-black/40">{data.subtitle}</Text>
        </View>
      </View>
      <View className="justify-between items-end gap-1 ">
        <Text className="text-lg font-bold text-gray-800">
          ₹ {data.payAmount.toFixed(1)}
        </Text>
        <Text className="text-xs font-bold text-green-600 capitalize">
          {data.status}
        </Text>
      </View>
    </View>
  );
};
