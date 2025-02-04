import { View, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MAIN_COLOR } from "../../constants/colors";

import { CashBackRate, OfferTerm } from "../../interface/feed";

interface OfferTermsProps {
  data: OfferTerm[];
  isVisible: boolean;
  onClose: () => void;
}

const OfferTerms: React.FC<OfferTermsProps> = ({
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
        <View className="mt-5">
          {data.map((e, i) => {
            return (
              <View className="mb-4" key={e.title + i}>
                <Text className="font-bold text-md mb-3">{e.title}</Text>
                {e.content.map((v, i) => {
                  return (
                    <Text key={"content-" + i} className="text-gray-600 mb-3">
                      {v}
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default OfferTerms;
