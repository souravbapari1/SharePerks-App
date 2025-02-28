import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import BrandsView from "../../../components/sections/home/BrandsView";
import CouponCodesList from "../../../components/sections/home/CuponCodesList";
import ExtraCashBackOffer from "../../../components/sections/home/ExtraCashBackOffer";
import OfferFromWallet from "../../../components/sections/home/OfferFromWallet";
import TopCategories from "../../../components/sections/home/TopCategories";
import TopOffersSlide from "../../../components/sections/home/TopOffersSlide";
import HomeNavUi from "../../../components/ui/HomeNavUi";
import ReferBox from "../../../components/widgets/ReferBox";
import TitleBar from "../../../components/widgets/TitleBar";
import { loadFeeds } from "../../../network/worker/feed";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setFeed } from "../../../redux/slice/feedSlice";
import { navigate } from "../../../utils/navigate";
import GiftCardBox from "@/components/sections/home/GiftCardBox";

const Home = () => {
  const state = useAppSelector((e) => e.feedSlice);
  const userState = useAppSelector((e) => e.userSlice);

  const dispatch = useAppDispatch();

  const loadHomeFeed = async () => {
    if (state.data == null) {
      const data = await loadFeeds(userState.user?.user._id);
      dispatch(setFeed(data));
    }
  };

  useEffect(() => {
    loadHomeFeed();
  }, [state]);

  if (state.data == null) {
    return (
      <HomeNavUi>
        <View className="justify-center flex-1 h-[80vh] items-center">
          <ActivityIndicator />
        </View>
      </HomeNavUi>
    );
  }

  return (
    <HomeNavUi>
      <View className="min-h-[60vh] ">
        {/* === Top Offer Start === */}
        <View className="mt-8">
          <TitleBar
            title="Top Offers"
            subTitle="View All"
            onPress={() =>
              navigate({
                pathname: "/shareperk/pages/offers/topoffers",
              })
            }
          />
          <TopOffersSlide />
        </View>
        {/* === Top Offer End === */}
        {/* --------------------------- */}
        {/* === Categories Start === */}
        <View className="mt-8">
          <TitleBar title="Top Categories" />
          <TopCategories />
        </View>
        {/* === Categories End === */}
        {/* --------------------------- */}
        {/* === Extra CashBack Offer Start === */}
        <View className="mt-8">
          <TitleBar
            title="Extra CashBack Offer"
            subTitle="View All"
            onPress={() =>
              navigate({
                pathname: "/shareperk/pages/offers/extra",
              })
            }
          />
          <ExtraCashBackOffer />
        </View>
        {state.data.offerFromWallet &&
          userState.user?.user.brokerConnected == true &&
          state?.data?.offerFromWallet?.length != 0 && (
            <View className="mt-8">
              <TitleBar
                title="Offer From Wallet"
                subTitle="View All"
                onPress={() =>
                  navigate({
                    pathname: "/shareperk/pages/offers/wallet",
                  })
                }
              />
              <OfferFromWallet />
            </View>
          )}
        {/* === Extra CashBack Offer End === */}
        {/* --------------------------- */}
        {/* === Your favorite brand Start === */}
        <View className="mt-8">
          <TitleBar title="Your favorite brand" />
          <BrandsView />
        </View>
        {/* === Your favorite brand End === */}
        {/* --------------------------- */}

        {/* === Gift Card Box Start === */}
        {userState.user && (
          <View className="mt-8">
            <TitleBar title="Hot Gift Cards" />
            <GiftCardBox />
          </View>
        )}
        {/* === Refer Box Start === */}
        {userState.user && (
          <View>
            <ReferBox />
          </View>
        )}
        {/* === Refer Box End === */}

        {/* === Gift Card Box End === */}
      </View>
      {state.data.coupons.length != 0 && <CouponCodesList />}
    </HomeNavUi>
  );
};

export default Home;
