import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IActiveSubscription, ISubscriptionGroup } from "Services/Interfaces";
import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionItem/SubscriptionItem.scss";
import Logo from "../../../../Static/Images/Logo.svg";
import SubscriptionItemLite from "./SubscriptionItemLite";

interface Props {
  subscriptionGroup: ISubscriptionGroup;
  activeSubscription: IActiveSubscription | null;
  list?: string[];
}

const SubscriptionItem: React.FC<Props> = ({
  subscriptionGroup,
  activeSubscription,
  list,
}) => {
  const { id, name, variants } = subscriptionGroup;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!variants || !activeSubscription) return;

    const isSubscriptionActive = variants.find(
      ({ id }) => activeSubscription.variant.id === id
    );

    isSubscriptionActive && setIsActive(true);
  }, [variants, activeSubscription]);

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

      {activeSubscription && isActive ? (
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
