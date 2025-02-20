import { OfferData } from "./offer";
export interface FeedData {
  offers: OfferData[];
  brands: Brand[];
  categories: Category[];
  coupons: any[];
  bannerGiftCards: BannerGiftCards;
  homeGiftCards: HomeGiftCards;
  topOffers: OfferData[];
  offerFromWallet?: OfferData[];
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
  createdAt: string;

  commissionRate: number;
  commissionRateWithHolding: number;
  commissionType: "PERCENT" | "AMOUNT";

  updatedAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BannerGiftCards {
  gifterCards: GifterCard[];
  whoowCards: WhoowCard[];
}

export interface WhoowCard {
  _id: string;
  description: string;
  pricing: Pricing[];
  isEnable: boolean;
  stockISIN: string;
  GiftCardImage: string;
  previewImage: string;
  brandName: string;
  taq: string;
  type: string;
  data: Data;
  createdAt: string;
  updatedAt: string;
  __v: number;
  showOnBanner: boolean;
  showOnHome: boolean;
}

export interface Pricing {
  amount: number;
  withBroker: number;
  withOutBroker: number;
}

export interface Data {
  sku: string;
  name: string;
  currency: Currency;
  url: string;
  offerShortDesc: any;
  relatedProductOptions: RelatedProductOptions;
  minPrice: string;
  maxPrice: string;
  price: Price;
  discounts: any[];
  couponcodeDesc: any;
  images: Images;
  createdAt: string;
  updatedAt: string;
  campaigns: any;
}

export interface Currency {
  code: string;
  symbol: string;
  numericCode: string;
}

export interface RelatedProductOptions {
  PROMO: boolean;
  DESIGNS: boolean;
}

export interface Price {
  cpg: any[];
}

export interface Images {
  thumbnail: string;
  mobile: string;
  base: string;
  small: string;
}

export interface HomeGiftCards {
  gifterCards: GifterCard[];
  whoohcards: Whoohcard[];
}

export interface GifterCard {
  _id: string;
  storeType: string;
  codeType: string;
  denominationList: string;
  isEnable: boolean;
  stockISIN: string;
  description: string;
  taq: string;
  redeemSteps: string;
  GiftCardImage: string;
  previewImage: string;
  brandName: string;
  OnlineRedemptionUrl: string;
  data: Data2;
  inStockPercent: number;
  withoutStockPercent: number;
  showOnBanner: boolean;
  showOnHome: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Data2 {
  BrandProductCode: string;
  BrandName: string;
  Brandtype: string;
  RedemptionType: string;
  OnlineRedemptionUrl: string;
  BrandImage: string;
  denominationList: string;
  MinValue: any;
  MaxValue: any;
  DenomType: string;
  ProductDetails: string;
  stockAvailable: string;
  Category: string;
  Descriptions: string;
  tnc: string;
  importantInstruction: string;
  redeemSteps: string;
  updated_at: string;
  EpayMinValue: any;
  EpayMaxValue: any;
  Epay_tnc: any;
  EpayImportantInstruction: any;
  EpayRedeemSteps: any;
  ServiceType: string;
  EpayDiscount: number;
}

export interface Whoohcard {
  _id: string;
  description: string;
  pricing: Pricing2[];
  isEnable: boolean;
  stockISIN: string;
  GiftCardImage: string;
  previewImage: string;
  brandName: string;
  taq: string;
  type: string;
  data: Data3;
  createdAt: string;
  updatedAt: string;
  __v: number;
  showOnBanner: boolean;
  showOnHome: boolean;
  redeemSteps?: string;
}

export interface Pricing2 {
  amount: number;
  withBroker: number;
  withOutBroker: number;
}

export interface Data3 {
  sku: string;
  name: string;
  currency: Currency2;
  url: string;
  offerShortDesc: any;
  relatedProductOptions: RelatedProductOptions2;
  minPrice: string;
  maxPrice: string;
  price: Price2;
  discounts: any[];
  couponcodeDesc: any;
  images: Images2;
  createdAt: string;
  updatedAt: string;
  campaigns: any;
}

export interface Currency2 {
  code: string;
  symbol: string;
  numericCode: string;
}

export interface RelatedProductOptions2 {
  PROMO: boolean;
  DESIGNS: boolean;
}

export interface Price2 {
  cpg: any[];
}

export interface Images2 {
  thumbnail: string;
  mobile: string;
  base: string;
  small: string;
}
