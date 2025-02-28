import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const LiveChat = () => {
  return (
    <View className="flex-1 pt-10 bg-primary">
      <SafeAreaView className="flex-1 border-none bg-white">
        <WebView
          className="border-none"
          source={{
            uri: "https://tawk.to/chat/67933d3e3a842732607438bc/1iibieg4g",
          }}
          containerStyle={{ flex: 1, backgroundColor: "#ffffff" }}
          renderLoading={() => (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size={30} color="#4E1680" />
            </View>
          )}
          onError={(error) => {
            console.log(error);
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default LiveChat;
