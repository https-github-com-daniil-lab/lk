import React from "react";
import { TransactionsSorted } from "Services/Interfaces";
import ChartBlockHistoryWrapper from "./ChartBlockHistoryWrapper/ChartBlockHistoryWrapper";
import ChartBlockHistoryItem from "./ChartBlockHistoryItem/ChartBlockHistoryItem";

import "Styles/Pages/Main/ChartBlock/ChartBlockHistory/ChartBlockHistory.scss";

interface Props {
  transactions: TransactionsSorted[];
}

const ChartBlockHistory: React.FunctionComponent<Props> = (props: Props) => {
  const { transactions } = props;


  return (
    <div className="chart-block-history">
      {transactions.map((g, i) => {
        return (
          <ChartBlockHistoryWrapper key={i} title={g.date}>
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
                  //title={transaction.category?.name ?? transaction.bill.name}
                  subtitle={"**** 1234"}
                  price={transaction.amount}
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
