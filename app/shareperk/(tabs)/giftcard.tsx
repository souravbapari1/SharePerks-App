import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import { Link, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../network/action";
import { GIFTERGiftCard } from "../../../interface/giftcard";
import { WhoowCards } from "../../../interface/whoowCard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppSelector } from "../../../redux/hooks";
const GiftCard = () => {
  const { width } = Dimensions.get("window");
  const { user } = useAppSelector((e) => e.userSlice);
  useEffect(() => {
    if (user == null) {
      router.replace("/auth");
    }
  }, []);

  if (!user) {
    return <></>;
  }

  const data = useQuery({
    queryKey: ["giftcard"],
    queryFn: async () => {
      const gifter = await client
        .get("/api/v1/giftcard")
        .send<GIFTERGiftCard[]>();
      const whoow = await client.get("/api/v1/whoow").send<WhoowCards[]>();
      return { gifter, whoow };
    },
  });

  return (
    <HeaderAppBar
      title="Gift Card"
      loading={data.isLoading}
      action={
        <TouchableOpacity
          onPress={() => {
            router.push("/shareperk/giftcard/mycoupons");
          }}
        >
          <MaterialCommunityIcons name="cards" size={24} color="white" />
        </TouchableOpacity>
      }
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {data.data?.gifter?.length === 0 && data.data?.whoow?.length === 0 && (
          <View className="flex-1 h-96 items-center justify-center">
            <Text className="text-gray-500 text-sm">
              No Gift Cards Available
            </Text>
          </View>
        )}
        <View className="flex-row justify-between items-center flex-wrap gap-5 pb-52">
          {data.data?.gifter?.map((e, i) => {
            return (
              <Link href={`/shareperk/giftcard/view/gifter/${e._id}`} key={i}>
                <View
                  className="bg-white  justify-between flex-col items-center border-2 border-primary/10 rounded-lg overflow-hidden"
                  style={{ width: width / 2 - 28 }}
                >
                  <View />
                  <View className=" justify-center  items-center w-full">
                    <Image
                      width={width / 2 - 28 - 50}
                      height={100}
                      style={{ objectFit: "contain" }}
                      source={{
                        uri: e.previewImage,
                      }}
                    />
                  </View>
                  <View className=" justify-center items-center w-full">
                    {/* <View className="pb-4">
                      <Text className=" font-bold">Amazon</Text>
                    </View> */}
                    <View className="bg-primary w-full p-2">
                      <Text className="text-sm line-clamp-1 overflow-hidden text-center text-white">
                        {e.brandName}
                      </Text>
                    </View>
                  </View>
                </View>
              </Link>
            );
          })}

          {/* // render whoow  */}
          {data.data?.whoow?.map((e, i) => {
            return (
              <Link href={`/shareperk/giftcard/view/whoow/${e._id}`} key={i}>
                <View
                  className="bg-white  justify-between flex-col items-center border-2 border-primary/10 rounded-lg overflow-hidden"
                  style={{ width: width / 2 - 28 }}
                >
                  <View />
                  <View className=" justify-center  items-center w-full">
                    <Image
                      width={width / 2 - 28 - 50}
                      height={100}
                      style={{ objectFit: "contain" }}
                      source={{
                        uri: e.previewImage,
                      }}
                    />
                  </View>
                  <View className=" justify-center items-center w-full">
                    {/* <View className="pb-4">
                      <Text className=" font-bold">Amazon</Text>
                    </View> */}
                    <View className="bg-primary w-full p-2">
                      <Text className="text-sm line-clamp-1 overflow-hidden text-center text-white">
                        {e.brandName}
                      </Text>
                    </View>
                  </View>
                </View>
              </Link>
            );
          })}
        </View>
      </ScrollView>
    </HeaderAppBar>
  );
};

export default GiftCard;
