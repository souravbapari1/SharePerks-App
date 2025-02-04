import { View, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MAIN_COLOR } from "../../constants/colors";
import { client } from "../../network/action";
import WebView from "react-native-webview";

interface HtmlSheetProps {
  isVisible: boolean;
  data: string;
  onClose: () => void;
}

const HtmlSheet: React.FC<HtmlSheetProps> = ({ isVisible, onClose, data }) => {
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
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        <WebView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1, // Allow WebView to take up available space
          }}
          originWhitelist={["*"]}
          source={{
            html: `
        <html>
                <head>
                  <style>
                  
                   
                  </style>
                </head>
                <body>
                <div style="font-size: 36px; line-height: 58px;">

          ${data}
          </div>
                </body>
              </html>
            `,
          }}
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default HtmlSheet;
