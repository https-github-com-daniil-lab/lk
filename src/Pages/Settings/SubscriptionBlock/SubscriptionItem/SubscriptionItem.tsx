import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import {
  IActiveSubscriptionGroup,
  ISubscriptionGroup,
} from "Services/Interfaces";
import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionItem/SubscriptionItem.scss";
import Logo from "../../../../Static/Images/Logo.svg";
import SubscriptionItemLite from "./SubscriptionItemLite";

interface Props {
  subscriptionGroup: ISubscriptionGroup & IActiveSubscriptionGroup;
  list?: string[];
  isSubscribed: boolean;
}

const SubscriptionItem: React.FC<Props> = ({
  subscriptionGroup,
  list,
  isSubscribed,
}) => {
  const { id, name, subscribedTo } = subscriptionGroup;

  if (subscriptionGroup.name === "Lite") {
    return <SubscriptionItemLite />;
  }

  return (
    <div className="subscription-item">
      <img
        src={Logo}
        className="subscription-item-logo"
        aria-hidden="true"
        alt=""
      />
      <span className="subscription-item-title">{name}</span>

      <ul className="subscription-item-list">
        {list?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {subscribedTo ? (
        <span className="subscription-item-date">
          Действует до {moment(subscribedTo).format("DD.MM.Y")}
        </span>
      ) : (
        <span className="subscription-item-date">
          от {subscriptionGroup.variants[0].newPrice} руб./мес
        </span>
      )}

      {isSubscribed ? (
        <button className="button-primary subscription-item-button" disabled>
          Активировано
        </button>
      ) : (
        <Link
          to={`/sub/${id}`}
          className="button-primary subscription-item-button"
        >
          Оформить подписку
        </Link>
      )}
    </div>
  );
};

export default SubscriptionItem;
