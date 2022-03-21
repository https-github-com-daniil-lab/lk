import React from "react";

import useCircleChart from "Utils/Hooks/useCircleChart";
import CircleChart from "Components/CircleChart/CircleChart";
import LineChart from "Components/LineChart/LineChart";

import "Styles/Pages/Budget/ExpenseIncomeBlock/ExpenseIncomeBlock.scss";

interface Props {}

const TestIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="5" fill="#0038FF" />
      <g
        style={{
          mixBlendMode: "lighten",
        }}
        opacity="0.5"
      >
        <rect
          width="32"
          height="32"
          rx="5"
          fill="url(#paint0_linear_459_1933)"
        />
      </g>
      <path
        d="M18.6667 11.1111C18.176 11.1111 17.7778 10.7129 17.7778 10.2222V8.88886H14.2223V10.2222C14.2223 10.7129 13.824 11.1111 13.3334 11.1111C12.8427 11.1111 12.4445 10.7129 12.4445 10.2222V8.88886C12.4445 7.90842 13.2418 7.11108 14.2223 7.11108H17.7778C18.7583 7.11108 19.5556 7.90842 19.5556 8.88886V10.2222C19.5556 10.7129 19.1574 11.1111 18.6667 11.1111Z"
        fill="white"
      />
      <path
        d="M16.6312 19.0044C16.4712 19.0666 16.24 19.1111 16 19.1111C15.76 19.1111 15.5289 19.0666 15.3156 18.9866L5.33337 15.6622V22.4444C5.33337 23.7955 6.42671 24.8889 7.77782 24.8889H24.2223C25.5734 24.8889 26.6667 23.7955 26.6667 22.4444V15.6622L16.6312 19.0044Z"
        fill="white"
      />
      <path
        d="M26.6667 12.2222V14.2578L16.2134 17.7422C16.1423 17.7689 16.0712 17.7778 16 17.7778C15.9289 17.7778 15.8578 17.7689 15.7867 17.7422L5.33337 14.2578V12.2222C5.33337 10.8711 6.42671 9.77775 7.77782 9.77775H24.2223C25.5734 9.77775 26.6667 10.8711 26.6667 12.2222Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_459_1933"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ExpenseIncomeBlock: React.FunctionComponent<Props> = (props: Props) => {
  const expense = useCircleChart(67);
  const income = useCircleChart(74);

  return (
    <div className="expense-income-block">
      <div className="expense-income-info">
        <div className="expense-income-header-date expense-income-wrapper">
          <span>Prev</span>
          <span>Август 2021</span>
          <span>Next</span>
        </div>
        <div className="expense-income-card expense-income-wrapper">
          <div className="expense-income-card-content">
            <span>Расход</span>
            <span className="expense-income-card-content-title">Сейчас</span>
            <span>68 495 ₽</span>
            <span className="expense-income-card-content-title">
              Запланировано
            </span>
            <span>189 800 ₽</span>
          </div>
          <div className="expense-income-card-bar">
            <CircleChart
              strokeDashoffset={expense.strokeDashOffsetValue}
              color="#F0187B"
            />
            <div className="expense-income-card-bar-value">67%</div>
          </div>
        </div>
        <div className="expense-income-card expense-income-wrapper">
          <div className="expense-income-card-content">
            <span>Доход</span>
            <span className="expense-income-card-content-title">Сейчас</span>
            <span>68 495 ₽</span>
            <span className="expense-income-card-content-title">
              Запланировано
            </span>
            <span>189 800 ₽</span>
          </div>
          <div className="expense-income-card-bar">
            <CircleChart
              strokeDashoffset={income.strokeDashOffsetValue}
              color="#6A82FB"
            />
            <div className="expense-income-card-bar-value">74%</div>
          </div>
        </div>
      </div>
      <div className="expense-income-history expense-income-wrapper">
        {Array.from({ length: 20 }).map((_, i) => {
          return (
            <div key={i} className="expense-income-history-row">
              <TestIcon />
              <div className="expense-income-history-row-info">
                <div>
                  <span className="expense-income-history-row-info-title">
                    Работа
                  </span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.86743 2.22083C5.1954 1.83116 5.8046 1.83116 6.13257 2.22083L10.311 7.18524C10.7522 7.70932 10.3717 8.50001 9.67846 8.50001H1.32154C0.628273 8.50001 0.247849 7.70932 0.688962 7.18523L4.86743 2.22083Z"
                      fill="#6A82FB"
                    />
                  </svg>
                </div>
                <span className="expense-income-history-row-info-amount">
                  75 620 из 85 000 ₽
                </span>
                <LineChart value={45} color="#6A82FB" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseIncomeBlock;
