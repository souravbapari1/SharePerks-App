import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderAppBar from "../../../../../components/ui/HeaderAppBar";
import { router, useLocalSearchParams } from "expo-router";
import { searchBrand } from "../../../../../network/worker/brands";
import { Brand } from "../../../../../interface/feed";
import { client } from "../../../../../network/action";

const index = () => {
  const pageData = useLocalSearchParams<{ query: string }>();

  const [data, setdata] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const loadBrands = async () => {
    try {
      setLoading(true);
      const brands = await searchBrand(pageData.query);
      setdata(brands);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  return (
    <HeaderAppBar title={pageData.query}>
      <ScrollView
        className="pt-5 "
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View className="h-96 justify-center items-center">
            <ActivityIndicator />
          </View>
        )}
        {!loading && data.length == 0 && (
          <View className="h-96 justify-center items-center">
            <Text>No Brands Found</Text>
          </View>
        )}
        <View className="flex flex-row flex-wrap gap-5 items-center justify-center">
          {data.map((e) => {
            return (
              <Pressable
                onPress={() => {
                  router.push(`/shareperk/pages/brand/view/${e._id}`);
                }}
                key={e._id}
                className="w-[45%] h-44 rounded-2xl overflow-hidden border-2 border-gray-300 "
              >
                <Image
                  className="flex-1 object-fill h-full"
                  source={{
                    uri: client.baseUrl + "/" + e.brandImage,
                  }}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </HeaderAppBar>
  );
};

export default index;
