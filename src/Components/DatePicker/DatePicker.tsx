import DrumScrolling from "Components/DrumScrolling/DrumScrolling";
import React, { useMemo, useState } from "react";

import "Styles/Components/DatePicker/DatePicker.scss";
import useCalendar from "Utils/Hooks/useCalendar";

interface Props {
  onClose: () => void;
  onEnter: (v: string) => void;
}

type SortedType =
  | "date"
  | "currentWeek"
  | "pastWeek"
  | "currentMonth"
  | "pastMonth";

const DatePicker: React.FunctionComponent<Props> = ({
  onClose,
  onEnter,
}: Props) => {
  const [typeSorted, setTypeSorted] = useState<SortedType>("date");
  const {
    months,
    getMonthDays,
    yearHandler,
    monthHandler,
    dayHandler,
    generateArrayOfYears,
    year,
    day,
    month,
    getNumber,
  } = useCalendar();
  const setSorted = (v: SortedType): void => setTypeSorted(v);

  const _sorted = (): void => {
    onEnter(
      typeSorted === "date"
        ? `${year}-${getNumber(month, "month")}-${getNumber(day, "day")}`
        : typeSorted
    );
    onClose();
  };

  useMemo(() => {
    setTypeSorted("date");
  }, [year, day, month]);

  return (
    <div className="datepicker">
      <span className="datepicker-title">Календарь</span>
      <div className="datepicker-select">
        <div
          onClick={() => setSorted("currentWeek")}
          className={`datepicker-select-item ${
            typeSorted === "currentWeek" ? "active" : ""
          }`}
        >
          <span>Текущая неделя</span>
        </div>
        <div
          onClick={() => setSorted("pastWeek")}
          className={`datepicker-select-item ${
            typeSorted === "pastWeek" ? "active" : ""
          }`}
        >
          <span>Прошлая неделя</span>
        </div>
        <div
          onClick={() => setSorted("currentMonth")}
          className={`datepicker-select-item ${
            typeSorted === "currentMonth" ? "active" : ""
          }`}
        >
          <span>Текущий месяц</span>
        </div>
        <div
          onClick={() => setSorted("pastMonth")}
          className={`datepicker-select-item ${
            typeSorted === "pastMonth" ? "active" : ""
          }`}
        >
          <span>Прошлый месяц</span>
        </div>
      </div>
      <div className="datepicker-calendar">
        <DrumScrolling data={months} handler={monthHandler} tag="month" />
        <DrumScrolling
          data={[...getMonthDays()]}
          handler={dayHandler}
          tag="day"
        />
        <DrumScrolling
          data={[...generateArrayOfYears()]}
          handler={yearHandler}
          tag="year"
        />
      </div>
      <div className="datepicker-controll">
        <button className="button-secondary" onClick={onClose}>
          Отмена
        </button>
        <button onClick={_sorted} className="button-primary">
          Применить
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
