import React from "react";

import "Styles/Animations/FadeIn/FadeIn.scss";

interface Props {
  children: React.ReactNode;
}

const FadeIn: React.FC<Props> = (props: Props) => {
  return <div className={`fade-in-wrapper active`}>{props.children}</div>;
};

export default FadeIn;
