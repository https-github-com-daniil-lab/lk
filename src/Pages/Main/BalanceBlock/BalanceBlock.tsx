import React, { useState } from "react";

import Load from "Components/Load/Load";

import Bill from "Services/Bill";

import BalanceBlockItem from "./BalanceBlockItem/BalanceBlockItem";

import "Styles/Pages/Main/BalanceBlock/BalanceBlock.scss";

interface Props {}

const BalanceBlock: React.FunctionComponent<Props> = (props: Props) => {
  const { useGetBill, useTinkoff } = Bill;
  const { load, balances, generalBalance } = useGetBill();

  const { transactions } = useTinkoff();

  return (
    <Load {...{ load }} className="balance-block">
      <BalanceBlockItem
        className="general"
        title="Общий баланс"
        price={generalBalance}
      />
      {[...balances, ...transactions].map((balance, i) => {
        return (
          <BalanceBlockItem
            key={i}
            title={balance.name}
            price={balance.balance.amount}
          />
        );
      })}
    </Load>
  );
};

export default BalanceBlock;
