import React, { useState } from "react";
import { TransactionsSorted } from "Services/Interfaces";
import ChartBlockHistoryWrapper from "./ChartBlockHistoryWrapper/ChartBlockHistoryWrapper";
import ChartBlockHistoryItem from "./ChartBlockHistoryItem/ChartBlockHistoryItem";

import "Styles/Pages/Main/ChartBlock/ChartBlockHistory/ChartBlockHistory.scss";

import BellIcon from "../../../../Static/icons/bell.svg";
import moment from "moment";
import Modal from "Components/Modal/Modal";
import DeleteModal from "Pages/Main/BalanceBlock/DeleteModal/DeleteModal";

interface Props {
  transactions: TransactionsSorted[];
}

const ChartBlockHistory: React.FunctionComponent<Props> = (props: Props) => {
  const { transactions } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  return (
    <div className="chart-block-history">
      {transactions
        .sort((a, b) => (moment(a.date).isAfter(moment(b.date)) ? -1 : 1))
        .map((g, i) => {
          return (
            <ChartBlockHistoryWrapper key={i} date={g.date}>
              {g.transactions.map((transaction, k) => {
                return (
                  <ChartBlockHistoryItem
                    key={k}
                    type={transaction.action}
                    icon={{
                      color: transaction.category?.color.hex,
                      path: transaction.category?.icon.name,
                    }}
                    title={transaction.title}
                    // title={transaction.category?.name ?? transaction.bill.name}
                    subtitle={"**** 1234"}
                    price={transaction.amount}
                    currency={transaction.currency}
                    onClick={() => {
                      console.log(transaction);
                      
                      setTransactionId(transaction.id);
                      setShowDeleteModal(true);
                    }}
                  />
                );
              })}
            </ChartBlockHistoryWrapper>
          );
        })}

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DeleteModal
          closeModal={() => setShowDeleteModal(false)}
          transactionId={transactionId}
        />
      </Modal>
    </div>
  );
};

export default ChartBlockHistory;
