import React, { useRef } from "react";
import Subscription from "Services/Subscription";
import SubscriptionItem from "./SubscriptionItem/SubscriptionItem";
import Load from "Components/Load/Load";
import useDraggableScroll from "Utils/Hooks/useDraggableScroll";

import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionBlock.scss";

interface Props {}

const SubscriptionBlock: React.FunctionComponent<Props> = (props: Props) => {
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, { direction: "horizontal" });
  const { useGetSubscriptions } = Subscription;
  const { load, subscriptions } = useGetSubscriptions();
  return (
    <Load
      {...{ load }}
      baseDivProps={{
        ref: ref,
        onMouseDown: onMouseDown,
        style: {
          gridTemplateColumns: subscriptions.map((_) => "1fr").join(" "),
        },
      }}
      className="subscription-block noselect"
    >
      {subscriptions.map((subscription, i) => {
        return <SubscriptionItem key={i} {...subscription} />;
      })}
    </Load>
  );
};

export default SubscriptionBlock;
