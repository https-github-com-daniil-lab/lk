import React, { useState } from "react";
import { LoginSwitcherParams } from "Utils/Hooks/useLoginNavigation";

import Logo from "Static/Images/Logo.svg";
import TextFieldPrimary from "Components/TextFieldPrimary/TextFieldPrimary";

import "Styles/Pages/Login/LoginEmail/LoginEmail.scss";
import Auth from "Services/Auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Redux/Store";
import Select from "Components/Select/Select";
import useGetWallets from "Services/Wallets";
import { IWallet } from "Services/Interfaces";

interface Props extends LoginSwitcherParams {}

const LoginEmail: React.FunctionComponent<Props> = (props: Props) => {
  const { navigate, params } = props;

  const dispatch = useDispatch<AppDispatch>();

  const { load, wallets } = useGetWallets();

  const [email, setemail] = useState<string>("");
  const [wallet, setWallet] = useState<IWallet | null>(null);

  const _confirm = async (): Promise<void> => {
    const auth = new Auth(dispatch);
    const confirmed = await auth.CreateUser(
      props.params.phone,
      props.params.password,
      wallet?.walletSystemName,
      email,
      "SYSTEM"
    );
  };

  return (
    <div className={`login-email glassmorphism`}>
      <img src={Logo} alt="Wallet Box" className="login-email-logo" />
      <input
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Введите Email"
        style={{ textAlign: "center" }}
      />
      <div className="login-email-wallet">
        <span>Выберите валюту:</span>
        <Select
          value={wallet?.walletDisplayName ?? null}
          data={wallets.map((i) => ({
            label: i.walletDisplayName,
          }))}
          handler={(index) => {
            setWallet(wallets[index]);
          }}
        />
      </div>
      <div className="login-email-button-wrapper">
        <button className="button-primary" onClick={_confirm}>
          Продолжить
        </button>
        <button className="button-secondary" onClick={props.back}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default LoginEmail;
