export type UserType = {
  id: string;
  username: string;
  role: {
    id: string;
    name: string;
    autoApply: boolean;
    roleAfterBuy: boolean;
    roleAfterBuyExpiration: true;
    roleForBlocked: true;
    admin: boolean;
  };
  email: {
    address: string;
    activated: boolean;
  };
  type: string;
  walletType: string;
  touchID: boolean;
  faceID: boolean;
  pinCode: string;
  plannedIncome: 0;
  notificationsEnable: boolean;
  createAt: string;
};

export type IconType = {
  id: string;
  name: string;
  path: string;
  tag: string;
};

export type ColorType = {
  name: string;
  hex: string;
  systemName: string;
};

export interface IBaseCategory {
  name: string;
  id: string;
  icon: IconType;
  description: string;
  color: ColorType;
}

export interface ICategory {
  categoryLimit: number;
  color: ColorType;
  description: string;
  id: string;
  name: string;
  user: UserType;
  icon: IconType;
}

export type BalanceType = {
  amount: number;
  cents: number;
};

export interface ITinkoffCard {
  balance: BalanceType;
  bankName: string;
  cardId: string;
  cardNumber: string;
  createdInBank: string;
  currency: string;
  expiration: string;
  id: string;
  name: string;
  status: string;
}

export interface IBalances {
  balance: BalanceType;
  id: string;
  name: string;
  user: UserType;
}

export type TransactionType = "WITHDRAW" | "DEPOSIT";

export interface ITransaction {
  action: TransactionType;
  bill: {
    balance: BalanceType;
    id: string;
    name: string;
    user: UserType;
  };
  category: null | ICategory;
  createAt: string;
  currency: string;
  description: string;
  geocodedPlace: null;
  id: string;
  latitude: null;
  longitude: null;
  sum: number;
}

export interface IWallet {
  walletSystemName: string;
  walletDisplayName: string;
}

export interface ISubscription {
  id: string;
  name: string;
  description: string;
  expiration: number;
  price: number;
  newPrice: number;
}

export type IFiles = {
  id: string;
  path: string;
};

export interface IAdvertising {
  id: string;
  title: string;
  subTitle: string;
  content: string;
  files: IFiles[];
}
