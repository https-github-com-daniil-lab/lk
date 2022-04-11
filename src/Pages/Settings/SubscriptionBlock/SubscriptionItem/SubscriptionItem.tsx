import React from "react";
import { Link } from "react-router-dom";
import { ISubscription, ISubscriptionGroup } from "Services/Interfaces";
import Logo from "Static/Images/Logo.svg";

import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionItem/SubscriptionItem.scss";

interface Props {
  subscriptionGroup: ISubscriptionGroup;
  list: string[];
}

const SubscriptionItem: React.FC<Props> = ({ subscriptionGroup, list }) => {
  const { id, name } = subscriptionGroup;

  return (
    <div className="subscription-item">
      <span className="subscription-item-title">{name}</span>

      <ul className="subscription-item-list">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <span className="subscription-item-date">
        от {subscriptionGroup.variants[0].price} руб./мес
      </span>

      <Link
        to={`/sub/${id}`}
        className="button-primary subscription-item-button"
      >
        Продлить подписку
      </Link>
    </div>
  );
};

export default SubscriptionItem;
