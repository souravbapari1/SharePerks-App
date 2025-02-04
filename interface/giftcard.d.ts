export interface GIFTERGiftCard {
  _id: string;
  storeType: string;
  codeType: string;
  brandId?: string;
  denominationList: string;
  isEnable: boolean;
  stockISIN: string;
  description: string;
  taq: string;
  redeemSteps: string;
  GiftCardImage: string;
  OnlineRedemptionUrl: string;
  data: Data;
  inStockPercent: number;
  withoutStockPercent: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  brandName: string;
  previewImage: string;
}

export interface Data {
  BrandProductCode: string;
  BrandName: string;
  Brandtype: string;
  RedemptionType: string;
  OnlineRedemptionUrl: string;
  BrandImage: string;
  denominationList: string;
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
