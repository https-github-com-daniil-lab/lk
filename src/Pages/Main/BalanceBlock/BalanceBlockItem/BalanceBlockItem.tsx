import React from "react";

import WalletBalanceIcon from "Static/icons/wallet-balance-icon.svg";

import "Styles/Pages/Main/BalanceBlock/BalanceBlockItem/BalanceBlockItem.scss";

interface Props {
  title: string;
  price: string | number;
  className?: string;
}

const BalanceBlockItem: React.FunctionComponent<Props> = ({
  title,
  price,
  className,
}: Props) => {
  return (
    <div className={`balance-block-item ${className}`}>
      <img src={WalletBalanceIcon} alt="Wallet icon" />
      <span>{title}</span>
      <span>{price}</span>
    </div>
  );
};

export default BalanceBlockItem;
