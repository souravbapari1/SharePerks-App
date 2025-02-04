import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React from "react";
import { OfferData } from "../../interface/offer";
import { client } from "../../network/action";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const ViewOfferBox = ({ data }: { data: OfferData }) => {
  const { width } = Dimensions.get("screen");
  return (
    <Pressable
      onPress={() => {
        router.push(`/shareperk/pages/offers/view/${data._id}`);
      }}
      key={"brand-" + data._id}
      style={{ height: 150, width: width / 2 - 25 }}
      className="h-16 w-12 bg-gray-50 relative shadow rounded-3xl flex-shrink-0 overflow-hidden"
    >
      <Image
        className="flex-1 object-fill h-full"
        source={{
          uri: client.baseUrl + "/" + data.offerImage,
        }}
      />
      <View className="absolute top-0 left-0 w-full h-full  flex items-center justify-center">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          colors={["#F5873B", "#F36565"]}
          style={{
            height: 30,
            width: width / 2 - 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 90,
          }}
        >
          <Text className="text-xs text-white font-bold line-clamp-1 overflow-hidden">
            {data.linkText} {">"}
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

export default ViewOfferBox;
