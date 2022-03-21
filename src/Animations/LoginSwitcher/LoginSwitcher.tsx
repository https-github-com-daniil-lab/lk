import React, { useMemo, useState } from "react";

import useLoginNavigation from "Utils/Hooks/useLoginNavigation";
import SwitchRouter from "./SwitchRouter/SwitchRouter";

import "Styles/Animations/LoginSwitcher/LoginSwitcher.scss";

export interface LoginSwitcherRoutes {
  name: string;
  component: any;
}

interface Props {
  routes: LoginSwitcherRoutes[];
  initialRoute: string;
}

const LoginSwitcher: React.FunctionComponent<Props> = (props: Props) => {
  const { routes, initialRoute } = props;

  const { navigate, back, params, transition, location } = useLoginNavigation({
    initialRoute,
  });

  return (
    <div className={`login-switcher ${transition ? "inactive" : "active"}`}>
      <SwitchRouter
        {...{ routes, navigate, back, params, transition, location }}
      />
    </div>
  );
};

export default LoginSwitcher;
