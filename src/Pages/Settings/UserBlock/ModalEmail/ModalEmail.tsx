import React, { useState } from "react";
import User from "Services/User";

import "Styles/Pages/Settings/UserBlock/UserModal/UserModal.scss";

interface Props {
  onClose: () => void;
}

const ModalEmail: React.FunctionComponent<Props> = ({ onClose }: Props) => {
  const [email, setEmail] = useState<string>("");
  const { useEditEmail } = User;
  const { setEditableEmail } = useEditEmail(email);
  const _handleEmail = async (): Promise<void> => {
    await setEditableEmail();
    onClose();
  };
  return (
    <div className="user-modal">
      <span>Редактирование почты</span>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Введите новый Email"
      />
      <button className="button-primary" onClick={_handleEmail}>
        Изменить
      </button>
      <button className="button-secondary" onClick={onClose}>
        Отмена
      </button>
    </div>
  );
};

export default ModalEmail;
