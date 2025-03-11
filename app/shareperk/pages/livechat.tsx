import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import WebView from "react-native-webview";

const LiveChat = () => {
  const [loading, setLoading] = useState(true);
  console.log(loading);

  return (
    <View className="flex-1 pt-10 bg-primary">
      <SafeAreaView className="flex-1 border-none ">
        {loading && (
          <View className=" h-screen absolute w-full z-40 top-0 right-0 flex-1 justify-center items-center bg-white">
            <ActivityIndicator size={40} color="#4E1680" />
          </View>
        )}
        <WebView
          className="border-none"
          source={{
            uri: "https://tawk.to/chat/67933d3e3a842732607438bc/1iibieg4g",
          }}
          containerStyle={{ flex: 1, backgroundColor: "#ffffff" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onLoadProgress={(progress) => {}}
          onError={(error) => {
            console.log(error);
            setLoading(false);
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default LiveChat;
