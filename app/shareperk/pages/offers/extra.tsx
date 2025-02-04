import React, { useEffect, useState } from "react";

import { useLocalSearchParams } from "expo-router";

import { ActivityIndicator, Text, View } from "react-native";
import { OfferData } from "../../../../interface/offer";
import SortOffers, {
  SelectFilterValue,
} from "../../../../components/ui/SortOffers";
import { loadOffers } from "../../../../network/worker/offer";
import HeaderAppBar from "../../../../components/ui/HeaderAppBar";
import ViewOfferBox from "../../../../components/widgets/ViewOfferBox";

export type CategoryParams = { category?: string; name: string };

function CategoryOffers() {
  const [data, setData] = useState<OfferData[]>([]);
  const [SortData, setSortData] = useState<OfferData[]>([]);

  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SelectFilterValue>("all");
  const params = useLocalSearchParams<CategoryParams>();
  const loadOffer = async () => {
    try {
      setLoading(true);
      const offerData = await loadOffers();
      setData(offerData);
      setSortData(offerData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function sortByName(arr: OfferData[]): OfferData[] {
    return arr.sort((a, b) => a.offerTitle.localeCompare(b.offerTitle));
  }

  function sortItemsByClicks(arr: OfferData[]): OfferData[] {
    return arr.sort((a, b) => {
      const clicksA = a.clicks ?? 0;
      const clicksB = b.clicks ?? 0;
      return clicksB - clicksA;
    });
  }

  function sortByAmount(arr: OfferData[]): OfferData[] {
    return arr.filter((e) => e.commissionType == "AMOUNT");
  }

  function sortByPercent(arr: OfferData[]): OfferData[] {
    return arr.filter((e) => e.commissionType == "PERCENT");
  }

  useEffect(() => {
    loadOffer();
  }, []);

  useEffect(() => {
    if (sortBy == "all") {
      setSortData(data);
    }
    if (sortBy == "atoz") {
      const sort = sortByName(data);
      setSortData(sort);
    }
    if (sortBy == "percent") {
      const sort = sortByPercent(data);
      setSortData(sort);
    }
    if (sortBy == "amount") {
      const sort = sortByAmount(data);
      setSortData(sort);
    }
    if (sortBy == "popular") {
      const sort = sortItemsByClicks(data);
      setSortData(sort);
    }
  }, [sortBy]);

  if (loading || SortData.length == 0) {
    return (
      <HeaderAppBar title={params.name}>
        <SortOffers onChange={setSortBy} />
        <View className=" flex-1 mt-2 pb-56 justify-center items-center">
          {SortData.length == 0 ? (
            <Text>No Offers Found!</Text>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </HeaderAppBar>
    );
  }

  return (
    <HeaderAppBar title={params.name}>
      <SortOffers onChange={setSortBy} />
      <View className=" items-start mt-2 pb-14">
        <View className="flex-row mt-4 gap-3 flex-wrap justify-between items-start">
          {SortData.map((e, i) => {
            return <ViewOfferBox data={e} key={e._id} />;
          })}
        </View>
      </View>
    </HeaderAppBar>
  );
}

export default CategoryOffers;
