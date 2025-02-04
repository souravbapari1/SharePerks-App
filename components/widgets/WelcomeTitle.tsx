import { Text, View } from "react-native";

export const WelcomeTitle = () => {
  return (
    <View className="flex-row gap-2 mt-6 flex justify-center">
      <Text className="text-2xl text-gray-900">Welcome to</Text>
      <Text className=" text-2xl font-bold text-gray-800">SharePerks</Text>
    </View>
  );
};
