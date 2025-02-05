import React from "react";
import InfoList from "../../widgets/InfoList";
import { router } from "expo-router";

function WalletNavigateList() {
  return (
    <>
      <InfoList
        title="Withdraw History"
        onPress={() => {
          router.push("/shareperk/payout/history");
        }}
      />
      <InfoList
        title="View Earning Details"
        onPress={() => {
          router.push("/shareperk/pages/walletinfo");
        }}
      />
      <InfoList
        title="Transfer History"
        onPress={() => {
          router.push("/shareperk/transitions");
        }}
      />
      <InfoList
        title="Help & Support"
        onPress={() => {
          router.push("/shareperk/pages/helpandsupport");
        }}
      />
    </>
  );
}

export default WalletNavigateList;
