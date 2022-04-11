import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Routes from "Utils/Routes";

import Sidebar from "Components/Sidebar/Sidebar";

import "Styles/Layers/PersonalArea/PersonalAreaLayer.scss";

interface Props {}

const PersonalAreaLayer: React.FunctionComponent<Props> = (props: Props) => {
  const location = useLocation();

  const [activeRoute, setActiveRoute] = useState<number>(0);

  useMemo(() => {
    Routes.dashboardRoutes.forEach((route, idx) => {
      if (location.pathname.includes(route.path)) setActiveRoute(idx);
    });
  }, [location.pathname]);

  return (
    <div className="personal-area-layer" id="body">
      <div className="app">
        <div className="wrapper">
          <div className="left-side">
            <Sidebar activeRoute={activeRoute} />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PersonalAreaLayer;
