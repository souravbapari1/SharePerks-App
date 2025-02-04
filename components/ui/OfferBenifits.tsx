import { View, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MAIN_COLOR } from "../../constants/colors";
import { client } from "../../network/action";
import WebView from "react-native-webview";

interface OfferBenifitsProps {
  data: string[];
  isVisible: boolean;
  onClose: () => void;
}

const OfferBenifits: React.FC<OfferBenifitsProps> = ({
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
      snapPoints={["50%", "90%", "90%"]}
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >
        <View>
          {data.map((e, i) => {
            return (
              <Text
                key={"ne" + i}
                className="mb-5 text-md text-gray-700 leading-7 bg-gray-50 p-5"
              >
                {e}
              </Text>
            );
          })}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default OfferBenifits;
