export interface TransitionsData {
  _id: string;
  amount: number;
  payAmount: number;
  transitions_id: string;
  status: string;
  subtitle: string;
  title: string;
  type: string;
  completePayment: boolean;
  user: string;
  brand: string;
  typeDocId: string;
  data: Data;
  createdAt: string;
  updatedAt: string;
  __v: number;
  brandData: BrandData;
}

export interface Data {
  provider_id: string;
  amount: number;
  commission: number;
  status: string;
  currency: string;
  store_name: string;
  userId: string;
  provider: string;
  type: string;
  typeId: string;
  data: Data2;
  date: string;
  response: any;
}

export interface Data2 {
  name: string;
  userId: string;
  type: string;
  docId: string;
  brand: string;
  stock: string;
}

export interface BrandData {
  _id: string;
  name: string;
  btnText: string;
  linkUrl: string;
  category: string[];
  clicks: number;
  isActive: boolean;
  provider: string;
  stockISIN: string;
  offerTerms: OfferTerm[];
  cashBackRates: CashBackRate[];
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
  value: string;
  title: string;
}
