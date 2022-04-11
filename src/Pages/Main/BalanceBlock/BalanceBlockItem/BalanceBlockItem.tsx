import React from "react";

import WalletBalanceIcon from "Static/icons/wallet-balance-icon.svg";

import "Styles/Pages/Main/BalanceBlock/BalanceBlockItem/BalanceBlockItem.scss";

interface Props {
  title: string;
  price: string | number;
  className?: string;
  subtitle?: string;
  icon?: string;
}

const BalanceBlockItem: React.FunctionComponent<Props> = ({
  title,
  price,
  className,
  subtitle,
  icon,
}: Props) => {
  return (
    <div className={`balance-block-item ${className}`}>
      <img src={icon || WalletBalanceIcon} alt="Wallet icon" width={20} />
      <div>
        <span>{title}</span>
        <span className="balance-block-item-subtitle">{subtitle ?? ""}</span>
      </div>
      <span className="balance-block-item-amount">{price}</span>
    </div>
  );
};

export default BalanceBlockItem;
