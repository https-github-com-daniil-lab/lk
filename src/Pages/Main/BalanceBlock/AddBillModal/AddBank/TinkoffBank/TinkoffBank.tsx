import DateField from "Components/DateField/DateField";
import React, { useState } from "react";
import Bill from "Services/Bill";
import "Styles/Pages/Main/BalanceBlock/AddBillModal/AddBank/TinkoffBank/TinkoffBank.scss";
import PhoneMask from "Utils/PhoneMask";

interface Props {
  onClose: () => void;
}

const TinkoffBank: React.FunctionComponent<Props> = ({ onClose }: Props) => {
  const { useTinkoff } = Bill;

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [date, setDate] = useState<string | null>(null);

  const { signin, syncTinkoff, status } = useTinkoff(
    login,
    date,
    password,
    code
  );

  const _handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const mask = PhoneMask(event.target.value);
    setLogin(mask);
  };

  const _connect = async (): Promise<void> => {
    if (status === "signin") await signin();
    if (status === "code") await syncTinkoff();
  };

  return (
    <div className="tinkoff-bank">
      <span className="add-bill-modal-title">Тинькофф</span>
      <div className="tinkoff-bank-container">
        <span>Введите логин от мобильного банка</span>
        <input
          type="text"
          value={login}
          onChange={_handlePhone}
          placeholder="+7**********"
        />
      </div>
      <DateField date={date} setDate={setDate} label="Дата загрузки операций" />

      {status === "code" && (
        <>
          <p>
            Компании Wallet App недоступны ваши данные. Они шифруются и хранятся
            у вас в телефоне.
            <br />
            Синхронизация данных не позволяет переводить деньги с вашего счета!
          </p>

          <div className="tinkoff-bank-container">
            <span>Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
          </div>

          <div className="tinkoff-bank-container">
            <span>Код из смс</span>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Код"
            />
          </div>
        </>
      )}

      <div className="buttons">
        <button className="button-secondary" onClick={onClose}>
          Отмена
        </button>

        <button className="button-primary" onClick={_connect}>
          Подключить
        </button>
      </div>
    </div>
  );
};

export default TinkoffBank;
