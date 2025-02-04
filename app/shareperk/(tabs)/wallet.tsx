import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import WalletBox from "../../../components/sections/wallet/WalletBox";
import WalletNavigateList from "../../../components/sections/wallet/WalletNavigateList";
import { useAppSelector } from "../../../redux/hooks";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyHoldings from "../../../components/ui/MyHoldings";

const Wallet = () => {
  const [openMyHoldings, setOpenMyHoldings] = useState(false);
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
        <WalletBox onViewHoldingPress={() => setOpenMyHoldings(true)} />
        <WalletNavigateList />
      </HeaderAppBar>
      <MyHoldings
        isVisible={openMyHoldings}
        onClose={() => {
          setOpenMyHoldings(false);
        }}
      />
    </GestureHandlerRootView>
  );
};

export default Wallet;
