import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { HideToast } from "Redux/Actions";
import { IToast } from "Redux/StateInterface";
import { AppDispatch } from "Redux/Store";

import "Styles/Components/Toast/ToastItem/ToastItem.scss";

interface Props extends IToast {
  index: number;
}

const ToastItem: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [hide, setHide] = useState<boolean>(false);

  const _hideToast = (): void => setHide(true);

  useMemo(() => {
    if (hide) {
      setTimeout(() => {
        dispatch(HideToast(props.index));
      }, (props.index + 1) * 2000);
    }
  }, [hide]);

  useEffect(() => {
    setTimeout(() => {
      _hideToast();
    }, (props.index + 1) * 2000);
  }, []);

  return (
    <div
      id={"toast-" + props.index}
      className={`toast ${props.type === "error" ? "error" : "success"} ${
        hide && "fadeOut"
      }`}
    >
      <div className="toast-title">
        <h4 className="cooltoast-title">{props.title}</h4>
      </div>
      <div className="toast-text">
        <p className="cooltoast-text">{props.text}</p>
      </div>
    </div>
  );
};

export default ToastItem;
