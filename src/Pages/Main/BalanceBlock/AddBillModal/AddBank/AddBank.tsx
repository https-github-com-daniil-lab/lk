import React, { useState } from "react";

import Modal from "Components/Modal/Modal";
import SberBank from "./SberBank/SberBank";
import TinkoffBank from "./TinkoffBank/TinkoffBank";

import PlusFillIcon from "Static/icons/plus.svg";

import "Styles/Pages/Main/BalanceBlock/AddBillModal/AddBank/AddBank.scss";

interface Props {
  onClose: () => void;
}

type BankModalType = {
  content: React.ReactNode | null;
  show: boolean;
};

const AddBank: React.FunctionComponent<Props> = (props: Props) => {
  const [bankModal, setBankModal] = useState<BankModalType>({
    content: null,
    show: false,
  });

  return (
    <div className="add-bank">
      <span className="add-bill-modal-title">Выберите банк</span>
      <div
        className="bank-wrapper"
        onClick={() => setBankModal({ content: <TinkoffBank />, show: true })}
      >
        <span>Тинькофф</span>
        <img src={PlusFillIcon} />
      </div>
      <div
        className="bank-wrapper"
        onClick={() => setBankModal({ content: <SberBank />, show: true })}
      >
        <span>Сбербанк</span>
        <img src={PlusFillIcon} />
      </div>
      <Modal
        zIndex={11}
        show={bankModal.show}
        onClose={() => setBankModal({ show: false, content: null })}
      >
        {bankModal.content ?? <></>}
      </Modal>
    </div>
  );
};

export default AddBank;
