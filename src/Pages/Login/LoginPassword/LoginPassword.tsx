import React, { useEffect, useState } from "react";

import Auth from "Services/Auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Redux/Store";
import { LoginSwitcherParams } from "Utils/Hooks/useLoginNavigation";

import Logo from "Static/Images/Logo.svg";

import "Styles/Pages/Login/LoginPassword/LoginPassword.scss";

interface Props extends LoginSwitcherParams {}

const LoginPassword: React.FunctionComponent<Props> = (props: Props) => {
  const { params } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [password, setPassword] = useState<string>("");

  const _confirm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (params.type === "signin") {
      const auth = new Auth(dispatch);
      if (params.phone) await auth.SignIn(params.phone, password);
    } else if (params.type === "signup") {
      props.navigate("login-email", {
        id: props.params.id,
        phone: props.params.phone,
        type: props.params.type,
        password,
      });
    } else if (params.type === 'restore') {
      // TODO
    }
  };

  return (
    <form onSubmit={_confirm} className={`login-password`}>
      <img src={Logo} alt="Wallet Box" className="login-password-logo" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
        style={{ textAlign: "center" }}
      />
      <div className="login-password-info">
        <p className="login-password-subtitle">Введите пароль для входа</p>
      </div>
      <button className="button-info" type="submit">
        Продолжить
      </button>
      <button className="button-secondary" type="button" onClick={props.back}>
        Отмена
      </button>
    </form>
  );
};

export default LoginPassword;
