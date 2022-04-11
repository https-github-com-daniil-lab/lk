import React from "react";

import "Styles/Pages/Main/ChartBlock/ChartBlockHistory/ChartBlockHistoryWrapper/ChartBlockHistoryWrapper.scss";

interface Props {
  title: string;
  children: React.ReactNode;
}

const ChartBlockHistoryWrapper: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <div className="chart-block-history-wrapper">
      <span className="chart-block-history-wrapper-title"> {props.title}</span>
      {props.children}
    </div>
  );
};

export default ChartBlockHistoryWrapper;
