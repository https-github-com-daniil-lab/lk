import React, { useState } from "react";
import Bill from "Services/Bill";

import "Styles/Pages/Main/BalanceBlock/AddBillModal/AddBank/SberBank/SberBank.scss";

interface Props {}

const SberBank: React.FunctionComponent<Props> = (props: Props) => {
  const [login, setLogin] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const { useSber } = Bill;
  const sber = useSber(login, date);
  const _connect = async (): Promise<void> => {};

  return (
    <div className="sber-bank">
      <span className="add-bill-modal-title">Сбербанк</span>
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
          onChange={(e) => setLogin(e.target.value)}
          placeholder="+7**********"
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
      <button className="button-primary" onClick={() => {}}>
        Подключить
      </button>
    </div>
  );
};

export default SberBank;
