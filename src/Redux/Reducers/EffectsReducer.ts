import { UPDATE_CATEGORY, UPDATE_OPERATION } from "Redux/Constants";
import { IEffectsState } from "Redux/StateInterface";
import { EffectsActionType } from "Redux/Types";

const initialState: IEffectsState = {
  updateCategory: null,
  updateOperation: null,
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
    case UPDATE_OPERATION: {
      const newState = { ...state };

      if (newState.updateOperation == null) {
        newState.updateOperation = false;
      } else {
        newState.updateOperation = !newState.updateOperation;
      }

      return newState;
    }
    default: {
      return state;
    }
  }
};
