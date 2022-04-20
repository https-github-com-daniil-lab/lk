import Load from "Components/Load/Load";
import React from "react";
import Bill from "Services/Bill";
import SberIcon from "Static/Images/sber.png";
import TinkoffIcon from "Static/Images/tinkoff.png";
import "Styles/Pages/Main/BalanceBlock/BalanceBlock.scss";
import BalanceBlockItem from "./BalanceBlockItem/BalanceBlockItem";
import CardBlockItem from "./CardBlockItem/CardBlockItem";

interface Props {
  setSelectedBill: (str: string | null) => void;
  selectedBill: string | null;
}

const BalanceBlock: React.FC<Props> = ({ setSelectedBill, selectedBill }) => {
  const { useGetBill, useGetTinkoffCards, useGetSberCards } = Bill;
  const { load: loadBill, balances, generalBalance } = useGetBill();
  const { load: loadTinkoffCards, cards: tinkoffCards } = useGetTinkoffCards();
  const { load: loadSberCards, cards: sberCards } = useGetSberCards();

  return (
    <Load
      load={loadBill && loadTinkoffCards && loadSberCards}
      className="balance-block"
    >
      <h1 className="balance-block-title">Балансы</h1>
      <BalanceBlockItem
        onClick={() => setSelectedBill(null)}
        className={!selectedBill ? "general" : ""}
        title="Общий баланс"
        price={generalBalance}
      />
      {balances.map((balance) => (
        <BalanceBlockItem
          onClick={(title) => setSelectedBill(title)}
          key={balance.id}
          title={balance.name}
          price={balance.balance.amount}
          className={selectedBill == balance.name ? "general" : ""}
        />
      ))}
      {tinkoffCards.map((card) => (
        <CardBlockItem
          onClick={(title) => setSelectedBill(title)}
          key={card.id}
          title={card.bankName}
          price={card.balance.amount}
          subtitle={card.cardNumber}
          icon={TinkoffIcon}
          className={selectedBill == card.cardNumber ? "general" : ""}
        />
      ))}
      {sberCards.map((card) => (
        <CardBlockItem
          key={card.id}
          onClick={(title) => setSelectedBill(title)}
          title={card.bankName}
          price={card.balance.amount}
          subtitle={card.cardNumber}
          icon={SberIcon}
          className={selectedBill == card.cardNumber ? "general" : ""}
        />
      ))}
    </Load>
  );
};

export default BalanceBlock;
