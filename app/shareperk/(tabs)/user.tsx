import { View } from "react-native";
import React, { useEffect, useState } from "react";

import UserHeader from "../../../components/sections/user/UserHeader";
import UserNavigateList from "../../../components/sections/user/UserNavigateList";
import { useAppSelector } from "../../../redux/hooks";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PrivacyPolicy from "../../../components/ui/PrivacyPolicyView";

const User = () => {
  const { user } = useAppSelector((e) => e.userSlice);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  useEffect(() => {
    if (user == null) {
      router.replace("/auth");
    }
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <UserHeader />
        <UserNavigateList onOpenPolicy={setOpenPrivacy} />
      </View>
      <PrivacyPolicy
        isVisible={openPrivacy}
        onClose={() => {
          setOpenPrivacy(false);
        }}
      />
    </GestureHandlerRootView>
  );
};

export default User;
