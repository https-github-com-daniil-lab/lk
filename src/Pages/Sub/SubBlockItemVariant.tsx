import React from "react";
import { ISubscription } from "Services/Interfaces";

interface Props {
  subscription: ISubscription;
  setSubscription: (state: ISubscription) => void;
}

const SubBlockItemVariant: React.FC<Props> = ({
  subscription,
  setSubscription,
}) => {
  const { id, description } = subscription;

  const handleVariantChange = () => {
    setSubscription(subscription);
  };

  return (
    <label key={id} className="variant-item">
      <input
        type="radio"
        name="radio"
        value={id}
        onChange={handleVariantChange}
      />
      <span>{description}</span>
    </label>
  );
};

export default SubBlockItemVariant;
