import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

import { REFER_Page } from "../../../constants/images";
import TextBoltList from "../../../components/widgets/TextBoltList";
import ReferWork from "../../../components/sections/refer/ReferWork";

const ReferPage = () => {
  return (
    <View style={{ backgroundColor: "#092D60", paddingTop: 70, flex: 1 }}>
      <View className="px-10 mt-2">
        <Text className="text-2xl font-bold text-white">Refer and earn</Text>
        <Text className="text-md mt-3 text-white">
          Invite your friend and get ₹100 each
        </Text>
      </View>
      <Image
        source={REFER_Page}
        className="w-screen h-96"
        style={{ objectFit: "contain" }}
      />
      <ScrollView
        className="flex-1 bg-white rounded-t-3xl  -mt-12 p-8 "
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* all logics on here  */}
        <ReferWork />

        <Text className="text-xl text-gray-800 mt-10 font-bold">
          How it works
        </Text>
        <View className="border-orange-300/35 border rounded-xl relative mt-3 p-4 bg-white gap-5 mb-20">
          <TextBoltList>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            quibusdam numquam odio in corrupti illo ab magnam beatae dicta,
            facilis doloribus natus, repellat molestias a fugit iusto ipsa
            suscipit sint.
          </TextBoltList>
          <TextBoltList>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            quibusdam numquam odio in corrupti illo ab magnam beatae dicta,
            facilis doloribus natus, repellat molestias a fugit iusto ipsa
            suscipit sint.
          </TextBoltList>
          <TextBoltList>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            quibusdam numquam odio in corrupti illo ab magnam beatae dicta,
            facilis doloribus natus, repellat molestias a fugit iusto ipsa
            suscipit sint.
          </TextBoltList>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferPage;
