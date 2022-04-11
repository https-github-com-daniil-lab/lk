import React from "react";
import { ISubscription, ISubscriptionGroup } from "Services/Interfaces";
import Logo from "Static/Images/Logo.svg";

interface Props {
  onClose: () => void;
  subscriptionGroup: ISubscriptionGroup;
}

const SubscribeModal: React.FC<Props> = ({ onClose, subscriptionGroup }) => {
  const { name, variants } = subscriptionGroup;

  return (
    <div className="container">
      <div className="info">
        <img src={Logo} alt="Logo" />
        {name}
      </div>
      <div className="bills">
        {variants.map(variant => (
          <button className="button-secondary" key={variant.id}>{variant.name} {variant.price}</button>
        ))}
      </div>
    </div>
  );
};

export default SubscribeModal;
