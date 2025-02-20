import { View, Text, Pressable } from "react-native";
import React from "react";
import { BillSvg } from "./BillSvg";
import { SECONDARY_COLOR } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { connectBroker } from "../../smallcase/smallcase";
import { setUserData } from "../../redux/slice/userSlice";
import { getPercentageValue } from "@/helper/percent";

const SampleBill = ({
  type = "PERCENT",
  withHoldings = 5,
  withOutHolding = 2,
  isCoupon = false,
  isHolding = true,
}: {
  withHoldings?: number;
  withOutHolding?: number;
  type?: string;
  isCoupon?: boolean;
  isHolding?: boolean;
}) => {
  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();

  const amount = 2500;

  const saveWithOutHolding =
    type === "PERCENT"
      ? getPercentageValue(amount, withOutHolding)
      : withOutHolding;

  const saveWithHolding =
    type === "PERCENT"
      ? getPercentageValue(amount, withHoldings)
      : withHoldings;

  const getSavedAmount = () => {
    if (isHolding) {
      return saveWithHolding;
    }
    return saveWithOutHolding;
  };

  return (
    <View className="px-5 mt-6">
      <Text className="titleHome mb-2">Sample Bill</Text>
      <View className="rounded-xl   border border-gray-50 shadow p-4 mt-2 bg-white">
        <View className="flex-row items-center gap-4">
          <BillSvg size={20} />
          <Text className="text-sm font-semibold text-gray-800 ">
            You saved up to Rs. {getSavedAmount().toFixed(2)}
          </Text>
        </View>
        <View style={[{ height: 1, overflow: "hidden" }]} className="my-3 mx-2">
          <View
            style={[
              {
                height: 2,
                borderWidth: 3,
                borderColor: "#ddd",
                borderStyle: "dashed",
              },
            ]}
          ></View>
        </View>

        <View className="gap-2">
          <View className="flex-row justify-between items-center gap-4">
            <Text className="text-sm font-light  text-gray-900">
              Total Bill
            </Text>
            <Text className="text-xs" style={{ color: SECONDARY_COLOR }}>
              ₹ {amount.toFixed(2)}
            </Text>
          </View>
          {isCoupon && (
            <View className="flex-row justify-between items-center gap-4">
              <Text className="text-sm font-light  text-orange-500">
                Gift card offer
              </Text>
              <Text className="text-xs" style={{ color: SECONDARY_COLOR }}>
                ₹ 500
              </Text>
            </View>
          )}
          {!isCoupon && (
            <View className="flex-row justify-between items-center gap-4">
              <Text className="text-sm font-light  text-orange-500">
                Affiliate cashback offer
              </Text>
              <Text className="text-xs" style={{ color: SECONDARY_COLOR }}>
                ₹ {saveWithOutHolding.toFixed(2)}
              </Text>
            </View>
          )}

          {isHolding && (
            <View className="flex-row justify-between items-center gap-4">
              <Text className="text-sm font-light  text-orange-500">
                Holding cashback
              </Text>
              <Text className="text-xs" style={{ color: SECONDARY_COLOR }}>
                ₹ {(saveWithHolding - saveWithOutHolding).toFixed(2)}
              </Text>
            </View>
          )}

          <View className="flex-row justify-between items-center gap-4 mt-2">
            <Text className="text-xs font-medium  text-gray-700">
              You’ll pay
            </Text>
            <Text className="text-xs font-medium">
              ₹ {(amount - getSavedAmount()).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={[{ height: 1, overflow: "hidden" }]} className="my-3 mx-2">
          <View
            style={[
              {
                height: 2,
                borderWidth: 3,
                borderColor: "#ddd",
                borderStyle: "dashed",
              },
            ]}
          ></View>
        </View>
        {user?.user.brokerConnected == false && (
          <Pressable
            className="flex-row justify-end items-center gap-4 mt-2"
            onPress={async () => {
              try {
                const userData = await connectBroker();
                dispatch(setUserData(userData));
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text className="text-sm font-light underline  text-orange-500">
              Link your broker account
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SampleBill;
