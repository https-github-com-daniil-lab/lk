import React, { useMemo } from "react";

import LoginSwitcher from "Animations/LoginSwitcher/LoginSwitcher";
import LoginPhone from "Pages/Login/LoginPhone/LoginPhone";

import LoginCode from "Pages/Login/LoginCode/LoginCode";
import LoginPassword from "Pages/Login/LoginPassword/LoginPassword";
import { PassParamasType } from "Utils/Hooks/useLoginNavigation";
import { useSelector } from "react-redux";
import { GetUserToken } from "Redux/Selectors";
import { useNavigate } from "react-router-dom";

import "Styles/Layers/Login/LoginLayer.scss";
import LoginEmail from "Pages/Login/LoginEmail/LoginEmail";

interface Props {}

const LoginLayer: React.FunctionComponent<Props> = (props: Props) => {
  const token = useSelector(GetUserToken);

  const navigate = useNavigate();

  useMemo(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="login-layer">
      <LoginSwitcher
        initialRoute={"login-phone"}
        routes={[
          {
            name: "login-phone",
            component: (
              navigate: (v: string) => void,
              back: () => void,
              params: PassParamasType
            ) => <LoginPhone {...{ navigate, back, params }} />,
          },
          {
            name: "login-password",
            component: (
              navigate: (v: string) => void,
              back: () => void,
              params: PassParamasType
            ) => <LoginPassword {...{ navigate, back, params }} />,
          },
          {
            name: "login-code",
            component: (
              navigate: (v: string) => void,
              back: () => void,
              params: PassParamasType
            ) => <LoginCode {...{ navigate, back, params }} />,
          },
          {
            name: "login-email",
            component: (
              navigate: (v: string) => void,
              back: () => void,
              params: PassParamasType
            ) => <LoginEmail {...{ navigate, back, params }} />,
          },
        ]}
      />
    </div>
  );
};

export default LoginLayer;
