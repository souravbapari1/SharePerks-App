export interface WhoowCards {
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

export interface WhoowCardData {
  _id: string;
  user: string;
  amount: number;
  status: string;
  item: string;
  data: Data;
  metaData: MetaData;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentResponse: PaymentResponse;
  sessionID: string;
}

export interface Data {
  brandProductCode: string;
  denomination: number;
  payAmount: number;
  user: string;
}

export interface MetaData {
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
  data: Data2;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pricing {
  amount: number;
  withBroker: number;
  withOutBroker: number;
}

export interface Data2 {
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

export interface PaymentResponse {
  cart_details: any;
  cf_order_id: string;
  created_at: string;
  customer_details: CustomerDetails;
  entity: string;
  order_amount: number;
  order_currency: string;
  order_expiry_time: string;
  order_id: string;
  order_meta: OrderMeta;
  order_note: string;
  order_splits: any[];
  order_status: string;
  order_tags: any;
  payment_session_id: string;
  terminal_data: any;
}

export interface CustomerDetails {
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_uid: any;
}

export interface OrderMeta {
  return_url: any;
  notify_url: any;
  payment_methods: any;
}
