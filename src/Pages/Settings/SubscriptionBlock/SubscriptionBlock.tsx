import Load from "Components/Load/Load";
import React, { useEffect, useState } from "react";
import { IActiveSubscription } from "Services/Interfaces";
import {
  useGetActiveSubscriptions,
  useGetSubscriptionGroups,
} from "Services/Subscription";
import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionBlock.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SubscriptionPossibilities from "Utils/SubscriptionPossibilities";
import SubscriptionItem from "./SubscriptionItem/SubscriptionItem";

const SubscriptionBlock: React.FC = () => {
  const { load: groupLoaded, subscriptionGroups } = useGetSubscriptionGroups();
  const { load: activeLoaded, activeSubscriptions } =
    useGetActiveSubscriptions();

  return (
    <Swiper
      spaceBetween={50}
      autoplay
      style={{
        overflowY: "visible",
        position: "relative",
        bottom: "-60px",
        paddingBottom: "30px",
      }}
      breakpoints={{
        940: {
          slidesPerView: 1,
        },
        1068: {
          slidesPerView: 2,
        },
        1368: {
          slidesPerView: 3,
        },
      }}
    >
      <Load load={groupLoaded && activeLoaded} className="subscription-block">
        {subscriptionGroups.map((subscriptionGroup) => (
          <SwiperSlide>
            <SubscriptionItem
              key={subscriptionGroup.id}
              subscriptionGroup={subscriptionGroup}
              activeSubscriptions={activeSubscriptions}
              list={SubscriptionPossibilities[subscriptionGroup.name]}
            />
          </SwiperSlide>
        ))}
      </Load>
    </Swiper>
  );
};

export default SubscriptionBlock;
