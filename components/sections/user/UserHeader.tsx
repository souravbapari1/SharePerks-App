import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { MAIN_COLOR } from "../../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "../../../redux/hooks";
import Toast from "react-native-toast-message";
import { client, UserAuthToken } from "../../../network/action";

function UserHeader() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { user } = useAppSelector((e) => e.userSlice);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setImage(selectedImage);
        await handleUpload(selectedImage);
        Toast.show({
          type: "success",
          text1: "Image Updated Successfully",
        });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Toast.show({
        type: "error",
        text1: "Error Picking Image",
        text2: "Something went wrong.",
      });
    }
  };

  const handleUpload = async (selectedImage: ImagePicker.ImagePickerAsset) => {
    try {
      const token = await UserAuthToken();
      const formData = new FormData();

      // Append image data
      formData.append("image", {
        uri: selectedImage.uri,
        name: selectedImage.uri.split("/").pop(),
        type: "image/jpeg", // Adjust if needed (e.g., "image/png")
      } as any);

      // Upload using fetch
      const response = await fetch(`${client.baseUrl}/api/v1/user`, {
        method: "PUT",
        headers: {
          ...token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      console.log("Upload response:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Let the caller handle the error
    }
  };

  return (
    <View
      style={{ height: 160, backgroundColor: MAIN_COLOR, paddingTop: 55 }}
      className="px-5"
    >
      <Pressable
        onPress={pickImage}
        className="flex-1 flex-row gap-5 justify-start items-center mb-10"
      >
        <Image
          source={{
            uri: image ? image.uri : `${client.baseUrl}/${user?.user.image}`,
          }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
          className="rounded-full bg-gray-50"
        />
        <View className="justify-center items-start">
          <Text className="text-sm text-white">Welcome back,</Text>
          <Text className="text-xl text-white font-bold capitalize">
            {user?.user.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default UserHeader;
