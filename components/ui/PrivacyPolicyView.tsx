import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MAIN_COLOR } from "../../constants/colors";
import { client } from "../../network/action";
import WebView from "react-native-webview";

interface PrivacyPolicyProps {
  isVisible: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  isVisible,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await client
        .get("/api/v1/appcontent/privacy-policy")
        .send<{ data: string }>();
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose(); // Call the onClose function when the sheet is closed
      }
    },
    [onClose]
  );

  useEffect(() => {
    loadData();
  }, []);

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
                  
                    h1 {
                      font-size: 45px;
                      color: #4CAF50;
                      text-align: center;
                      margin-bottom: 20px;
                    }
                    p {
                      font-size: 25px;
                      color: #555;
                      text-align: justify;
                      margin: 10px 0;
                    }
                   
                  </style>
                </head>
                <body>
          ${data}
                </body>
              </html>
            `,
          }}
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default PrivacyPolicy;
