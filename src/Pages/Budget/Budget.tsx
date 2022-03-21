import React from "react";
import ExpenseIncomeBlock from "./ExpenseIncomeBlock/ExpenseIncomeBlock";

import "Styles/Pages/Budget/Budget.scss";

interface Props {}

const Budget: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="budget">
      <div className="app-card">
        <div className="app-card-header">
          <div className="content-section-title">Операции</div>
          <div className="content-section-controll"></div>
        </div>
        <ExpenseIncomeBlock />
      </div>
      <div className="app-card">
        <div className="app-card-header">
          <div className="content-section-title">Операции</div>
          <div className="content-section-controll"></div>
        </div>
        <ExpenseIncomeBlock />
      </div>
    </div>
  );
};

export default Budget;
