import React, { useMemo } from "react";
import { LoginSwitcherParams } from "Utils/Hooks/useLoginNavigation";
import { LoginSwitcherRoutes } from "../LoginSwitcher";

interface SwitchRouterParams extends LoginSwitcherParams {
  location: string[];
  routes: LoginSwitcherRoutes[];
}

const SwitchRouter: React.FunctionComponent<SwitchRouterParams> = (
  props: SwitchRouterParams
) => {
  const { location, routes, back, navigate, params } = props;

  return (
    <React.Fragment>
      {routes.map(
        ({ component, name }) =>
          location[location.length - 1] === name && (
            <React.Fragment key={name}>
              {component(navigate, back, params)}
            </React.Fragment>
          )
      )}
    </React.Fragment>
  );
};

export default SwitchRouter;
