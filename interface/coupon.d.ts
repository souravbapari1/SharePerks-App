export interface CouponData {
  _id: string;
  aboutCoupon: string;
  brandId: string;
  clicks: number;
  code: string;
  commissionRate: number;
  commissionType: string;
  expDate: string;
  bannerImage: string;
  couponImage: string;
  isEnable: boolean;
  link: string;
  linkText: string;
  category: string;
  couponKeyPoints: string[];
  couponTitle: string;
  provider: string;
  stockISIN: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isExpired: boolean;
}
