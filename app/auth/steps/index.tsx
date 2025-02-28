import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import PagerView from "react-native-pager-view";
import { router } from "expo-router";

const StepsView = () => {
  const pageViewRef = useRef<PagerView>(null);
  const { width } = Dimensions.get("screen");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 30 }}>
      <PagerView
        scrollEnabled={false}
        style={{ flex: 1 }}
        initialPage={0}
        ref={pageViewRef}
      >
        {data.map((e, i) => {
          return (
            <View
              className="flex-1 p-8 mb-10 justify-between items-center"
              key={"step-" + i}
            >
              <Text className="text-xl font-bold text-blue-950">
                {e.topTitle}
              </Text>
              <Image
                source={e.image}
                className="mt-10"
                style={{
                  width: width - 100,
                  height: width / 1.3,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
              <View className="authBox  ">
                <Text className="text-2xl text-blue-800 font-bold uppercase">
                  {e.title}
                </Text>
                <View className="border-b border-gray-200 mt-5 mb-4"></View>
                <Text className="text-lg font-semibold text-blue-950">
                  {e.desc}
                </Text>
                <Text className="text-gray-600 mt-3">{e.content}</Text>
                <View className="flex-row mt-6 justify-between items-center">
                  {data.length - 1 == i ? (
                    <View></View>
                  ) : (
                    <Pressable
                      onPress={() => {
                        router.replace("/auth/setup");
                      }}
                    >
                      <Text>Skip</Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() => {
                      if (data.length - 1 != i) {
                        pageViewRef.current?.setPage(i + 1);
                      } else {
                        router.replace("/auth/setup");
                      }
                    }}
                    className="w-20 h-11 bg-blue-900  justify-center items-center rounded-xl"
                  >
                    <Text className="font-semibold text-white">Next</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </PagerView>
    </SafeAreaView>
  );
};

export default StepsView;

const data = [
  {
    topTitle: "Let’s get started in 3 easy steps!",
    title: "01   Connect",
    image: require("@/assets/steps/step1.png"),
    desc: "Connect your brokerage to browse rewards",
    content:
      "Get started by linking your brokerage account via Plaid. This allows us to verify your ownership and show you tailored benefits.",
  },
  {
    topTitle: "",

    title: "02   Browse",
    image: require("@/assets/steps/step2.png"),
    desc: "Browse shareholder rewards & benefits",
    content:
      "Once we've verified your ownership, you'll be able to browse through personalized benefits and rewards based on the companies you own.",
  },
  {
    topTitle: "",

    title: "03   Redeem",
    image: require("@/assets/steps/step3.png"),
    desc: "View and redeem eligible perks",
    content:
      "When you find a benefit or reward you want to redeem, easily redeem it through our platform; we'll take care of the rest. It's that simple.",
  },
];
