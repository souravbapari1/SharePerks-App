import React, { useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import { useAppSelector } from "../../../redux/hooks";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { DISABLE_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import { router } from "expo-router";
import { navigate } from "../../../utils/navigate";
import { PayoutPageData } from "./request";

function index() {
  const { user } = useAppSelector((e) => e.userSlice);
  return (
    <HeaderAppBar title="Select Bank Account">
      {user?.banks.length == 0 && (
        <View className="justify-center items-center min-h-[600]">
          <FontAwesome
            name="bank"
            size={94}
            color={DISABLE_COLOR}
            className="opacity-30"
          />
          <Text className="text-2xl font-semibold text-gray-600 my-10 mb-5">
            No Bank Account
          </Text>
        </View>
      )}
      {user?.banks.map((e) => {
        return (
          <Pressable
            onPress={() => {
              navigate<PayoutPageData>({
                type: "push",
                pathname: "/shareperk/payout/request",
                params: {
                  _id: e._id,
                  ifsc: e.ifscCode,
                  name: e.name,
                  number: e.accountNumber,
                },
              });
            }}
            key={e._id}
            className="mb-5"
          >
            <View className=" bg-white border-2 border-gray-100  rounded-xl p-5 relative ">
              <Text className=" text-gray-700 font-bold">{e?.name}</Text>
              <Text className=" text-gray-700 text-xs mt-2 font-bold  ">
                {e?.accountNumber}
              </Text>
              <Pressable
                className="absolute right-0 top-0 p-3 "
                onPress={() => {
                  const data = {
                    name: e?.name || "",
                    number: e?.accountNumber || "",
                    ifsc: e?.ifscCode || "",
                    id: e._id,
                  };
                  router.push({
                    pathname: "/shareperk/payout/banks/update",
                    params: { ...data },
                  });
                }}
              >
                <Feather name="edit-2" size={18} color={SECONDARY_COLOR} />
              </Pressable>
            </View>
          </Pressable>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          router.push("/shareperk/payout/banks/add");
        }}
      >
        <Text className="text-md text-center  text-blue-700 p-4">
          Add Bank Account
        </Text>
      </TouchableOpacity>
    </HeaderAppBar>
  );
}

export default index;
