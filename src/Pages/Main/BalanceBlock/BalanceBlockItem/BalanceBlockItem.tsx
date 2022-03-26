import React from "react";

import WalletBalanceIcon from "Static/icons/wallet-balance-icon.svg";

import "Styles/Pages/Main/BalanceBlock/BalanceBlockItem/BalanceBlockItem.scss";

interface Props {
  title: string;
  price: string | number;
  className?: string;
  subtitle?: string;
}

const BalanceBlockItem: React.FunctionComponent<Props> = ({
  title,
  price,
  className,
  subtitle,
}: Props) => {
  return (
    <div className={`balance-block-item ${className}`}>
      <img src={WalletBalanceIcon} alt="Wallet icon" />
      <div>
        <span>{title}</span>
        <span className="balance-block-item-subtitle">{subtitle ?? ""}</span>
      </div>
      <span className="balance-block-item-amount">{price}</span>
    </div>
  );
};

export default BalanceBlockItem;
