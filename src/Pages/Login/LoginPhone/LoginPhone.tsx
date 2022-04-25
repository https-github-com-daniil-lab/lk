import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Redux/Store";
import Auth from "Services/Auth";
import Logo from "Static/Images/Logo.svg";
import "Styles/Pages/Login/LoginPhone/LoginPhone.scss";
import { LoginSwitcherParams } from "Utils/Hooks/useLoginNavigation";
import PhoneMask from "Utils/PhoneMask";

const LoginPhone: React.FC<LoginSwitcherParams> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { navigate } = props;

  const [phone, setPhone] = useState<string>("");
  const [type, setType] = useState<"signin" | "restore">("signin");

  const _handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const mask = PhoneMask(event.target.value);
    setPhone(mask);
  };

  const _auth = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const auth = new Auth(dispatch);

    const isRegister = await auth.ChekRegister(phone);

    if (isRegister && type === "signin") {
      navigate("login-password", {
        phone,
        type,
      });
    } else {
      const id = await auth.SmsSubmit(phone);
      if (id)
        navigate("login-code", {
          phone,
          id,
          type,
        });
    }
  };

  const handleRestore = () => {
    navigate("restore-password", {});
  };

  return (
    <form onSubmit={_auth} className={`login-phone`}>
      <img src={Logo} alt="Wallet Box" className="login-phone-logo" />
      <input
        type="text"
        value={phone}
        onChange={_handlePhone}
        placeholder="Номер телефона"
        style={{ textAlign: "center" }}
        required
      />
      <p className="login-phone-subtitle">
        Введите номер мобильного телефона
        <br />
        Например: +7 987 654 32 10
      </p>
      <p className="login-phone-subtitle">
        Авторизуясь, вы соглашаетесь с<br />
        <a
          href="https://walletbox.app/uploads/policy.pdf"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#6a82fb" }}
        >
          условиями использования и политикой
          <br />
          конфиденциальности
        </a>
      </p>
      <button
        className="button-info"
        type="submit"
        onClick={() => setType("signin")}
        style={{
          width: "262px",
          height: "60px",
        }}
      >
        Продолжить
      </button>
      <button
        className="login-phone-subtitle"
        type="submit"
        onClick={() => setType("restore")}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          background: "none",
          border: "none",
        }}
      >
        Восстановить аккаунт
      </button>
    </form>
  );
};

export default LoginPhone;
