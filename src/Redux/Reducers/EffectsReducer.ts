import { UPDATE_CATEGORY } from "Redux/Constants";
import { IEffectsState } from "Redux/StateInterface";
import { EffectsActionType } from "Redux/Types";

const initialState: IEffectsState = {
  updateCategory: null,
};

export default (
  state: IEffectsState = initialState,
  action: EffectsActionType
) => {
  switch (action.type) {
    case UPDATE_CATEGORY: {
      const newState = { ...state };

      if (newState.updateCategory == null) {
        newState.updateCategory = false;
      } else {
        newState.updateCategory = !newState.updateCategory;
      }

      return newState;
    }
    default: {
      return state;
    }
  }
};
