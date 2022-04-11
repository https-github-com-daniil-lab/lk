import React, { useState } from "react";
import User from "Services/User";

import "Styles/Pages/Settings/UserBlock/UserModal/UserModal.scss";

interface Props {
  onClose: () => void;
}

const ModalPhone: React.FunctionComponent<Props> = ({ onClose }: Props) => {
  const [phone, setPhone] = useState<string>("");
  const { useEditPhone } = User;
  const { setEditablePhone } = useEditPhone(phone);
  const _handlePhone = async (): Promise<void> => {
    await setEditablePhone();
    onClose();
  };
  return (
    <div className="user-modal">
      <span>Редактирование номера</span>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Введите новый номер телефона"
      />
      <button className="button-primary" onClick={_handlePhone}>
        Изменить
      </button>
      <button className="button-secondary" onClick={onClose}>
        Отмена
      </button>
    </div>
  );
};

export default ModalPhone;
