import { createStore } from "redux";

import Reducer from "Redux/RootReducer";

export const Store = createStore(Reducer);

export type RootStore = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
