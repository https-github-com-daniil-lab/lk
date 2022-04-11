import { HIDE_PRELOADER, SHOW_PRELOADER } from "Redux/Constants";
import { IPreloaderState } from "Redux/StateInterface";
import { PreloaderActionType } from "Redux/Types";

const initialState: IPreloaderState = {
  show: false,
};

export default (
  state: IPreloaderState = initialState,
  action: PreloaderActionType
) => {
  switch (action.type) {
    case SHOW_PRELOADER: {
      return {
        ...state,
        show: true,
      };
    }
    case HIDE_PRELOADER: {
      return {
        ...state,
        show: false,
      };
    }

    default: {
      return state;
    }
  }
};
