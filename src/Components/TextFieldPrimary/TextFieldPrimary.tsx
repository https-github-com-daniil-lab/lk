import React from "react";

import "Styles/Components/TextFieldPrimary/TextFieldPrimary.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextFieldPrimary: React.FC<Props> = (props: Props) => (
  <input {...props} className="input-container" />
);

export default TextFieldPrimary;
