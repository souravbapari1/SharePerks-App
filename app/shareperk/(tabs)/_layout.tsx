import React, { memo } from "react";
import { Tabs } from "expo-router";
import BottamTab from "../../../components/widgets/BottamTab";

const HomeTabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(e) => <BottamTab {...e} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{ title: "Wallet", tabBarLabel: "Wallet" }}
      />
      <Tabs.Screen
        name="giftcard"
        options={{ title: "Gift Cards", tabBarLabel: "Gift Cards" }}
      />
      <Tabs.Screen
        name="user"
        options={{ title: "User", tabBarLabel: "User" }}
      />

      <Tabs.Screen
        name="refer"
        options={{ title: "Refer", tabBarLabel: "Refer" }}
      />
    </Tabs>
  );
};

export default memo(HomeTabsLayout);
