import { View, Text } from "react-native";
import React from "react";
import TextBoltList from "../widgets/TextBoltList";

const OfferAbout = ({ text, title }: { text: string; title?: string }) => {
  return (
    <View className="px-5 mt-6">
      <Text className="titleHome mb-1">{title || "About the brand"}</Text>
      <View className="rounded-xl border  border-orange-300 p-3 mt-2  bg-white">
        <TextBoltList icon="check-decagram-outline">{text}</TextBoltList>
      </View>
    </View>
  );
};

export default OfferAbout;
