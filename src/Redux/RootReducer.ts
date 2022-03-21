import { combineReducers } from "redux";
import UserReducer from "Redux/Reducers/UserReducer";
import PreloaderReducer from "Redux/Reducers/PreloaderReducer";
import ToastReducer from "./Reducers/ToastReducer";
import EffectsReducer from "./Reducers/EffectsReducer";

export default combineReducers({
  user: UserReducer,
  preloader: PreloaderReducer,
  toast: ToastReducer,
  effects: EffectsReducer,
});
