import {
  CashFreeOrderData,
  CashFreeOrderRequest,
  GiftCardPaymentComplete,
} from "../interface/cashfree";
import { client, UserAuthToken } from "../network/action";

import { CFThemeBuilder } from "cashfree-pg-api-contract";

export const CFTheme = new CFThemeBuilder()
  .setNavigationBarBackgroundColor("#E64A19") // ios
  .setNavigationBarTextColor("#FFFFFF") // ios
  .setButtonBackgroundColor("#FFC107") // ios
  .setButtonTextColor("#FFFFFF") // ios
  .setPrimaryTextColor("#212121")
  .setSecondaryTextColor("#757575") // ios
  .build();
const getPaymentPath = (
  type: "GIFTER" | "WHOOW",
  data: CashFreeOrderRequest
) => {
  if (type === "GIFTER") {
    return `/api/v1/giftcard/payment/${data.productCode}/${data.productAmount}`;
  } else {
    return `/api/v1/whoow/payment/${data.user}`;
  }
};

export const createCashFreeOrder = async (
  data: CashFreeOrderRequest,
  type: "GIFTER" | "WHOOW"
) => {
  const token = await UserAuthToken();
  const res = await client
    .post(getPaymentPath(type, data))
    .json(
      type == "GIFTER"
        ? {
            payAmount: data.payAmount,
            user: data.user,
          }
        : {
            productId: data.productCode,
            amount: data.payAmount,
            cardAmount: data.productAmount,
          }
    )
    .send<CashFreeOrderData>(token);

  return res;
};

export const verifyCashFreeOrder = async (
  id: string,
  type: "GIFTER" | "WHOOW"
) => {
  const token = await UserAuthToken();
  const res = await client
    .get(
      `/api/v1/${type === "GIFTER" ? "giftcard" : "whoow"}/payment/verify/${id}`
    )
    .send<GiftCardPaymentComplete>(token);
  return res;
};
