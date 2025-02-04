import { OfferData } from "./offer";

export interface FeedData {
  offers: OfferData[];
  brands: Brand[];
  categories: Category[];
  coupons: Coupon[];
  topOffers: OfferData[];
  offerFromWallet: OfferData[];
}

export interface Brand {
  _id: string;
  name: string;
  btnText: string;
  linkUrl: string;
  category: string[];
  clicks: number;
  isActive: boolean;
  provider: string;
  stockISIN: string;
  offerTerms: string;
  cashBackRates: string;
  aboutBrand: string;
  bannerImage: string;
  brandImage: string;
  discountHighLights: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OfferTerm {
  title: string;
  content: string[];
}

export interface CashBackRate {
  type: string;
  value: any;
  title: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Coupon {
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
