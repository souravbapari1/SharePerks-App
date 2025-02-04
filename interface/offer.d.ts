export interface OfferData {
  _id: string;
  aboutOffer: string;
  brandId: string;
  commissionRate: number;
  commissionType: "PERCENT" | "AMOUNT";
  expDate: string;
  bannerImage: string;
  offerImage: string;
  isEnable: boolean;
  isInSlide: boolean;
  link: string;
  linkText: string;
  category: string;
  offerKeyPoints: string;
  offerTitle: string;
  provider: string;
  stockISIN: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isExpired: boolean;
  clicks?: number;
}
