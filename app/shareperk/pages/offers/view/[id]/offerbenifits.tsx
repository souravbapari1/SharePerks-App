import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import WebView from "react-native-webview";
import { client } from "../../../../../../network/action";
import { SECONDARY_COLOR } from "../../../../../../constants/colors";
import { loadOfferById } from "../../../../../../network/worker/offer";

const OfferBenifits = () => {
  const navigate = useNavigation();
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);
  const pageData = useLocalSearchParams<{ id: string }>();
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await loadOfferById(pageData.id);
      setData(res.offerKeyPoints);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    navigate.setOptions({
      headerShown: true,
      title: "Offer Benefits",
      headerLeft: () => (
        <Ionicons
          name="chevron-back"
          size={24}
          color={SECONDARY_COLOR}
          className="pr-5"
          onPress={() => navigate.goBack()}
        />
      ),
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: "#fff",
      },
    });
    loadData();
  }, [navigate]);
  return (
    <View className="flex-1 bg-white">
      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={SECONDARY_COLOR} />
        </View>
      )}
      {!loading && (
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
                  body{padding:30px}
                    h1 {
                      font-size: 45px;
                      color: #4CAF50;
                      text-align: center;
                      margin-bottom: 20px;
                    }
                    p {
                      font-size: 35px;
                      color: #555;
                      text-align: justify;
                      margin: 10px 0;
                    }
                  </style>
                </head>
                <body>
          ${data?.toString()}
                </body>
              </html>
            `,
          }}
        />
      )}
    </View>
  );
};

export default OfferBenifits;
