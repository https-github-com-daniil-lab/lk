import DateField from "Components/DateField/DateField";
import React, { useState } from "react";
import User from "Services/User";

import "Styles/Pages/Settings/UserBlock/UserModal/UserModal.scss";

interface Props {
  onClose: () => void;
}

const ModalRemoveData: React.FC<Props> = ({ onClose }) => {
  const { useRemoveData } = User;
  const [startDate, setStartDate] = useState<string[] | null>(null);
  const [endDate, setEndDate] = useState<string[] | null>(null);

  const { removeData } = useRemoveData(startDate, endDate);

  const handleStartDate = (state: string[] | null) => {
    setStartDate(state);
  };

  const handleEndDate = (state: string[] | null) => {
    setEndDate(state);
  };

  const handleClick = async () => {
    await removeData();
    onClose();
  };

  return (
    <div className="user-modal">
      <span>Удалить данные</span>

      <DateField
        label="Начало периода"
        date={startDate}
        setDate={handleStartDate}
      />
      <DateField label="Конец периода" date={endDate} setDate={handleEndDate} />

      <div className="tip">
        <span className="tip__text">
          Данные операций за выбранный период будут безвозвратно удалены
        </span>
      </div>

      <div className="buttons">
        <button className="button-secondary" onClick={onClose}>
          Отмена
        </button>
        <button className="button-primary" onClick={handleClick}>
          Продолжить
        </button>
      </div>

      <div className="delete">
        <span className="delete__link">Удалить все данные</span>
      </div>
    </div>
  );
};

export default ModalRemoveData;
