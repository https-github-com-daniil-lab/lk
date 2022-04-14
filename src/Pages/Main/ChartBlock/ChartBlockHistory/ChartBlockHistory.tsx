import React from "react";
import { TransactionsSorted } from "Services/Interfaces";
import ChartBlockHistoryWrapper from "./ChartBlockHistoryWrapper/ChartBlockHistoryWrapper";
import ChartBlockHistoryItem from "./ChartBlockHistoryItem/ChartBlockHistoryItem";

import "Styles/Pages/Main/ChartBlock/ChartBlockHistory/ChartBlockHistory.scss";

import BellIcon from "../../../../Static/icons/bell.svg";
import moment from "moment";

interface Props {
  transactions: TransactionsSorted[];
}

const ChartBlockHistory: React.FunctionComponent<Props> = (props: Props) => {
  const { transactions } = props;

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
                  />
                );
              })}
            </ChartBlockHistoryWrapper>
          );
        })}
    </div>
  );
};

export default ChartBlockHistory;
