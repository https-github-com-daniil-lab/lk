import React, { useMemo, useRef, useState, useEffect } from "react";
import useCalendar from "Utils/Hooks/useCalendar";
import useDraggableScroll from "Utils/Hooks/useDraggableScroll";
import Datetime from "Utils/Datetime";
import ArrayUtils from "Utils/ArrayUtils";
import moment from "moment";

import "Styles/Components/DatePicker/DatePicker.scss";

const ITEM_HEIGHT = 30;
const selected = "active";

interface VScrollProp {
  data: any[];
  tag: string;
  handler: (v: string[]) => void;
}

const VScroll: React.FunctionComponent<VScrollProp> = (props: VScrollProp) => {
  const { data, tag, handler } = props;
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, { direction: "vertical" });

  const check = (e): void => {
    const rect = e.target.getBoundingClientRect();
    const centerCell: Element | null = document.elementFromPoint(
      rect.left + e.target.offsetWidth / 2,
      rect.top + e.target.offsetHeight / 2
    );
    for (const cell of e.target.getElementsByClassName(selected)) {
      cell.classList.remove(selected);
    }
    centerCell?.classList.add(selected);
    let v = centerCell?.textContent;
    handler(v);
  };

  const extendedItems = ["", "", ...data, "", ""];

  useEffect(() => {
    const scrollport: any = document.querySelector(`.${tag}`);
    scrollport.addEventListener("scroll", (event) => {
      check(event);
    });
  }, []);

  return (
    <div ref={ref} onMouseDown={onMouseDown} className={tag}>
      {extendedItems.map((item, i) => (
        <span key={i} style={{ height: ITEM_HEIGHT }}>
          {item}
        </span>
      ))}
    </div>
  );
};

interface Props {
  onClose: () => void;
  onEnter: (v: string[]) => void;
  type?: "max" | "mini";
  show: boolean;
  style?: React.CSSProperties | undefined;
}

type HandleClickType = "ThisWeek" | "LastWeek" | "CurrentMonth" | "LastMonth";

const DatePicker: React.FunctionComponent<Props> = (props: Props) => {
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

  const [date, setDate] = useState<string | string[]>(
    moment().format("YYYY-MM-DD")
  );

  const { getCurrentWeek, getLastWeek, getDaysOfMonth, getDaysOfLastMonth } =
    Datetime;
  const { compare } = ArrayUtils;

  const _handleClick = (type: HandleClickType): void => {
    if (Array.isArray(date)) setDate(moment().format("YYYY-MM-DD"));
    if (type === "ThisWeek") {
      const d = getCurrentWeek();
      setDate(d);
    }
    if (type === "LastWeek") {
      const d = getLastWeek();

      setDate(d);
    }
    if (type === "CurrentMonth") {
      const d = getDaysOfMonth();
      setDate(d);
    }
    if (type === "LastMonth") {
      const d = getDaysOfLastMonth();
      setDate(d);
    }
  };

  const _handleScroll = (v: string, type: "month" | "day" | "year"): void => {
    if (type === "month") {
      let m = months.indexOf(v) + 1;
      let d = date[0].split("-");
      d[1] = getNumber(m);
      setDate(d.join("-"));
    }

    if (type === "day") {
      let d = date.split("-");
      d[2] = getNumber(v);
      setDate(d.join("-"));
    }

    if (type === "year") {
      let d = date.split("-");
      d[0] = v;
      setDate(d.join("-"));
    }
  };

  const isThisWeek = useMemo(() => {
    const d = getCurrentWeek();
    const is = compare(date, d);
    if (is) {
      return true;
    } else {
      return false;
    }
  }, [date]);

  const isLastWeek = useMemo(() => {
    const d = getLastWeek();
    const is = compare(date, d);
    if (is) {
      return true;
    } else {
      return false;
    }
  }, [date]);

  const isCurrentMonth = useMemo(() => {
    const d = getDaysOfMonth();
    const is = compare(date, d);
    if (is) {
      return true;
    } else {
      return false;
    }
  }, [date]);

  const isLastMonth = useMemo(() => {
    const d = getDaysOfLastMonth();
    const is = compare(date, d);
    if (is) {
      return true;
    } else {
      return false;
    }
  }, [date]);

  if (!props.show) return null;

  return (
    <div>
      <div className="datepicker-backdrop" onClick={props.onClose}></div>
      <div className="datepicker noselect" style={props.style}>
        {props.type === "max" && (
          <div className="datepicker-max">
            <div
              onClick={() => _handleClick("ThisWeek")}
              className={`datepicker-max-item ${isThisWeek ? "active" : ""}`}
            >
              <span>Текущая неделя</span>
            </div>
            <div
              onClick={() => _handleClick("LastWeek")}
              className={`datepicker-max-item ${isLastWeek ? "active" : ""}`}
            >
              <span>Прошлая неделя</span>
            </div>
            <div
              onClick={() => _handleClick("CurrentMonth")}
              className={`datepicker-max-item ${
                isCurrentMonth ? "active" : ""
              }`}
            >
              <span>Текущий месяц</span>
            </div>
            <div
              onClick={() => _handleClick("LastMonth")}
              className={`datepicker-max-item ${isLastMonth ? "active" : ""}`}
            >
              <span>Прошлый месяц</span>
            </div>
          </div>
        )}
        <div className="datepicker-wrapper" style={{ height: ITEM_HEIGHT * 3 }}>
          <VScroll
            data={months}
            tag={"months-select"}
            handler={(v) => _handleScroll(v, "month")}
          />
          <VScroll
            data={getMonthDays()}
            tag={"days-select"}
            handler={(v) => _handleScroll(v, "day")}
          />
          <VScroll
            data={generateArrayOfYears()}
            tag={"years-select"}
            handler={(v) => _handleScroll(v, "year")}
          />
        </div>
        <div className="datepicker-controll">
          <button className="button-secondary" onClick={props.onClose}>
            Отмена
          </button>
          <button
            className="button-primary"
            onClick={() => props.onEnter(date)}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
