import { View, Text, Image } from "react-native";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "expo-router";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const GiftCardBox = () => {
  const state = useAppSelector((e) => e.feedSlice);
  return (
    <View className="flex-row justify-between items-center flex-wrap gap-5 px-5">
      {/* // render whoow  */}
      {state.data?.homeGiftCards?.whoohcards?.map((e, i) => {
        return (
          <Link href={`/shareperk/giftcard/view/whoow/${e._id}`} key={i}>
            <View
              className="bg-white  justify-between flex-col items-center border-2 border-primary/10 rounded-lg overflow-hidden"
              style={{ width: SCREEN_WIDTH / 2 - 28 }}
            >
              <View />
              <View className=" justify-center  items-center w-full">
                <Image
                  width={SCREEN_WIDTH / 2 - 28 - 50}
                  height={100}
                  style={{ objectFit: "contain" }}
                  source={{
                    uri: e.previewImage,
                  }}
                />
              </View>
              <View className=" justify-center items-center w-full">
                {/* <View className="pb-4">
                            <Text className=" font-bold">Amazon</Text>
                          </View> */}
                <View className="bg-primary w-full p-2">
                  <Text className="text-sm line-clamp-1 overflow-hidden text-center text-white">
                    {e.brandName}
                  </Text>
                </View>
              </View>
            </View>
          </Link>
        );
      })}

      {/* // render gifter  */}
      {state.data?.homeGiftCards?.gifterCards?.map((e, i) => {
        return (
          <Link href={`/shareperk/giftcard/view/gifter/${e._id}`} key={i}>
            <View
              className="bg-white  justify-between flex-col items-center border-2 border-primary/10 rounded-lg overflow-hidden"
              style={{ width: SCREEN_WIDTH / 2 - 28 }}
            >
              <View />
              <View className=" justify-center  items-center w-full">
                <Image
                  width={SCREEN_WIDTH / 2 - 28 - 50}
                  height={100}
                  style={{ objectFit: "contain" }}
                  source={{
                    uri: e.previewImage,
                  }}
                />
              </View>
              <View className=" justify-center items-center w-full">
                {/* <View className="pb-4">
                              <Text className=" font-bold">Amazon</Text>
                            </View> */}
                <View className="bg-primary w-full p-2">
                  <Text className="text-sm line-clamp-1 overflow-hidden text-center text-white">
                    {e.brandName}
                  </Text>
                </View>
              </View>
            </View>
          </Link>
        );
      })}
    </View>
  );
};

export default GiftCardBox;
