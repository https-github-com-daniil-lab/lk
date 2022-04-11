import React from "react";
import { useSelector } from "react-redux";
import { GetToasts } from "Redux/Selectors";

import "Styles/Components/Toast/Toast.scss";
import ToastItem from "./ToastItem/ToastItem";

interface Props {}

const Toast: React.FunctionComponent<Props> = (props: Props) => {
  const toasts = useSelector(GetToasts);
  return (
    <div className="toast-container">
      {toasts.map((toast, index) => {
        return (
          <ToastItem
            key={index}
            index={index}
            title={toast.title}
            text={toast.text}
            type={toast.type}
          />
        );
      })}
    </div>
  );
};

export default Toast;
