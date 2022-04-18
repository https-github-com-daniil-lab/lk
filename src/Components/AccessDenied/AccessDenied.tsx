import React from "react";
import { Link } from "react-router-dom";
import "Styles/Components/AccessDenied/AccessDenied.scss";

interface Props {
  closeModal: () => void;
  children: string;
}

const AccessDenied: React.FC<Props> = ({ closeModal, children }) => (
  <div className="access">
    <p className="access__title">Доступ ограничен</p>

    <p className="access__body">{children}</p>

    <div className="access__buttons">
      <button className="button-secondary" onClick={closeModal}>
        Закрыть
      </button>
      <Link to="/settings" className="button-primary access__btn">
        Оформить подписку
      </Link>
    </div>
  </div>
);

export default AccessDenied;
