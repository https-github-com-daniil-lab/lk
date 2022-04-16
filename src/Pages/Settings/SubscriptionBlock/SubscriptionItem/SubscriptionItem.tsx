import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IActiveSubscription,
  ISubscription,
  ISubscriptionGroup,
} from "Services/Interfaces";
import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionItem/SubscriptionItem.scss";
import Logo from "../../../../Static/Images/Logo.svg";
import SubscriptionItemLite from "./SubscriptionItemLite";

interface Props {
  subscriptionGroup: ISubscriptionGroup;
  activeSubscriptions: IActiveSubscription[];
  list?: string[];
}

const SubscriptionItem: React.FC<Props> = ({
  subscriptionGroup,
  activeSubscriptions,
  list,
}) => {
  const { id, name, variants } = subscriptionGroup;
  const [activeSubscription, setActiveSubscription] =
    useState<IActiveSubscription>();

  useEffect(() => {
    if (!variants || !activeSubscriptions) return;

    const subscription = activeSubscriptions.find(
      (activeSubscription) =>
        variants.map(({ id }) => id).indexOf(activeSubscription.variant.id) !== -1
    );

    setActiveSubscription(subscription);
  }, [variants, activeSubscriptions]);

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

      {activeSubscription ? (
        <>
          <span className="subscription-item-date">
            Действует до {moment(activeSubscription.endDate).format("DD.MM.Y")}
          </span>
          <button className="button-primary subscription-item-button" disabled>
            Активировано
          </button>
        </>
      ) : (
        <>
          <span className="subscription-item-date">
            от {subscriptionGroup.variants[0].newPrice} руб./мес
          </span>
          <Link
            to={`/sub/${id}`}
            className="button-primary subscription-item-button"
          >
            Оформить подписку
          </Link>
        </>
      )}
    </div>
  );
};

export default SubscriptionItem;
