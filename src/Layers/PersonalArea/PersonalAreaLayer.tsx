import React, { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Routes from "Utils/Routes";

import Sidebar from "Components/Sidebar/Sidebar";

import "Styles/Layers/PersonalArea/PersonalAreaLayer.scss";

import MenuIcon from "../../Static/icons/menu-icon.png";
interface Props {}

const PersonalAreaLayer: React.FunctionComponent<Props> = (props: Props) => {
  const location = useLocation();

  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  const [sideComponent, setSideComponent] = useState<string | null>(null);

  const [mobileMenu, setMobileMenu] = useState(false);

  useMemo(() => {
    [...Routes.dashboardRoutes, ...Routes.supportRouters].forEach(
      (route, idx) => {
        if (location.pathname.includes(route.path)) setActiveRoute(route.path);
      }
    );
  }, [location.pathname]);

  useMemo(() => {
    [...Routes.dashboardRoutes, ...Routes.supportRouters].forEach(
      (route, idx) => {
        if (location.pathname.includes(route.path))
          setSideComponent(route.sideIcon);
      }
    );
  }, [location.pathname]);
  return (
    <div className="personal-area-layer" id="body">
      <div className="app">
        <div
          className="meniIcon"
          style={{ zIndex: 999 }}
          onClick={() => setMobileMenu((a) => !a)}
        >
          <img src={MenuIcon} alt="menu" role="button" />
        </div>
        <div
          className="wrapper"
          onClick={(e) => {
            if (
              e.target instanceof HTMLDivElement &&
              !e.target.contains(document.querySelector(".meniIcon"))
            )
              return setMobileMenu(false);
          }}
        >
          <div
            className="left-side"
            style={{
              transform: `translateX(${mobileMenu ? 0 : "calc(-100% - 20px)"})`,
            }}
          >
            <Sidebar activeRoute={activeRoute} />
            <div className="left-side__image">
              <img src={sideComponent || ""} aria-hidden="true" alt="" />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PersonalAreaLayer;
