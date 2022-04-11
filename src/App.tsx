import React from "react";
import { Provider } from "react-redux";
import { Store } from "Redux/Store";

import Router from "Router/Router";

export default () => {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
};
