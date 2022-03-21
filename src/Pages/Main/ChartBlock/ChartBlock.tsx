import React from "react";
import Transaction from "Services/Transaction";

import Load from "Components/Load/Load";
import ChartBlockHistory from "./ChartBlockHistory/ChartBlockHistory";

import "Styles/Pages/Main/ChartBlock/ChartBlock.scss";
import DonutChartBlock from "./DonutChartBlock/DonutChartBlock";

interface Props {}

const ChartBlock: React.FunctionComponent<Props> = (props: Props) => {
  const { useGetTransaction } = Transaction;

  const {
    load,
    transactions,
    prices,
    income,
    expenses,
    prev,
    next,
    selectedDate,
    setDate,
  } = useGetTransaction();

  return (
    <Load {...{ load }}>
      <div className="chart-block">
        <ChartBlockHistory {...{ transactions }} />
        <DonutChartBlock
          data={prices}
          income={income}
          expenses={expenses}
          {...{ selectedDate, setDate }}
        />
      </div>
    </Load>
  );
};

export default ChartBlock;
