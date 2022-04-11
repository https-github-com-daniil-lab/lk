import { UserType } from "Services/Interfaces";
import {
  HIDE_PRELOADER,
  HIDE_TOAST,
  LOG_OUT,
  SET_USER,
  SHOW_PRELOADER,
  SHOW_TOAST,
  UPDATE_CATEGORY,
  UPDATE_OPERATION
} from "./Constants";
import {
  IPreloaderHideAction,
  IPreloaderShowAction,
  IToastHideAction,
  IToastShowAction,
  IUpdateCategory,
  IUserLogoutAction,
  IUserSetAction,
  IUpdateOperation
} from "./Interfaces";
import { IToast } from "./StateInterface";

export const ShowPreloader = (): IPreloaderShowAction => {
  return {
    type: SHOW_PRELOADER,
    payload: null,
  };
};

export const HidePreloader = (): IPreloaderHideAction => {
  return {
    type: HIDE_PRELOADER,
    payload: null,
  };
};

export const ShowToast = (toast: IToast): IToastShowAction => {
  return {
    type: SHOW_TOAST,
    payload: {
      toast,
    },
  };
};

export const HideToast = (index: number): IToastHideAction => {
  return {
    type: HIDE_TOAST,
    payload: {
      index,
    },
  };
};

export const SetUser = (token: string, user: UserType): IUserSetAction => {
  return {
    type: SET_USER,
    payload: {
      token,
      user,
    },
  };
};

export const Logout = (): IUserLogoutAction => {
  return {
    type: LOG_OUT,
    payload: null,
  };
};

export const UpdateCategory = (): IUpdateCategory => {
  return {
    type: UPDATE_CATEGORY,
    payload: null,
  };
};

export const UpdateOperations = (): IUpdateOperation => {
  return {
    type: UPDATE_OPERATION,
    payload: null,
  };
};
