import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { SECONDARY_COLOR } from "../../constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
<MaterialCommunityIcons
  name="check-decagram-outline"
  size={24}
  color="black"
/>;
const TextBoltList = ({
  children,
  icon = "lightning-bolt-outline",
}: {
  children: string;
  icon?: "check-decagram-outline" | "lightning-bolt-outline";
}) => {
  return (
    <View className="flex-row gap-3 ">
      <MaterialCommunityIcons name={icon} size={20} color={SECONDARY_COLOR} />
      <Text className="text-xs text-gray-700 mr-10 ">{children}</Text>
    </View>
  );
};

export default TextBoltList;
