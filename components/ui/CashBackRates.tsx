import { View, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MAIN_COLOR } from "../../constants/colors";
import { client } from "../../network/action";
import WebView from "react-native-webview";
import { CashBackRate } from "../../interface/feed";

interface CashbackRatesProps {
  data: CashBackRate[];
  isVisible: boolean;
  onClose: () => void;
}

const CashbackRates: React.FC<CashbackRatesProps> = ({
  isVisible,
  onClose,
  data,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose(); // Call the onClose function when the sheet is closed
      }
    },
    [onClose]
  );

  return (
    <BottomSheet
      enablePanDownToClose={true}
      enableHandlePanningGesture={true}
      enableOverDrag={true}
      snapPoints={["50%", "90%", "100%"]}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={isVisible ? 1 : -1} // Open or close based on isVisible
      handleIndicatorStyle={{ backgroundColor: MAIN_COLOR }}
      handleStyle={{
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >
        <View>
          {data.map((e, i) => {
            return (
              <View
                className="gap-4 justify-start items-center flex-row"
                key={e.title + i}
              >
                <View className="justify-center  items-center text-center p-2 rounded-lg bg-gray-100">
                  <Text className="font-bold ">{e.value}%</Text>
                </View>
                <Text className=" text-md text-gray-700 leading-7 s">
                  {e.title}
                </Text>
              </View>
            );
          })}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default CashbackRates;
