import React from "react";
import { ISubscription } from "Services/Interfaces";
import Logo from "Static/Images/Logo.svg";

import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionItem/SubscriptionItem.scss";

interface Props extends ISubscription {}

const SubscriptionItem: React.FunctionComponent<Props> = ({
  name,
  description,
  price,
  expiration,
  newPrice,
}: Props) => {
  return (
    <div className="subscription-item">
      <img src={Logo} />
      <span className="subscription-item-title">{name}</span>
      <span className="subscription-item-subtitle">{description}</span>
      <div className="subscription-item-price-value">
        <div>
          <sup className="currency">₽</sup>
          <span className="amount">{newPrice}</span>
          <span className="duration"> / {expiration} д</span>
          {/* <span>{price}</span> */}
        </div>
      </div>
      <button className="button-primary">Продлить подписку</button>
    </div>
  );
};

export default SubscriptionItem;
