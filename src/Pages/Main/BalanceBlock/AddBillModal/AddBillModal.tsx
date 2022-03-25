import React, { useState } from "react";

import Bill from "Services/Bill";

import Modal from "Components/Modal/Modal";
import AddBank from "./AddBank/AddBank";

import CardIcon from "Static/icons/card.svg";

import "Styles/Pages/Main/BalanceBlock/AddBillModal/AddBillModal.scss";

interface Props {
  onClose: () => void;
}

const AddBillModal: React.FunctionComponent<Props> = ({ onClose }: Props) => {
  const [name, setName] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const [addBankModal, setAddBankModal] = useState<boolean>(false);

  const { useAddBill } = Bill;
  const { addBill } = useAddBill(name, balance);

  const addDefaulBill = async (): Promise<void> => {
    await addBill();
    onClose();
  };

  return (
    <div className="add-bill-modal">
      <span className="add-bill-modal-title">Добавить счет</span>
      <div className="add-bill-modal-block">
        <div>
          <span>Наименование счета</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Наименование"
          />
        </div>
        <div>
          <span>Текущий баланс</span>
          <input
            type="text"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Баланс"
          />
        </div>
      </div>

      <button
        className="button-secondary"
        onClick={() => setAddBankModal(true)}
      >
        <div className="add-carn-button-wrapper">
          <span>
            <img src={CardIcon} />
            Подключить банковский счет
          </span>
        </div>
      </button>

      <p>
        Подключите приложение к счету и все операции из банка будут
        автоматически загружаться в приложение
      </p>

      <p>
        Перед использованием ознакомьтесь, с{" "}
        <span>условиями использования и политикой конфиденциальности</span>
      </p>

      <div className="bill-modal-controll">
        <button className="button-secondary" onClick={onClose}>
          Отмена
        </button>
        <button className="button-primary" onClick={addDefaulBill}>
          Добавить
        </button>
      </div>
      <Modal
        zIndex={10}
        show={addBankModal}
        onClose={() => setAddBankModal(false)}
      >
        <AddBank onClose={() => setAddBankModal(false)} />
      </Modal>
    </div>
  );
};

export default AddBillModal;
