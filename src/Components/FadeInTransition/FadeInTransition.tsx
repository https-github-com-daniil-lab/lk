import React from "react";

import "Styles/Animations/FadeInTransition/FadeInTransition.scss";

interface Props {
  children: React.ReactNode;
}

const FadeInTransition: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className={`fade-in-transition-wrapper active`}>{props.children}</div>
  );
};

export default FadeInTransition;
