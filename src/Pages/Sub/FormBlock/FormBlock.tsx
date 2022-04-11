import React from "react";
import { ISubscriptionGroup } from "Services/Interfaces";

interface Props {
  subscriptionGroup: ISubscriptionGroup;
}

const FormBlock: React.FC<Props> = ({ subscriptionGroup }) => {
  const { variants } = subscriptionGroup;

  return (
    <div>
      {variants.map((variant) => (
        <p key={variant.id}>{variant.name}</p>
      ))}
    </div>
  );
};

export default FormBlock;
