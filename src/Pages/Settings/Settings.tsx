import React from "react";
import SubscriptionBlock from "./SubscriptionBlock/SubscriptionBlock";
import UserBlock from "./UserBlock/UserBlock";

import "Styles/Pages/Settings/Settings.scss";
import FadeIn from "Components/FadeIn/FadeIn";

interface Props {}

const Settings: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="settings">
      <div className="app-card" style={{ height: 422 }}>
        <div className="app-card-header">
          <div className="content-section-title">Подписки</div>
          <div className="content-section-controll"></div>
        </div>
        <SubscriptionBlock />
      </div>
      <div className="app-card">
        <div className="app-card-header">
          <div className="content-section-title">Пользователь</div>
          <div className="content-section-controll"></div>
        </div>
        <UserBlock />
      </div>
    </div>
  );
};

export default Settings;
