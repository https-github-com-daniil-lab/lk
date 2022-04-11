import { UserType } from "Services/Interfaces";

export interface IUserState {
  token: null | string;
  user: UserType | null;
}

export interface IPreloaderState {
  show: boolean;
}

export interface IToast {
  type: "error" | "success";
  title: string;
  text: string;
}

export interface IToastState {
  toasts: IToast[];
}

export interface IEffectsState {
  updateCategory: boolean | null;
  updateOperation: boolean | null;
}
