import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ReferPage from "../pages/refer";
import { useAppSelector } from "../../../redux/hooks";
import { router } from "expo-router";

const Refer = () => {
  const { user } = useAppSelector((e) => e.userSlice);
  useEffect(() => {
    if (user == null) {
      router.replace("/auth");
    }
  }, []);

  if (!user) {
    return <></>;
  }
  return <ReferPage />;
};

export default Refer;
