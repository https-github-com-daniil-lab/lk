import React, { useState } from "react";

import Load from "Components/Load/Load";

import Bill from "Services/Bill";

import BalanceBlockItem from "./BalanceBlockItem/BalanceBlockItem";

import "Styles/Pages/Main/BalanceBlock/BalanceBlock.scss";

interface Props {}

const BalanceBlock: React.FunctionComponent<Props> = (props: Props) => {
  const { useGetBill, useGetTinkoffCards } = Bill;
  const { load: loadBill, balances, generalBalance } = useGetBill();
  const { load: loadTinkoffCards, cards } = useGetTinkoffCards();

  return (
    <Load {...{ load: loadBill && loadTinkoffCards }} className="balance-block">
      <BalanceBlockItem
        className="general"
        title="Общий баланс"
        price={generalBalance}
      />
      {balances.map((balance, i) => {
        return (
          <BalanceBlockItem
            key={i}
            title={balance.name}
            price={balance.balance.amount}
          />
        );
      })}
      {cards.map((card, i) => {
        return (
          <BalanceBlockItem
            key={i}
            title={card.bankName}
            price={card.balance.amount}
            subtitle={card.cardNumber}
          />
        );
      })}
    </Load>
  );
};

export default BalanceBlock;
