import ContextButton from "Components/ContextButton/ContextButton";
import DatePicker from "Components/DatePicker/DatePicker";
import React, { useState } from "react";
import CalendarDark from "Static/icons/calendar-dark.svg";
import "Styles/Components/DateField/DateField.scss";

interface Props {
  label: string;
  date: string | null;
  setDate: (state: string | null) => void;
}

const DateField = ({ label, date, setDate }: Props) => {
  const [expand, setExpand] = useState<boolean>(false);

  const onEnter = (v: string[]): void => {
    setDate(Array.isArray(v) ? v[0] : v);
    setExpand(false);
  };

  return (
    <div className="date-field-row">
      <span className="date-field-row-label">{date ?? label}</span>
      <div style={{ position: "relative" }}>
        <ContextButton
          button={<img src={CalendarDark} />}
          content={(_, ctx) => (
            <DatePicker {...ctx} onEnter={onEnter} type="mini" />
          )}
          style={{ left: -200 }}
        />
      </div>
    </div>
  );
};

export default DateField;
