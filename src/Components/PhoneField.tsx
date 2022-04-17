import React, { useState } from "react";
import PhoneMask from "Utils/PhoneMask";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const PhoneField: React.FC<Props> = ({ onChange, value, ...props }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const mask = PhoneMask(e.target.value);
    setCurrentValue(mask);
    onChange?.(e);
  };

  return (
    <input
      type="text"
      placeholder="+7**********"
      {...props}
      value={currentValue}
      onChange={handleChange}
    />
  );
};

export default PhoneField;
