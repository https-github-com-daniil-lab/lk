import ContextButton from "Components/ContextButton/ContextButton";
import DatePicker from "Components/DatePicker/DatePicker";
import React from "react";

import Calendar from "Static/icons/calendar.svg";

import "Styles/Pages/Main/ChartBlock/DonutChartBlock/DonutChartBlockCalendar/DonutChartBlockCalendar.scss";

interface Props {
  selectedDate: string;
  setDate: (v: string) => void;
}

const DonutChartBlockCalendar: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { setDate, selectedDate } = props;
  const onEnter = (v): void => setDate(v);
  return (
    <div className="donut-chart-block-calendar">
      <div></div>
      <span>{selectedDate}</span>
      <ContextButton
        button={<img src={Calendar} alt="Calendar" />}
        content={({}, onClose) => (
          <DatePicker {...{ onClose }} onEnter={onEnter} />
        )}
      />
    </div>
  );
};

export default DonutChartBlockCalendar;
