import LoginSwitcher from "Animations/LoginSwitcher/LoginSwitcher";
import LoginCode from "Pages/Login/LoginCode/LoginCode";
import LoginEmail from "Pages/Login/LoginEmail/LoginEmail";
import LoginPassword from "Pages/Login/LoginPassword/LoginPassword";
import LoginPhone from "Pages/Login/LoginPhone/LoginPhone";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserToken } from "Redux/Selectors";
import "Styles/Layers/Login/LoginLayer.scss";

const LoginLayer = () => {
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
            component: (navigate, back, params) => (
              <LoginPhone {...{ navigate, back, params }} />
            ),
          },
          {
            name: "login-password",
            component: (navigate, back, params) => (
              <LoginPassword {...{ navigate, back, params }} />
            ),
          },
          {
            name: "login-code",
            component: (navigate, back, params) => (
              <LoginCode {...{ navigate, back, params }} />
            ),
          },
          {
            name: "login-email",
            component: (navigate, back, params) => (
              <LoginEmail {...{ navigate, back, params }} />
            ),
          },
        ]}
      />
    </div>
  );
};

export default LoginLayer;
