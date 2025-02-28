import {
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import Animated from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import useParelexScrollHook from "../../../../../helper/hooks/useParelexScrollHook";
import { loadBrand } from "../../../../../network/worker/brands";
import { loadIdByCoupon } from "../../../../../network/worker/coupon";
import { CouponData } from "../../../../../interface/coupon";
import { SECONDARY_COLOR } from "../../../../../constants/colors";
import { client } from "../../../../../network/action";
import { EARN_MORE } from "../../../../../constants/images";
import OfferAbout from "../../../../../components/widgets/OfferAbout";
import SampleBill from "../../../../../components/widgets/SampleBill";
import InfoList from "../../../../../components/widgets/InfoList";
import { connectBroker } from "../../../../../smallcase/smallcase";
import { setUserData } from "../../../../../redux/slice/userSlice";
import { trackerLink } from "../../../../../constants/appInfo";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../../../constants/toaste-config";
import { FontAwesome6 } from "@expo/vector-icons";
import HowToRedeem from "../../../../../components/ui/HowToRedem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TermsAndCounditions from "../../../../../components/ui/TermsAndCounditions";
import OfferBenifits from "../../../../../components/ui/OfferBenifits";
const IMAGE_HEIGHT = 250;
const BrandView = () => {
  const [openHowToRedeem, setOpenHowToRedeem] = useState(false);
  const [openTAQ, setOpenTAQ] = useState(false);
  const [openOfferBenefits, setOfferBenefits] = useState(false);

  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [CouponData, setCouponData] = useState<CouponData | null>(null);
  const navigation = useNavigation();

  const { imageStyle, scrollRef } = useParelexScrollHook({
    image_height: IMAGE_HEIGHT,
  });

  const pageData = useLocalSearchParams<{ id: string }>();

  const { width } = Dimensions.get("screen");

  const loadCouponData = async () => {
    try {
      setLoading(true);
      const brand = await loadIdByCoupon(pageData.id);
      setCouponData(brand);
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
    loadCouponData();
  }, []);
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      ...toastConfig,
      text1: "Copy to Clipboard",
      text2: "Coupon code successfully copied",
      type: "info",
    });
  };
  const isUserHolding = () => {
    if (!user) {
      return false;
    }
    if (user.user.brokerConnected != true) {
      return false;
    }
    const isins = user?.holdings?.data.securities.map((e) => e.isin);
    return isins?.includes(CouponData!.stockISIN);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View className="h-screen justify-center items-center bg-white">
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <Animated.Image
                style={[{ height: IMAGE_HEIGHT, width }, imageStyle]}
                className="bg-orange-50"
                source={{
                  uri: client.baseUrl + "/" + CouponData!.bannerImage,
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
                <View className=" border-dashed border-2 p-3 px-5 text-center border-orange-200 m-5 mt-10 rounded-xl flex-row justify-between items-center">
                  <Text className="text-xl font-extrabold text-center text-orange-950 ">
                    {CouponData?.code}
                  </Text>
                  <Pressable
                    className="text-orange-500"
                    onPress={() => {
                      copyToClipboard(CouponData?.code || "");
                    }}
                  >
                    <FontAwesome6
                      name="copy"
                      size={18}
                      color={SECONDARY_COLOR}
                    />
                  </Pressable>
                </View>
                <OfferAbout
                  text={CouponData!.aboutCoupon}
                  title="About Brand"
                />
                <SampleBill isHolding={isUserHolding()} />
                <View className="px-5 mt-5">
                  <InfoList
                    title="How To Redeem"
                    onPress={() => setOpenHowToRedeem(true)}
                  />
                  <InfoList
                    title="Offer Benefits"
                    onPress={() => {
                      setOfferBenefits(true);
                    }}
                  />
                  <InfoList
                    title="Terms & conditions"
                    onPress={() => setOpenTAQ(true)}
                  />
                </View>
              </View>
            </>
          )}
        </Animated.ScrollView>
        {!loading && (
          <View className="flex-row items-start justify-between h-20 px-8 py-3 bg-white border-t border-gray-200">
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
                    `${trackerLink}/tracker?type=coupon&id=${
                      CouponData!._id
                    }&user=${user?.user._id}`
                  );
                } else {
                  Linking.openURL(CouponData!.link);
                }
              }}
              className=" bg-orange-500 px-7 py-3 rounded-xl"
              style={{
                width:
                  user?.user.brokerConnected || !user?.user ? "100%" : "35%",
              }}
            >
              <Text className="text-xs text-center font-bold text-white">
                View Offers
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      <HowToRedeem
        isVisible={openHowToRedeem}
        onClose={() => {
          setOpenHowToRedeem(false);
        }}
      />
      <TermsAndCounditions
        isVisible={openTAQ}
        onClose={() => {
          setOpenTAQ(false);
        }}
      />
      <OfferBenifits
        data={CouponData?.couponKeyPoints || []}
        isVisible={openOfferBenefits}
        onClose={() => {
          setOfferBenefits(false);
        }}
      />
    </GestureHandlerRootView>
  );
};

export default BrandView;
