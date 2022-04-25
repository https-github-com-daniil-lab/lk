import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Redux/Store";
import Auth from "Services/Auth";
import Logo from "Static/Images/Logo.svg";
import "Styles/Pages/Login/LoginCode/LoginCode.scss";
import { LoginSwitcherParams } from "Utils/Hooks/useLoginNavigation";

interface Props extends LoginSwitcherParams {}

const LoginCode: React.FunctionComponent<Props> = (props: Props) => {
  const { navigate, params } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [code, setCode] = useState<string>("");

  const _confirm = async (): Promise<void> => {
    const auth = new Auth(dispatch);
    if (params.id && params.phone) {
      const confirmed =
        params.type === "restore"
          ? await auth.SmsAuth(params.id, code)
          : await auth.SmsConfirm(params.id, code);

      if (confirmed) {
        navigate("login-password", {
          phone: params.phone,
          type: params?.type || "signup",
        });
      }
    }
  };

  return (
    <div className={`login-code`}>
      <img src={Logo} alt="Wallet Box" className="login-code-logo" />
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Введите код"
        style={{
          textAlign: "center",
        }}
      />
      <div className="login-code-info">
        <p className="login-code-subtitle">Подтердите номер телефона</p>
      </div>
      <div className="login-code-button-wrapper">
        <button className="button-secondary" onClick={props.back}>
          Назад
        </button>
        <button className="button-info" onClick={_confirm}>
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default LoginCode;
