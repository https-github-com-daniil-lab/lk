import React, { useRef } from "react";
import Bill from "Services/Bill";
import { IBalances } from "Services/Interfaces";

import "Styles/Pages/Main/ChartBlock/AddOperationModal/BillList/BillList.scss";
import useDraggableScroll from "Utils/Hooks/useDraggableScroll";

interface Props {
  onClose: () => void;
  handler: (v: IBalances) => void;
}

const BillList: React.FunctionComponent<Props> = ({
  onClose,
  handler,
}: Props) => {
  const { useGetBill } = Bill;
  const { balances, load } = useGetBill();

  const ref = useRef(null);

  const { onMouseDown } = useDraggableScroll(ref, { direction: "vertical" });

  const _selectBill = (balance: IBalances): void => {
    handler(balance);
    onClose();
  };

  if (!load) return null;

  return (
    <div className="bill-list" ref={ref} onMouseDown={onMouseDown}>
      {balances.map((balance, i) => {
        return (
          <div
            className="bill-list-item"
            key={i}
            onClick={() => _selectBill(balance)}
          >
            {balance.name}
          </div>
        );
      })}
    </div>
  );
};

export default BillList;
