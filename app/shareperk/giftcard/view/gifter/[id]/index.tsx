import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React, { useEffect, useState } from "react";

import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client, UserAuthToken } from "../../../../../../network/action";
import { GIFTERGiftCard } from "../../../../../../interface/giftcard";
import { WhoowCards } from "../../../../../../interface/whoowCard";
import HeaderAppBar from "../../../../../../components/ui/HeaderAppBar";
import AppButton from "../../../../../../components/widgets/AppButton";
import InfoList from "../../../../../../components/widgets/InfoList";
import { cn } from "../../../../../../lib/cn";
import { getPercentageValue } from "../../../../../../helper/percent";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useAppSelector } from "../../../../../../redux/hooks";
import Toast from "react-native-toast-message";
import {
  CFEnvironment,
  CFSession,
  CFUPIIntentCheckoutPayment,
} from "cashfree-pg-api-contract";
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from "react-native-cashfree-pg-sdk";
import { CFTheme } from "../../../../../../cashfree/cashfree";
import { toastConfig } from "../../../../../../constants/toaste-config";
import TitleBar from "@/components/widgets/TitleBar";

const { width } = Dimensions.get("window");
const index = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { user } = useAppSelector((e) => e.userSlice);
  const data = useQuery({
    queryKey: ["giftcard_one", params.id],
    queryFn: async () => {
      const gifter = await client
        .get("/api/v1/giftcard/" + params.id)
        .send<GIFTERGiftCard>();

      return { gifter };
    },
  });

  const [active, setActive] = useState({
    amount: 0,
    domination: 0,
  });

  const getPricing = () => {
    const amounts = data.data?.gifter.denominationList.split(",");
    const pricing = amounts?.map((e, i) => {
      return {
        amount: +e,
        withBroker: getPercentageValue(
          +e,
          data.data?.gifter?.inStockPercent || 0
        ),
        withOutBroker: getPercentageValue(
          +e,
          data.data?.gifter?.withoutStockPercent || 0
        ),
      };
    });
    return pricing;
  };
  const pricing = getPricing();

  const mutate = useMutation({
    mutationKey: ["giftcard_payment"],
    mutationFn: async (data: {
      brandProductCode: string;
      denomination: any;
      payAmount: any;
      user: any;
    }) => {
      const gifter = await client
        .post(`/api/v1/giftcardorder/create/gifter`)
        .json(data)
        .send<any>(await UserAuthToken());
      return gifter;
    },
    onSuccess: (data) => {
      console.log(data);
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
  const isUserHolding = () => {
    if (!user) {
      return false;
    }
    if (user.user.brokerConnected != true) {
      return false;
    }
    const isins = user?.holdings?.data.securities.map((e) => e.isin);
    return isins?.includes(data.data?.gifter?.stockISIN || "");
  };

  const verifyOrder = useMutation({
    mutationKey: ["gifter_verify_order"],
    mutationFn: async (id: string) => {
      console.log({ id: "verifyOrder", giftcardorder: id });

      const whoow = await client
        .get(`/api/v1/giftcardorder/verify/gifter/${id}`)
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

  return (
    <HeaderAppBar
      loading={data.isLoading}
      title="Buy Gift Card"
      bottomAction={
        <View className="w-full bg-white px-5">
          <AppButton
            buttonText="Proceed To Buy Coupon"
            className="bg-[#6d4906] "
            onClick={() => {
              if (active.amount == 0) {
                Toast.show({
                  type: "error",
                  text1: "Please select a amount",
                  ...toastConfig,
                });
              } else {
                mutate.mutate({
                  user: user?.user._id,
                  brandProductCode:
                    data.data?.gifter?.data.BrandProductCode || "",
                  denomination: active.domination,
                  payAmount: active.amount,
                });
                console.log(
                  `/api/v1/giftcard/payment/${data.data?.gifter?.data.BrandProductCode}/${active}`
                );
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
              uri: data.data?.gifter?.previewImage,
            }}
            className="w-full"
          />
          <Text className="text-2xl font-bold text-center">
            {data.data?.gifter?.brandName}
          </Text>
          <Text className="text-center text-gray-500 text-sm">
            {data.data?.gifter?.description}
          </Text>

          <View className="w-full">
            <Text className="text-sm font-bold mt-5 text-center text-secondary ">
              Click To Select Your Amount
            </Text>
          </View>
          <View className="flex-row 5 justify-between gap-y-4 flex-wrap items-center">
            {pricing?.map((e, i) => {
              const discount = isUserHolding() ? e.withBroker : e.withOutBroker;
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
                    discount: isUserHolding() ? e.withBroker : e.withOutBroker,
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
