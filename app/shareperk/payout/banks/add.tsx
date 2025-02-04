import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../../constants/toaste-config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderAppBar from "../../../../components/ui/HeaderAppBar";
import { MAIN_COLOR } from "../../../../constants/colors";
import { banksList } from "../../../../constants/banks";
import UpdateInputBox from "../../../../components/widgets/UpdateInputBox";
import { createBank } from "../../../../network/worker/bank";
import { useAppDispatch } from "../../../../redux/hooks";
import { setUserBanksData } from "../../../../redux/slice/userSlice";

function add() {
  const pageData = useLocalSearchParams<any>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState(pageData?.name || "");
  const [bankNumber, setBankNumber] = useState(pageData?.number || "");
  const [bankConfirmNumber, setBankConfirmNumber] = useState("");
  const [bankIfsc, setBankIfsc] = useState(pageData?.ifsc || "");

  const [bankList, setBankList] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const validateState = () => {
    console.log({
      name: bankName,
      accountNumber: bankConfirmNumber,
      ifscCode: bankIfsc,
    });

    if (bankName.length === 0) {
      Toast.show({
        ...toastConfig,
        text1: "Please Select Bank Name",
        text2: "Select your bank ",
        type: "info",
      });
      return false;
    }
    if (bankNumber.length === 0) {
      Toast.show({
        ...toastConfig,
        text1: "Please Enter Account Number",
        text2: "Enter your bank account number",
        type: "info",
      });
      return false;
    }
    if (bankNumber !== bankConfirmNumber) {
      Toast.show({
        ...toastConfig,
        text1: "Bank Number Not matched",
        text2: "Please Check Your bank account number is same",
        type: "info",
      });
      return false;
    }
    if (bankIfsc.length === 0) {
      Toast.show({
        ...toastConfig,
        text1: "Please Enter bank Ifsc",
        text2: "Enter your bank Ifsc code number",
        type: "info",
      });
      return false;
    }

    savebank();
  };

  const savebank = async () => {
    try {
      setLoading(true);
      const response = await createBank({
        accountNumber: bankNumber,
        ifscCode: bankIfsc,
        name: bankName,
      });
      dispatch(setUserBanksData(response.banks));
      setLoading(false);

      router.back();
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
    <GestureHandlerRootView className="flex-1">
      <HeaderAppBar title="Add New Bank">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Text className="font-bold text-xl">Enter Bank Account Info</Text>
          <View className="mt-5">
            <Text className="text-slate-600 mb-2 text-sm">Bank Name</Text>
            <Pressable
              onPress={() => {
                console.log("ok");

                bottomSheetRef.current?.snapToIndex(1);
              }}
            >
              <UpdateInputBox
                showIcon={false}
                disable={true}
                value={bankName}
                input={{
                  onPress: () => {
                    bottomSheetRef.current?.snapToIndex(1);
                  },
                }}
              />
            </Pressable>
          </View>
          <View className="mt-5">
            <Text className="text-slate-600 mb-2 text-sm">
              Bank Account Number
            </Text>
            <UpdateInputBox
              value={bankNumber}
              onChange={(e) => setBankNumber(e)}
              showIcon={false}
              keyboardType="number-pad"
            />
          </View>

          <View className="mt-5">
            <Text className="text-slate-600 mb-2 text-sm">
              Confirm Account Number
            </Text>
            <UpdateInputBox
              value={bankConfirmNumber}
              onChange={(e) => setBankConfirmNumber(e)}
              showIcon={false}
              keyboardType="number-pad"
            />
          </View>

          <View className="mt-5">
            <Text className="text-slate-600 mb-2 text-sm">IFSC CODE</Text>
            <UpdateInputBox
              showIcon={false}
              value={bankIfsc}
              onChange={(e) => setBankIfsc(e)}
            />
          </View>

          <View className="mt-10">
            <Pressable
              className="authBtn bg-primary"
              disabled={loading}
              onPress={validateState}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white">Save Bank Details</Text>
              )}
            </Pressable>
          </View>
          <View className="mb-20"></View>
        </ScrollView>
      </HeaderAppBar>
      <BottomSheet
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        enableOverDrag={true}
        snapPoints={["1%", "50%", "90%"]}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ backgroundColor: MAIN_COLOR }}
        handleStyle={{
          cursor: "pointer",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        >
          {banksList.banks.map((e, i) => (
            <View key={e.title + i}>
              <Text className="text-lg font-semibold text-gray-500 mb-2 mt-5">
                {e.title}
              </Text>
              <View>
                {e.content.map((bank) => (
                  <Pressable
                    className="flex justify-start items-center flex-row h-[60px] gap-5"
                    key={bank.ifsc + bank.name}
                    onPress={() => {
                      setBankName(bank.name);
                      bottomSheetRef.current?.close();
                    }}
                  >
                    <Image
                      source={{ uri: bank.icon }}
                      width={30}
                      height={30}
                      className="bg-gray-200 rounded-full overflow-hidden"
                    />
                    <Text className="text-lg text-gray-500 max-w-[80%] overflow-hidden line-clamp-1">
                      {bank.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default add;
