import React from "react";

import "Styles/Pages/Main/BalanceBlock/AddBillModal/AddBillModal.scss";

interface Props {}

const AddBillModal: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="add-bill-modal">
      <span className="add-bill-modal-title">Добавить счет</span>
      <div className="add-bill-modal-block">
        <div>
          <span>Наименование счета</span>
          <input type="text" placeholder="Наименование" />
        </div>
        <div>
          <span>Текущий баланс</span>
          <input type="text" placeholder="Баланс" />
        </div>
      </div>
    </div>
  );
};

export default AddBillModal;
