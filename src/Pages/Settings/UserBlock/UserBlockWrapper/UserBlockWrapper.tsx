import React from "react";

import "Styles/Pages/Settings/UserBlock/UserBlockWrapper/UserBlockWrapper.scss";

interface Props {
  title: string;
  children: React.ReactNode;
}

const UserBlockWrapper: React.FunctionComponent<Props> = ({
  title,
  children,
}: Props) => {
  return (
    <div className="user-block-wrapper">
      <span className="user-block-wrapper-title">{title}</span>
      {children}
    </div>
  );
};

export default UserBlockWrapper;
