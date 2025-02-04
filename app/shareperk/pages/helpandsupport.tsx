import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import HeaderAppBar from "../../../components/ui/HeaderAppBar";
import { Ionicons } from "@expo/vector-icons";

const HelpAndSupport = () => {
  const handleEmailPress = () => {
    Linking.openURL("mailto:support@example.com");
  };

  const handleCallPress = () => {
    Linking.openURL("tel:+1234567890");
  };

  const handleWhatsAppPress = () => {
    Linking.openURL("https://wa.me/1234567890");
  };

  return (
    <HeaderAppBar title="Help & Support">
      <View className="py-6 flex flex-col gap-4">
        <TouchableOpacity
          onPress={handleEmailPress}
          className="flex-row items-center p-4 bg-blue-500 rounded-lg"
        >
          <Ionicons name="mail" size={24} color="white" />
          <Text className="text-white text-lg font-medium ml-4">Email Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCallPress}
          className="flex-row items-center p-4 bg-green-500 rounded-lg"
        >
          <Ionicons name="call" size={24} color="white" />
          <Text className="text-white text-lg font-medium ml-4">Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleWhatsAppPress}
          className="flex-row items-center p-4 bg-teal-500 rounded-lg"
        >
          <Ionicons name="logo-whatsapp" size={24} color="white" />
          <Text className="text-white text-lg font-medium ml-4">
            WhatsApp Us
          </Text>
        </TouchableOpacity>
      </View>
    </HeaderAppBar>
  );
};

export default HelpAndSupport;
