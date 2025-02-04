import { View, Text } from "react-native";
import React, { memo, useState } from "react";

import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { toastConfig } from "../../../../constants/toaste-config";
import { isValidEmail } from "../../../../helper/validate/validateEmail";
import HeaderAppBar from "../../../../components/ui/HeaderAppBar";
import UpdateInputBox from "../../../../components/widgets/UpdateInputBox";
import { updateProfile } from "../../../../network/worker/user";
import { setUserData } from "../../../../redux/slice/userSlice";

const index = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((e) => e.userSlice);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.user.name ?? "");
  const [email, setEmail] = useState(user?.user.email ?? "");

  // Add your code here to update user profile data

  const saveName = async () => {
    if (name.toString().trim().length == 0) {
      Toast.show({
        ...toastConfig,
        text1: "Please Enter Your Name",
        type: "error",
      });
      return false;
    }
    try {
      setLoading(true);
      const useData = await updateProfile({ name });
      dispatch(setUserData(useData));
      Toast.show({
        ...toastConfig,
        text1: "Your Name Update Successfully",
        type: "success",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        ...toastConfig,
        text1: "Something went wrong!",
        text2: "Error saving your bank details",
        type: "error",
      });
    }
  };

  const saveEmail = async () => {
    if (email.toString().trim().length == 0) {
      Toast.show({
        ...toastConfig,
        text1: "Please Enter Your Email",
        type: "error",
      });
      return false;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        ...toastConfig,
        text1: "Please Enter A Valid Email ID",
        type: "error",
      });
      return false;
    }
    try {
      setLoading(true);
      const useData = await updateProfile({ email });
      dispatch(setUserData(useData));
      Toast.show({
        ...toastConfig,
        text1: "Your Email Update Successfully",
        type: "success",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        ...toastConfig,
        text1: "Something went wrong!",
        text2: "Error saving your bank details",
        type: "error",
      });
    }
  };

  return (
    <HeaderAppBar title="Update Profile">
      <View className="flex-1  gap-5">
        <Text className="text-xl text-gray-800 font-bold mb-2">
          Edit Profile
        </Text>
        <UpdateInputBox
          value={name}
          input={{
            placeholder: "Your Name",
          }}
          onChange={setName}
          onEditPress={loading ? () => {} : saveName}
        />
        <UpdateInputBox
          value={email}
          input={{
            placeholder: "Email ID",
          }}
          onEditPress={loading ? () => {} : saveEmail}
          onChange={setEmail}
        />
        <UpdateInputBox
          input={{
            placeholder: "Mobile NO",
          }}
          value={user?.user.mobile.toString() || ""}
          disable={true}
        />
      </View>
    </HeaderAppBar>
  );
};

export default memo(index);
