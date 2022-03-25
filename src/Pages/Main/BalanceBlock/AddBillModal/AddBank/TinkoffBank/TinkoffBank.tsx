import React, { useState } from "react";
import Bill from "Services/Bill";
import PhoneMask from "Utils/PhoneMask";

import "Styles/Pages/Main/BalanceBlock/AddBillModal/AddBank/TinkoffBank/TinkoffBank.scss";

interface Props {}

const TinkoffBank: React.FunctionComponent<Props> = (props: Props) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [date, setDate] = useState<string>("");

  const { useTinkoff } = Bill;
  const { signin, syncTinkoff, status } = useTinkoff(
    login,
    password,
    date,
    code
  );

  const _connect = async (): Promise<void> => {
    if (status === "signin") await signin();
    if (status === "code") await syncTinkoff();
  };

  const _handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const mask = PhoneMask(event.target.value);
    setLogin(mask);
  };

  return (
    <div
      className="tinkoff-bank"
      style={{
        gridTemplateRows: `0.3fr 1fr 1fr 1.2fr 1fr ${
          status === "code" ? "1fr" : ""
        } 0.7fr`,
      }}
    >
      <span className="add-bill-modal-title">Тинькофф</span>
      <p>
        Компании Wallet App недоступны ваши данные. Они шифруются и хранятся у
        вас в телефоне.
        <br />
        Синхронизация данных не позволяет переводить деньги с вашего счета!
      </p>
      <div>
        <span>Введите логин от мобильного банка</span>
        <input
          type="text"
          value={login}
          onChange={_handlePhone}
          placeholder="+7**********"
        />
      </div>
      <div>
        <span>
          Пароль от интернет-банка и пин-код для входа в приложение
          Тинькофф-различные пароли.
          <br />
          Его необходимо активировать в ЛК банка
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
      </div>
      <div>
        <span>Дата загрузки операций</span>
        <input
          type="text"
          disabled
          value={date}
          onClick={() => alert("calendar")}
          placeholder="21 ноября 2021"
        />
      </div>

      {status === "code" ? (
        <div>
          <span>Код из смс</span>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Код"
          />
        </div>
      ) : null}

      <button className="button-primary" onClick={_connect}>
        Подключить
      </button>
    </div>
  );
};

export default TinkoffBank;
