import React from "react";
import InjectStyle from "Utils/InjectStyle";

interface Props {
  stroke: string;
  d: string;
  index: number;
}

const Path: React.FunctionComponent<Props> = (props: Props) => {
  const animation = `
    @keyframes fill-in-${props.index} {
      to {
        stroke-dashoffset: 0;
      }
    }`;

  InjectStyle(animation);

  return (
    <path
      style={{
        WebkitAnimation: `fill-in-${props.index} 1s linear forwards`,
      }}
      fill="transparent"
      strokeWidth="5"
      strokeDasharray={100}
      strokeDashoffset={100}
      strokeLinejoin="round"
      {...props}
    ></path>
  );
};

export default Path;
