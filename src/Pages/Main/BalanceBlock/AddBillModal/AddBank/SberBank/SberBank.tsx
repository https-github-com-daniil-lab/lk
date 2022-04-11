import DateField from "Components/DateField/DateField";
import React, { useState } from "react";
import Bill from "Services/Bill";
import "Styles/Pages/Main/BalanceBlock/AddBillModal/AddBank/SberBank/SberBank.scss";
import PhoneMask from "Utils/PhoneMask";

interface Props {
  onClose: () => void;
}

const SberBank: React.FunctionComponent<Props> = ({ onClose }: Props) => {
  const [login, setLogin] = useState<string>("");
  const [date, setDate] = useState<string | null>(null);

  const _handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const mask = PhoneMask(event.target.value);
    setLogin(mask);
  };

  const { useSber } = Bill;
  const { syncSber } = useSber(login, date);
  const _connect = async (): Promise<void> => {
    await syncSber();
  };

  return (
    <div className="sber-bank">
      <span className="add-bill-modal-title">Сбербанк</span>
      <p>
        Компании Wallet App недоступны ваши данные. Они шифруются и хранятся у
        вас в телефоне.
        <br />
        Синхронизация данных не позволяет переводить деньги с вашего счета!
      </p>
      <div className="row">
        <span>Введите логин от мобильного банка</span>
        <input
          type="text"
          value={login}
          onChange={_handlePhone}
          placeholder="+7**********"
        />
      </div>

      <DateField date={date} setDate={setDate} label="Дата загрузки операций" />

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

export default SberBank;
