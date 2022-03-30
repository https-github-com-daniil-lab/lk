import React from "react";
import Transaction from "Services/Transaction";
import useCircleChart from "Utils/Hooks/useCircleChart";
import CircleChart from "Components/CircleChart/CircleChart";
import LineChart from "Components/LineChart/LineChart";
import Load from "Components/Load/Load"
import "Styles/Pages/Budget/ExpenseIncomeBlock/ExpenseIncomeBlock.scss";

interface Props { }


const ExpenseIncomeBlock: React.FunctionComponent<Props> = (props: Props) => {
  const { useGetBudget } = Transaction
  const { selectedMonth, expenses, prev, next } = useGetBudget()

  const expense = useCircleChart(67);
  const income = useCircleChart(74);


  return (
    <div className="expense-income-block">
      <div className="expense-income-info">
        <div className="expense-income-header-date expense-income-wrapper">
          <span onClick={prev}>Prev</span>
          <span>{selectedMonth}</span>
          <span onClick={next}>Next</span>
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
              <div>icon</div>
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
