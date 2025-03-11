import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  GestureResponderEvent,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import OfferBenifits from "../../../../../../components/ui/OfferBenifits";
import InfoList from "../../../../../../components/widgets/InfoList";
import OfferAbout from "../../../../../../components/widgets/OfferAbout";
import SampleBill from "../../../../../../components/widgets/SampleBill";
import SvgTie from "../../../../../../components/widgets/SvgTie";
import TextBoltList from "../../../../../../components/widgets/TextBoltList";
import { trackerLink } from "../../../../../../constants/appInfo";
import { SECONDARY_COLOR } from "../../../../../../constants/colors";
import { EARN_MORE } from "../../../../../../constants/images";
import useParelexScrollHook from "../../../../../../helper/hooks/useParelexScrollHook";
import { OfferData } from "../../../../../../interface/offer";
import { client } from "../../../../../../network/action";
import { loadOffers } from "../../../../../../network/worker/offer";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { setUserData } from "../../../../../../redux/slice/userSlice";
import { connectBroker } from "../../../../../../smallcase/smallcase";
const IMAGE_HEIGHT = 250;
import * as Clipboard from "expo-clipboard";
import Feather from "@expo/vector-icons/Feather";
import { toastConfig } from "@/constants/toaste-config";
import Toast from "react-native-toast-message";
const OfferView = () => {
  const [openOfferBenefits, setOfferBenefits] = useState(false);

  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [offersData, setOffersData] = useState<OfferData[]>([]);
  const navigation = useNavigation();

  const { imageStyle, scrollRef } = useParelexScrollHook({
    image_height: IMAGE_HEIGHT,
  });

  const pageData = useLocalSearchParams<{ id: string }>();

  const { width } = Dimensions.get("screen");

  const loadOffersData = async () => {
    try {
      setLoading(true);
      const offers = await loadOffers();
      const selected = offers.find((e) => e._id == pageData.id);
      const WithOutSelected = offers.filter((e) => e._id != pageData.id);
      if (selected) {
        setOffersData([selected, ...WithOutSelected]);
      }
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
    loadOffersData();
  }, []);

  const isUserHolding = () => {
    if (!user) {
      return false;
    }
    if (user.user.brokerConnected != true) {
      return false;
    }
    const isins = user?.holdings?.data.securities.map((e) => e.isin);
    return isins?.includes(offersData[index].stockISIN);
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white"
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
                uri: client.baseUrl + "/" + offersData[index].bannerImage,
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
              <View className="mt-5">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View className="flex-row gap-4 px-5 ">
                    {offersData.length !== 0 &&
                      offersData.map((offer, i) => (
                        <ViewOfferBox
                          isSelected={index === i}
                          key={`Offer-${i}`}
                          data={offer}
                          onPress={() => setIndex(i)}
                        />
                      ))}
                  </View>
                </ScrollView>
              </View>
              <OfferAbout
                text={offersData[index].aboutOffer}
                title="About Offer"
              />
              <SampleBill
                isHolding={isUserHolding()}
                type={offersData[index]?.commissionType}
                withHoldings={offersData[index]?.commissionRateWithHolding}
                withOutHolding={offersData[index]?.commissionRate}
              />
              <View className="px-5 mt-5">
                <InfoList
                  title="How To Redeem"
                  onPress={() => {
                    router.push("/shareperk/pages/howtoredeem");
                  }}
                />
                <InfoList
                  title="Offer Benefits"
                  onPress={() => {
                    router.push(
                      `/shareperk/pages/offers/view/${pageData.id}/offerbenifits`
                    );
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
        <View className="flex-row items-center justify-between w-full h-20 px-10 gap-3  bg-white border-t border-gray-200">
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
              className="border border-orange-300 px-3  py-3 w-[52%] rounded-xl"
            >
              <Text className="text-xs text-gray-800 text-center">
                Link your broker account {">"}
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              if (user) {
                Linking.openURL(
                  `${trackerLink}/tracker?type=offer&id=${offersData[index]._id}&user=${user?.user._id}`
                );
              } else {
                Linking.openURL(offersData[index].link);
              }
            }}
            className=" bg-orange-500 px-7 py-3 rounded-xl"
            style={{
              width: user?.user.brokerConnected || !user?.user ? "90%" : "35%",
            }}
          >
            <Text className="text-xs text-center font-bold text-white">
              View Offers
            </Text>
          </Pressable>

          <Pressable
            onPress={async () =>
              await Share.share({
                message: `🔥 SharePerks – Unlock & Share Exclusive Deals! 🔥

${trackerLink}/tracker?type=offer&id=${offersData[index]._id}&user=${user?.user._id}
                              
Save more, share perks, and enjoy exclusive rewards with friends! 🎁💰

📲 Get SharePerks now!

https://play.google.com/store/apps/details?id=com.shareperks
`,
              })
            }
            className="bg-secondary h-10 w-10 rounded-xl flex items-center justify-center"
          >
            <Feather name="share" size={18} color="white" />
          </Pressable>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default OfferView;

const ViewOfferBox = memo(
  ({
    data,
    isSelected,
    onPress,
  }: {
    data: OfferData;
    isSelected: boolean;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        className="border border-orange-300 w-80 rounded-2xl relative   bg-white"
      >
        <SvgTie width={84} height={40} text={data.linkText} />
        <View className="px-3">
          <Text className="text-gray-800 text-sm font-semibold">
            {data.offerTitle}
          </Text>
          <View className="border-gray-300/50 h-auto border p-2 gap-1 mb-3 mt-2 rounded-lg">
            <Text className="text-xs mb-2 line-clamp-3">{data.aboutOffer}</Text>
          </View>
        </View>
        {isSelected && (
          <View className="w-full h-6 justify-center items-center z-10 absolute bottom-1">
            <View className="bg-orange-400 h-6 px-3 rounded-lg justify-center items-center shadow-sm">
              <Text className="text-xs text-white font-bold">Selected</Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  }
);
