import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import React from "react";

const TitleBar = ({
  onPress,
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  return (
    <View className="flex-row justify-between items-center mx-6  mb-3">
      <Text className="titleHome capitalize">{title}</Text>
      {subTitle && (
        <Pressable onPress={onPress}>
          <Text className="text-gray-600 font-medium">{subTitle}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default TitleBar;
