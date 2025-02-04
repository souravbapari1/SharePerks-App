export interface MyCoupons {
  cards: Card[];
  pending: Pending[];
  failed: Failed[];
}

export interface Card {
  _id: string;
  user: string;
  amount: number;
  provider: string;
  paymentID: string;
  name: string;
  code: any;
  pin: string;
  expiredDate: string;
  whoowResponse: WhoowResponse;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WhoowResponse {
  products: Products;
  cards: Card2[];
  currency: Currency;
  deliveryMode: string;
  egvDeliveryType: any;
  delivery: Delivery2;
  total_cards: number;
}

export interface Products {
  VOUCHERCODE: Vouchercode;
}

export interface Vouchercode {
  sku: string;
  name: string;
  balanceEnquiryInstruction: any;
  specialInstruction: string;
  images: Images;
  cardBehaviour: string;
}

export interface Images {
  thumbnail: string;
  mobile: string;
  base: string;
  small: string;
}

export interface Card2 {
  sku: string;
  productName: string;
  labels: Labels;
  cardNumber: any;
  cardPin: string;
  activationCode: any;
  barcode: any;
  activationUrl: any;
  redemptionUrl: RedemptionUrl;
  addToSamsungWallet: string;
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
  samsungWalletLabel: string;
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

export interface Currency {
  code: string;
  numericCode: string;
  symbol: string;
}

export interface Delivery2 {
  summary: Summary;
}

export interface Summary {
  email: Email2;
  sms: Sms2;
  totalCardsCount: number;
}

export interface Email2 {
  totalCount: number;
  delivered: number;
  failed: number;
  inProgress: number;
}

export interface Sms2 {
  totalCount: number;
  delivered: number;
  failed: number;
  inProgress: number;
}

export interface Pending {
  _id: string;
  user: string;
  amount: number;
  retry: boolean;
  refund: boolean;
  paymentID: string;
  provider: string;
  errorResponse: ErrorResponse;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ErrorResponse {
  status: string;
  statusLabel: string;
  statusImage: any;
  statusLevel: any;
  orderId: string;
  refno: string;
  cancel: Cancel;
}

export interface Cancel {
  allowed: boolean;
}

export interface Failed {
  _id: string;
  user: string;
  amount: number;
  retry: boolean;
  refund: boolean;
  paymentID: string;
  provider: string;
  errorResponse: ErrorResponse2;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refundNote: string;
}

export interface ErrorResponse2 {
  code: number;
  message: string;
  messages: any[];
}
