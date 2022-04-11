import React from "react";
import { useParams } from "react-router-dom";
import { useGetSubscriptionGroupsById } from "Services/Subscription";
import FormBlock from "./FormBlock/FormBlock";

const Sub: React.FC = () => {
  const { id } = useParams();
  //   const { load, subscriptionGroup } = useGetSubscriptionGroupsById(id || "");
  const load = true;
  const subscriptionGroup = {
    id: "ec112ef8-fe55-4f06-b100-ba3472440ef6",
    name: "Pro",
    variants: [
      {
        id: "6990c0ab-9ffc-4ce7-85bf-6757816496df",
        name: "1 месяц",
        description: "Pro",
        expiration: 30,
        price: 129,
        newPrice: 0,
      },
      {
        id: "d505f317-907c-4063-b613-09f122d4d141",
        name: "3 месяца",
        description: "Pro",
        expiration: 90,
        price: 369,
        newPrice: 0,
      },
      {
        id: "cfdef4ab-8e40-4cc1-8fb5-5fdfb325daa5",
        name: "6 месяцев",
        description: "Pro",
        expiration: 180,
        price: 739,
        newPrice: 0,
      },
      {
        id: "7e0adf2f-e629-4c14-8fec-2089a793026b",
        name: "1 год",
        description: "Pro",
        expiration: 365,
        price: 1499,
        newPrice: 0,
      },
    ],
  };

  return (
    <div className="settings">
      <div className="app-card">
        <div className="app-card-header">
          <div className="content-section-title">Подписки</div>
        </div>
        <FormBlock subscriptionGroup={subscriptionGroup} />
      </div>
    </div>
  );
};

export default Sub;
