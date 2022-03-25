import React, { useState } from "react";
import DatePicker from "Components/DatePicker/DatePicker";

import Calendar from "Static/icons/calendar.svg";

import "Styles/Pages/Main/ChartBlock/DonutChartBlock/DonutChartBlockCalendar/DonutChartBlockCalendar.scss";
import { setEmitFlags } from "typescript";

interface Props {
  selectedDate: string[];
  setDate: (v: string[]) => void;
}

const DonutChartBlockCalendar: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [expand, setExpand] = useState<boolean>(false);

  const { setDate, selectedDate } = props;
  const onEnter = (v: string[]): void => {
    if (Array.isArray(v)) {
      setDate(v);
    } else {
      setDate([v]);
    }
    setExpand(false);
  };
  return (
    <div className="donut-chart-block-calendar">
      <div></div>
      <span>{selectedDate[0]}</span>
      <div>
        <img onClick={() => setExpand(true)} src={Calendar} alt="Calendar" />
        <DatePicker
          onClose={() => setExpand(false)}
          onEnter={onEnter}
          show={expand}
          type="max"
        />
      </div>
    </div>
  );
};

export default DonutChartBlockCalendar;
