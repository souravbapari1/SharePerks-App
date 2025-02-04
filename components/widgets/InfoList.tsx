import React, { memo, ReactNode } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
function InfoList({
  className,
  title,
  onPress,
}: {
  title: string;
  className?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={
        "bg-orange-100 mt-6 rounded-2xl px-5 h-12 flex-row justify-between items-center " +
        className
      }
    >
      <Text className="text-sm font-semibold text-gray-800">{title}</Text>
      <MaterialIcons name="keyboard-arrow-down" size={24} color="#F5873B" />
    </Pressable>
  );
}

export default memo(InfoList);
