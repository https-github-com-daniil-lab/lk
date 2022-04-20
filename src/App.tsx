import React from "react";
import { Provider } from "react-redux";
import { Store } from "Redux/Store";
import Router from "Router/Router";

const App = () => (
  <Provider store={Store}>
    <Router />
  </Provider>
);

export default App;
