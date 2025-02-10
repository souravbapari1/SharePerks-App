import React, { useEffect, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CFEnvironment,
  CFSession,
  CFUPIIntentCheckoutPayment,
} from "cashfree-pg-api-contract";

import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import HeaderAppBar from "../../../../../../components/ui/HeaderAppBar";
import AppButton from "../../../../../../components/widgets/AppButton";
import InfoList from "../../../../../../components/widgets/InfoList";
import { getPercentageValue } from "../../../../../../helper/percent";
import {
  WhoowCardData,
  WhoowCards,
} from "../../../../../../interface/whoowCard";
import { cn } from "../../../../../../lib/cn";
import { client, UserAuthToken } from "../../../../../../network/action";
import { useAppSelector } from "../../../../../../redux/hooks";
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from "react-native-cashfree-pg-sdk";
import { CFTheme } from "../../../../../../cashfree/cashfree";
import { toastConfig } from "../../../../../../constants/toaste-config";

const { width } = Dimensions.get("window");
const index = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { user } = useAppSelector((e) => e.userSlice);
  const data = useQuery({
    queryKey: ["whoow_card", params.id],
    queryFn: async () => {
      const whoow = await client
        .get("/api/v1/whoow/" + params.id)
        .send<WhoowCards>();

      return { whoow };
    },
  });

  const [active, setActive] = useState({
    amount: 0,
    domination: 0,
  });

  const amounts = data.data?.whoow.pricing;

  const mutate = useMutation({
    mutationKey: ["giftcard_payment"],
    mutationFn: async (data: {
      brandProductCode: string;
      denomination: any;
      payAmount: any;
      user: any;
    }) => {
      const gifter = await client
        .post(`/api/v1/giftcardorder/create/whoow`)
        .json(data)
        .send<WhoowCardData>(await UserAuthToken());
      return gifter;
    },
    onSuccess: (data) => {
      paymentGateway({
        orderId: data._id,
        session: data.sessionID,
      });
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error On Generate GiftCard",
        ...toastConfig,
      });
    },
  });

  const paymentGateway = ({
    orderId,
    session,
  }: {
    session: string;
    orderId: string;
  }) => {
    try {
      const sessionRes = new CFSession(session, orderId, CFEnvironment.SANDBOX);
      const upiPayment = new CFUPIIntentCheckoutPayment(sessionRes, CFTheme);
      CFPaymentGatewayService.doUPIPayment(upiPayment);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOrder = useMutation({
    mutationKey: ["whoow_verify_order"],
    mutationFn: async (id: string) => {
      console.log({ id: "verifyOrder", giftcardorder: id });
      const url = `/api/v1/giftcardorder/verify/whoow/${id}`;
      console.log("API URL:", url);

      const whoow = await client
        .get(`/api/v1/giftcardorder/verify/whoow/${id}`)
        .send<any>();
      return whoow;
    },
    onSuccess: (data) => {
      router.replace("/shareperk/giftcard/view/sucess");
      console.log(data);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error On Generate GiftCard",
        ...toastConfig,
      });
      console.log(error);
    },
  });

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      //verify order status from backend
      onVerify(orderID: string): void {
        console.log("verify order status from backend");
        verifyOrder.mutate(orderID);
      },

      onError(error: CFErrorResponse, orderID: string): void {
        console.log(error);
        Toast.show({
          type: "error",
          text1: error.getMessage(),
          ...toastConfig,
        });
      },
    });
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  const isUserHolding = () => {
    if (!user) {
      return false;
    }
    if (user.user.brokerConnected != true) {
      return false;
    }
    const isins = user?.holdings?.data.securities.map((e) => e.isin);
    return isins?.includes(data.data?.whoow?.stockISIN || "");
  };

  return (
    <HeaderAppBar
      loading={data.isLoading}
      title="Buy Gift Card"
      bottomAction={
        <View className="w-full bg-white px-5">
          <AppButton
            buttonText="Proceed To Buy Coupon"
            className="bg-[#6d4906]"
            onClick={() => {
              if (active.amount == 0) {
                Toast.show({
                  type: "error",
                  text1: "Please select a amount",
                });
              } else {
                mutate.mutate({
                  brandProductCode: data.data?.whoow?.data.sku || "",
                  denomination: active.domination,
                  payAmount: active.amount,
                  user: user?.user._id,
                });
                console.log(`/api/v1/whoow/create`);
              }
            }}
            loading={verifyOrder.isPending || mutate.isPending}
            disabled={mutate.isPending || verifyOrder.isPending}
          />
        </View>
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-col  mt-10 justify-center  items-center flex-wrap gap-5 pb-52">
          <Image
            width={width / 2.5}
            height={90}
            style={{ objectFit: "contain" }}
            source={{
              uri: data.data?.whoow?.previewImage,
            }}
            className="w-full"
          />
          <Text className="text-2xl font-bold text-center">
            {data.data?.whoow?.brandName}
          </Text>
          <Text className="text-center text-gray-500 text-sm">
            {data.data?.whoow?.description}
          </Text>

          <View className="w-full">
            <Text className="text-sm font-bold mt-5 text-center text-secondary ">
              Click To Select Your Amount
            </Text>
          </View>
          <View className="flex-row justify-between gap-y-4 flex-wrap items-center">
            {amounts?.map((e, i) => {
              const discount = isUserHolding()
                ? getPercentageValue(e.amount, e.withBroker)
                : getPercentageValue(e.amount, e.withOutBroker);
              return (
                <PayBtn
                  isActive={active.domination === e.amount}
                  key={i}
                  onPress={() => {
                    setActive({
                      amount: discount,
                      domination: e.amount,
                    });
                  }}
                  data={{
                    amount: e.amount,
                    discount: discount,
                  }}
                />
              );
            })}
          </View>
          <View>
            <InfoList
              title="Privacy Policy"
              className="w-full"
              onPress={() => {
                router.push("/shareperk/pages/privacypolicy");
              }}
            />
            <InfoList
              title="Terms & Conditions"
              className="w-full"
              onPress={() => {
                router.push("/shareperk/pages/termsandcondisions");
              }}
            />
            <InfoList
              title="Help & Support"
              className="w-full"
              onPress={() => {
                router.push("/shareperk/pages/helpandsupport");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </HeaderAppBar>
  );
};

export default index;

const PayBtn = ({
  isActive = false,
  onPress,
  data,
}: {
  isActive?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  data: {
    amount: number;
    discount: number;
  };
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className={cn(
        "bg-disable/10 border border-disable/20 rounded-lg  p-4  justify-center items-center",
        isActive && "bg-primary/10 border-primary/20"
      )}
      style={{
        width: width / 2.3,
      }}
    >
      <Text className="text-center font-bold text-xl mb-2 ">
        ₹{data?.discount}
      </Text>
      <Text className="text-sm text-center line-through text-primary/40">
        ₹{data?.amount}
      </Text>
    </TouchableOpacity>
  );
};
