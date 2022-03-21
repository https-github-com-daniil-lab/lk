import React from "react";

import "Styles/Components/Checkmark/Checkmark.scss";

interface Props {
  radius: number | string;
}

const Checkmark: React.FunctionComponent<Props> = ({ radius }: Props) => {
  return (
    <div
      className="checkmark-wrapper"
      style={{
        borderRadius: radius ? radius : 0,
      }}
    >
      <span className="checkmark">
        <div className="checkmark_stem"></div>
        <div className="checkmark_kick"></div>
      </span>
    </div>
  );
};

export default Checkmark;
