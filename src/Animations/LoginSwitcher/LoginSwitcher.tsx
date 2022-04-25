import React from "react";
import "Styles/Animations/LoginSwitcher/LoginSwitcher.scss";
import useLoginNavigation, {
  PassParamasType,
} from "Utils/Hooks/useLoginNavigation";
import SwitchRouter from "./SwitchRouter/SwitchRouter";

export interface LoginSwitcherRoutes {
  name: string;
  component: (
    navigate: (v: string) => void,
    back: () => void,
    params: PassParamasType
  ) => any;
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
