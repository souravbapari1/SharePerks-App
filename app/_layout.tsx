import React, { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Toast from "react-native-toast-message";
import { ConfigSmallCaseENV } from "../smallcase/smallcase";
import { MAIN_COLOR } from "../constants/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const RootLayout = () => {
  useEffect(() => {
    ConfigSmallCaseENV();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerShown: false,
            contentStyle: { backgroundColor: MAIN_COLOR, height: "100%" },
          }}
        />
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
};

export default RootLayout;
