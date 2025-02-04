import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import { MAIN_COLOR } from "../../constants/colors";
import { cn } from "../../lib/cn";

const HeaderAppBar = ({
  title,
  children,
  bottomAction,
  action,
  loading,
  className,
}: {
  title: string;
  children?: ReactNode;
  bottomAction?: ReactNode;
  action?: ReactNode;
  loading?: boolean;
  className?: string;
}) => {
  const { canGoBack, back } = router;
  return (
    <View className="justify-between w-full flex-1 items-center">
      <View className="flex-1 bg-white w-full">
        <View
          style={{ height: 160, backgroundColor: MAIN_COLOR, paddingTop: 55 }}
          className="px-8 flex flex-row  justify-between items-center pb-12"
        >
          <StatusBar barStyle="light-content" />
          <View className="flex flex-row items-center">
            <SimpleLineIcons
              name="arrow-right"
              size={14}
              color="#fff"
              className="py-4 pr-4"
              onPress={() => {
                if (canGoBack()) {
                  back();
                }
              }}
            />
            <Text className="text-white font-normal text-xl">{title}</Text>
          </View>
          {action}
        </View>
        <View
          className={cn(
            "flex-1 bg-white rounded-t-3xl -mt-7 p-5 min-h-screen",
            className
          )}
        >
          {loading ? (
            <View className="h-96 items-center justify-center">
              <ActivityIndicator color={MAIN_COLOR} />
            </View>
          ) : (
            children
          )}
        </View>
      </View>
      {bottomAction}
    </View>
  );
};

export default HeaderAppBar;
