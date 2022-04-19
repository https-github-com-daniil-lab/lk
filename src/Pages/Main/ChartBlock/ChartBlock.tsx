import React from "react";
import Transaction from "Services/Transaction";
import DonutChartBlock from "./DonutChartBlock/DonutChartBlock";
import Load from "Components/Load/Load";
import ChartBlockHistory from "./ChartBlockHistory/ChartBlockHistory";
import "Styles/Pages/Main/ChartBlock/ChartBlock.scss";

interface Props {
  selectedBill: string | null;
}

const ChartBlock: React.FunctionComponent<Props> = ({ selectedBill }) => {
  const { useGetTransaction } = Transaction;
  const {
    load,
    allTransactions,
    selectedDate,
    setDate,
    prices,
    income,
    expenses,
    next,
    prev,
  } = useGetTransaction(selectedBill);

  return (
    <Load {...{ load }}>
      <div className="chart-block">
        <ChartBlockHistory
          transactions={allTransactions}
          selectedBill={selectedBill}
        />
        {load ? (
          <DonutChartBlock
            data={prices}
            income={income}
            expenses={expenses}
            {...{ selectedDate, setDate }}
            next={next}
            prev={prev}
          />
        ) : null}
      </div>
    </Load>
  );
};

export default ChartBlock;
