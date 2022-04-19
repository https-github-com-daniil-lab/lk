import React from "react";
import { useTransaction } from "Services/Transaction";
import "Styles/Pages/Main/BalanceBlock/DeleteModal/DeleteModal.scss";

interface Props {
  closeModal: () => void;
  transactionId: string | null;
  deleteOp?: () => void;
}

const DeleteModal: React.FC<Props> = ({
  closeModal,
  transactionId,
  deleteOp,
}) => {
  const { deleteTransaction } = useTransaction(transactionId);

  const handleDeleteTransaction = () => {
    if (deleteOp) deleteOp();
    else deleteTransaction();
    closeModal();
  };

  return (
    <div className="delete">
      <p className="delete__title">Подтверждение удаления</p>
      <p className="delete__body">
        Подтвердите удаление. Данное действие невозможно отменить
      </p>
      <div className="delete__buttons">
        <button className="button-secondary" onClick={closeModal}>
          Отмена
        </button>
        <button className="button-primary" onClick={handleDeleteTransaction}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
