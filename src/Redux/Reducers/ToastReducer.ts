import { HIDE_TOAST, SHOW_TOAST } from "Redux/Constants";
import { IToast, IToastState } from "Redux/StateInterface";
import { ToastActionType } from "Redux/Types";

const initialState: IToastState = {
  toasts: [],
};

export default (state: IToastState = initialState, action: ToastActionType) => {
  switch (action.type) {
    case SHOW_TOAST: {
      return {
        ...state,
        toasts: [...state.toasts, action.payload.toast],
      };
    }
    case HIDE_TOAST: {
      const items = removeToastItem(state.toasts, action.payload.index);
      return {
        ...state,
        toasts: [...items],
      };
    }
    default: {
      return state;
    }
  }
};

const removeToastItem = (toasts: IToast[], index: number): IToast[] => {
  const array = toasts;
  array.splice(index, 1);
  return array;
};
