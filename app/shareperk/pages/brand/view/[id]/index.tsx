import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import InfoList from "../../../../../../components/widgets/InfoList";
import OfferAbout from "../../../../../../components/widgets/OfferAbout";
import SampleBill from "../../../../../../components/widgets/SampleBill";
import { trackerLink } from "../../../../../../constants/appInfo";
import { SECONDARY_COLOR } from "../../../../../../constants/colors";
import { EARN_MORE } from "../../../../../../constants/images";
import useParelexScrollHook from "../../../../../../helper/hooks/useParelexScrollHook";
import { Brand } from "../../../../../../interface/feed";
import { client } from "../../../../../../network/action";
import { loadBrand } from "../../../../../../network/worker/brands";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { setUserData } from "../../../../../../redux/slice/userSlice";
import { connectBroker } from "../../../../../../smallcase/smallcase";
const IMAGE_HEIGHT = 250;
const BrandView = () => {
  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [brandData, setBrandData] = useState<Brand | null>(null);
  const navigation = useNavigation();

  const { imageStyle, scrollRef } = useParelexScrollHook({
    image_height: IMAGE_HEIGHT,
  });

  const pageData = useLocalSearchParams<{ id: string }>();

  const { width } = Dimensions.get("screen");

  const loadBrandData = async () => {
    try {
      setLoading(true);
      const brand = await loadBrand(pageData.id);
      setBrandData(brand);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      title: "",
      headerTintColor: SECONDARY_COLOR,
    });
  }, [navigation]);

  useEffect(() => {
    loadBrandData();
  }, []);

  const isUserHolding = () => {
    if (!user) {
      return false;
    }
    if (user.user.brokerConnected != true) {
      return false;
    }
    const isins = user.holdings?.data.securities.map((e) => e.isin);
    return isins?.includes(brandData!.stockISIN);
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className={"flex-1 bg-white"}
      >
        {loading ? (
          <View className="h-screen justify-center items-center bg-white">
            <ActivityIndicator color={SECONDARY_COLOR} size="large" />
          </View>
        ) : (
          <>
            <Animated.Image
              style={[{ height: IMAGE_HEIGHT, width }, imageStyle]}
              className="bg-orange-50"
              source={{
                uri: client.baseUrl + "/" + brandData!.bannerImage,
              }}
            />
            <View className="pb-10 bg-white -mt-5 rounded-t-3xl ">
              {isUserHolding() && (
                <View className="pt-5 py-2 pl-5">
                  <Image
                    source={EARN_MORE}
                    width={100}
                    height={20}
                    style={{ width: 200, height: 50, objectFit: "contain" }}
                  />
                </View>
              )}

              <OfferAbout text={brandData!.aboutBrand} title="About Brand" />
              <SampleBill />
              <View className="px-5 mt-5">
                <InfoList
                  title="How To Redeem"
                  onPress={() => {
                    router.push("/shareperk/pages/howtoredeem");
                  }}
                />

                <InfoList
                  title="CashBack Rates"
                  onPress={() => {
                    router.push({
                      pathname:
                        `/shareperk/pages/brand/view/${pageData.id}/infoview` as any,
                      params: {
                        key: "cashBackRates" as keyof Brand,
                        title: "Cash Back Rates",
                      },
                    });
                  }}
                />
                <InfoList
                  title="Offer Terms"
                  onPress={() => {
                    router.push({
                      pathname:
                        `/shareperk/pages/brand/view/${pageData.id}/infoview` as any,
                      params: {
                        key: "offerTerms" as keyof Brand,
                        title: "Offer Terms",
                      },
                    });
                  }}
                />
                <InfoList
                  title="Terms & conditions"
                  onPress={() => {
                    router.push("/shareperk/pages/termsandcondisions");
                  }}
                />
              </View>
            </View>
          </>
        )}
      </Animated.ScrollView>
      {!loading && (
        <View className="flex-row items-center justify-between h-20 px-8 py-3 bg-white border-t border-gray-200">
          {user?.user.brokerConnected == false && (
            <Pressable
              onPress={async () => {
                try {
                  const userData = await connectBroker();
                  dispatch(setUserData(userData));
                } catch (error) {
                  console.log(error);
                }
              }}
              className="border border-orange-300 px-6 py-3 w-[55%] rounded-xl"
            >
              <Text className="text-xs text-gray-800">
                Link your broker account {">"}
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              if (user) {
                Linking.openURL(
                  `${trackerLink}/tracker?type=brand&id=${
                    brandData!._id
                  }&user=${user?.user._id}`
                );
              } else {
                Linking.openURL(brandData!.linkUrl);
              }
            }}
            className=" bg-orange-500 px-7 py-3 rounded-xl"
            style={{
              width: user?.user.brokerConnected || !user?.user ? "100%" : "35%",
            }}
          >
            <Text className="text-xs text-center font-bold text-white">
              View Offers
            </Text>
          </Pressable>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default BrandView;
