export interface CashFreeOrderRequest {
  productCode: string;
  productAmount: any;
  payAmount: number;
  user: string;
}
export interface CashFreeOrderData {
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
  order_note: any;
  order_splits: any[];
  order_status: string;
  order_tags: any;
  payment_session_id: string;
  terminal_data: any;
}

export interface OrderMeta {
  return_url: any;
  notify_url: any;
  payment_methods: any;
}

export interface GiftCardPaymentComplete {
  _id: string;
  amount: number;
  type: string;
  status: string;
  brandProductCode: string;
  completePurchase: boolean;
  denomination: string;
  user: string;
  itemData: ItemData;
  createdAt: string;
  updatedAt: string;
  __v: number;
  data: Data2;
  giftCard: GiftCard;
}

export interface ItemData {
  _id: string;
  brandId?: string;
  description?: string;
  pricing?: Pricing[];
  isEnable?: boolean;
  stockISIN?: string;
  GiftCardImage?: string;
  taq?: string;
  data: Data;
  createdAt: string;
  updatedAt: string;
  __v: number;
  type?: string;
  brandProductCode?: string;
}

export interface Pricing {
  amount: number;
  withBroker: number;
  withOutBroker: number;
}

export interface Data {
  sku?: string;
  name?: string;
  currency?: Currency;
  url?: string;
  offerShortDesc: any;
  relatedProductOptions?: RelatedProductOptions;
  minPrice?: string;
  maxPrice?: string;
  price?: Price;
  discounts?: any[];
  couponcodeDesc: any;
  images?: Images;
  createdAt?: string;
  updatedAt?: string;
  campaigns: any;
  BrandProductCode?: string;
  BrandName?: string;
  Brandtype?: string;
  RedemptionType?: string;
  OnlineRedemptionUrl?: string;
  BrandImage?: string;
  denominationList?: string;
  ProductDetails?: string;
  stockAvailable?: string;
  Category?: string;
  Descriptions?: string;
  tnc?: string;
  importantInstruction?: string;
  redeemSteps?: string;
  updated_at?: string;
  EpayMinValue: any;
  EpayMaxValue: any;
  Epay_tnc: any;
  EpayImportantInstruction: any;
  EpayRedeemSteps: any;
  ServiceType?: string;
  EpayDiscount?: number;
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

export interface Data2 {
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

export interface GiftCard {
  status?: string;
  orderId?: string;
  refno?: string;
  cancel?: Cancel;
  currency?: Currency2;
  payments?: Payment[];
  cards?: Card[];
  products?: Products;
  additionalTxnFields?: any[];
  PullVouchers?: PullVoucher[];
  ErrorCode?: string;
  ErrorMessage?: string;
  ExternalOrderIdOut?: string;
  Message?: string;
  ResultType?: string;
  BrandProductCode?: string;
}

export interface Cancel {
  allowed: boolean;
  allowedWithIn: number;
}

export interface Currency2 {
  code: string;
  numericCode: string;
  symbol: string;
}

export interface Payment {
  code: string;
  balance: string;
}

export interface Card {
  sku: string;
  productName: string;
  labels: Labels;
  cardNumber: string;
  cardPin: string;
  activationCode: any;
  barcode: any;
  activationUrl: any;
  redemptionUrl: RedemptionUrl;
  formats: any[];
  amount: string;
  validity: string;
  issuanceDate: string;
  sequenceNumber: string;
  cardId: number;
  recipientDetails: RecipientDetails;
  theme: string;
}

export interface Labels {
  cardNumber: string;
  cardPin: string;
  activationCode: string;
  sequenceNumber: string;
  validity: string;
}

export interface RedemptionUrl {
  label: string;
  url: string;
}

export interface RecipientDetails {
  salutation: any;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  mobileNumber: string;
  status: string;
  failureReason: string;
  delivery: Delivery;
}

export interface Delivery {
  mode: string;
  status: Status;
}

export interface Status {
  sms: Sms;
  email: Email;
}

export interface Sms {
  status: string;
  reason: string;
}

export interface Email {
  status: string;
  reason: string;
}

export interface Products {
  EGCGBFK001: Egcgbfk001;
}

export interface Egcgbfk001 {
  sku: string;
  name: string;
  balanceEnquiryInstruction: any;
  specialInstruction: string;
  images: Images2;
  cardBehaviour: string;
}

export interface Images2 {
  thumbnail: string;
  mobile: string;
  base: string;
  small: string;
}

export interface PullVoucher {
  Vouchers: Voucher[];
  ProductGuid: string;
  ProductName: string;
  VoucherName: string;
}

export interface Voucher {
  VoucherNo: string;
  VoucherGuid: string;
  EndDate: string;
  Value: string;
  Voucherpin: string;
  VoucherGCcode: string;
}
