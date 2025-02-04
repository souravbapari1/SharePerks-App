import { GiftCardPaymentComplete } from "../interface/cashfree";
import { formatDate } from "./date_time/getCurrentFormattedDateTime";

export function getPercentageValue(amount: number, percentage: number): number {
  return +(amount * (percentage / 100)).toFixed(2);
}

export const getCouponCode = (codeData: GiftCardPaymentComplete) => {
  if (codeData.type === "GiftCard") {
    return {
      code: codeData.giftCard.PullVouchers![0].Vouchers[0].VoucherGCcode,
      pin: codeData.giftCard.PullVouchers![0].Vouchers[0].Voucherpin,
      endDate: codeData.giftCard.PullVouchers![0].Vouchers[0].EndDate,
      image: codeData.itemData.data.BrandImage,
      brand: codeData.itemData.data.BrandName,
    };
  } else {
    return {
      code: codeData.giftCard.cards![0].cardNumber,
      pin: codeData.giftCard.cards![0].cardPin,
      endDate: formatDate(codeData.giftCard.cards![0].validity),
      image: codeData.itemData.data.images?.small,
      brand: codeData.itemData.data.name,
    };
  }
};
