import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { oneSignalAppId } from "../constants/appInfo";
import SplashScreen from "./splash";
import MyHoldings from "./shareperk/pages/myholdings";

const Index = () => {
  // // Also need enable notifications to complete OneSignal setup
  const requestPermission = async () => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(oneSignalAppId);
    const hasAskedBefore = await AsyncStorage.getItem("hasAskedForPermission");

    if (!hasAskedBefore) {
      OneSignal.Notifications.canRequestPermission().then(
        async (canRequest: boolean) => {
          if (canRequest) {
            await AsyncStorage.setItem("hasAskedForPermission", "true");
            OneSignal.Notifications.requestPermission(true);
            console.log("Permission requested");
          }
        }
      );
      // Store a flag in AsyncStorage to prevent future prompts
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return <SplashScreen />;
  // return <MyHoldings />;
};
export default Index;
