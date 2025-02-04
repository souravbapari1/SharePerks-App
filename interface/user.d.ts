import { Bank } from "./bank";

export interface UserData {
  status: boolean;
  user: User;
  holdings?: Holdings;
  banks: Bank[];
  earnings: Earnings;
}

export interface User {
  _id: string;
  referCode: string;
  image: string;
  referPaymentComplete: boolean;
  mobile: number;
  walletAmount: number;
  completeProfile: boolean;
  brokerConnected: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  email: string;
  name: string;
}

export interface Holdings {
  _id: string;
  user: string;
  __v: number;
  createdAt: string;
  data: Data;
  updatedAt: string;
}

export interface Data {
  smallcases: Smallcases;
  securities: Security[];
  updating: boolean;
  lastUpdate: string;
  snapshotDate: string;
  smallcaseAuthId: string;
  broker: string;
}

export interface Smallcases {
  public: any[];
  private: Private;
}

export interface Private {
  stats: Stats;
}

export interface Stats {
  currentValue: number;
  totalReturns: number;
}

export interface Security {
  holdings: Holdings2;
  collateralQuantity: number;
  positions: Positions;
  transactableQuantity: number;
  smallcaseQuantity: number;
  nseTicker: string;
  bseTicker?: string;
  isin: string;
  name: string;
}

export interface Holdings2 {
  quantity: number;
  averagePrice: number;
}

export interface Positions {
  nse: Nse;
  bse: Bse;
}

export interface Nse {
  quantity: number;
  averagePrice: number;
}

export interface Bse {
  quantity: number;
  averagePrice: number;
}

export interface Earnings {
  totalPayouts: number;
  totalRefer: number;
  totalTransitions: number;
  totalTransitionsPending: number;
  wallet: number;
}
