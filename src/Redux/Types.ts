import {
  IPreloaderHideAction,
  IPreloaderShowAction,
  IToastHideAction,
  IToastShowAction,
  IUpdateCategory,
  IUserLogoutAction,
  IUserSetAction,
} from "Redux/Interfaces";

export type UserActionType = IUserSetAction | IUserLogoutAction;

export type PreloaderActionType = IPreloaderShowAction | IPreloaderHideAction;

export type ToastActionType = IToastShowAction | IToastHideAction;

export type EffectsActionType = IUpdateCategory;
