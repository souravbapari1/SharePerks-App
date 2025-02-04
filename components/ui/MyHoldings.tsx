import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MAIN_COLOR } from "../../constants/colors";

import { useAppSelector } from "../../redux/hooks";
import { router } from "expo-router";
import { navigate } from "../../utils/navigate";

interface MyHoldingsProps {
  isVisible: boolean;
  onClose: () => void;
}

const MyHoldings: React.FC<MyHoldingsProps> = ({ isVisible, onClose }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user } = useAppSelector((e) => e.userSlice);
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
      index={isVisible ? 0 : -1} // Open or close based on isVisible
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
        {user?.holdings?.data.securities.map((e) => {
          return (
            <TouchableOpacity
              key={e.isin}
              onPress={() => {
                navigate({
                  pathname: ("/shareperk/pages/offers/broker/" + e.isin) as any,
                  params: {
                    name: e.name,
                  },
                });
              }}
            >
              <View className="flex-row justify-between py-3 bg-gray-50 mb-2 rounded-xl px-4">
                <Text className="font-semibold text-gray-600">{e.name}</Text>
                <Text className="text-gray-800 font-bold">
                  {e.transactableQuantity}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default MyHoldings;
