import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { AppDispatch } from "Redux/Store";

import Auth from "Services/Auth";

import PhoneMask from "Utils/PhoneMask";

import { LoginSwitcherParams } from "Utils/Hooks/useLoginNavigation";

import Logo from "Static/Images/Logo.svg";

import "Styles/Pages/Login/LoginPhone/LoginPhone.scss";

interface Props extends LoginSwitcherParams {}

const LoginPhone: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { navigate } = props;

  const [phone, setPhone] = useState<string>("");

  const _handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const mask = PhoneMask(event.target.value);
    setPhone(mask);
  };

  const _auth = async (): Promise<void> => {
    const auth = new Auth(dispatch);

    const isRegister = await auth.ChekRegister(phone);

    if (isRegister) {
      navigate("login-password", {
        phone,
        type: "signin",
      });
    } else {
      const id = await auth.SmsSubmit(phone);
      if (id)
        navigate("login-code", {
          phone,
          id,
        });
    }
  };

  return (
    <div className={`login-phone`}>
      <img src={Logo} alt="Wallet Box" className="login-phone-logo" />
      <input
        type="text"
        value={phone}
        onChange={_handlePhone}
        placeholder="Номер телефона"
        style={{ textAlign: "center" }}
      />
      <p className="login-phone-subtitle">
        Введите номер мобильного телефона
        <br />
        Например: +7 987 654 32 10
      </p>
      <p className="login-phone-subtitle">
        Авторизуясь, вы соглашаетесь с<br />
        <span>
          условиями использования и политикой
          <br />
          конфиденциальности
        </span>
      </p>
      <button className="button-primary" onClick={_auth}>
        Продолжить
      </button>
    </div>
  );
};

export default LoginPhone;
