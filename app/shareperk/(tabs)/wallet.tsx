import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import WalletBox from "../../../components/sections/wallet/WalletBox";
import WalletNavigateList from "../../../components/sections/wallet/WalletNavigateList";
import { useAppSelector } from "../../../redux/hooks";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyHoldings from "../../../components/ui/MyHoldings";
import * as LocalAuthentication from "expo-local-authentication";
const Wallet = () => {
  const { user } = useAppSelector((e) => e.userSlice);
  useEffect(() => {
    if (user == null) {
      router.replace("/auth");
    }
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <GestureHandlerRootView>
      <HeaderAppBar title="My wallet">
        <WalletBox
          onViewHoldingPress={async () => {
            const auth = await LocalAuthentication.authenticateAsync();
            if (!auth.success) {
              return false;
            }
            router.push("/shareperk/pages/myholdings");
          }}
        />
        <WalletNavigateList />
      </HeaderAppBar>
    </GestureHandlerRootView>
  );
};

export default Wallet;
