import React, { useState } from "react";
import DatePicker from "Components/DatePicker/DatePicker";
import Calendar from "Static/icons/calendar-dark.svg";
import "Styles/Pages/Main/ChartBlock/DonutChartBlock/DonutChartBlockCalendar/DonutChartBlockCalendar.scss";
import ContextButton from "Components/ContextButton/ContextButton";

interface Props {
  selectedDate: string[];
  setDate: (v: string[]) => void;
}

const DonutChartBlockCalendar: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { setDate, selectedDate } = props;
  const onEnter = (v: string[]): void => {
    setDate(v);
  };
  return (
    <div className="donut-chart-block-calendar">
      <div></div>
      <span>{selectedDate[0]}</span>
      <ContextButton
        button={<img src={Calendar} alt="Calendar" />}
        content={(_, ctx) => (
          <DatePicker {...ctx} onEnter={onEnter} type="max" />
        )}
      />
    </div>
  );
};

export default DonutChartBlockCalendar;
