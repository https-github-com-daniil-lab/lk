import Load from "Components/Load/Load";
import React, { useMemo } from "react";
import Advertising from "Services/Advertising";

import "Styles/Pages/Main/Banner/Banner.scss";
import { API_URL } from "Utils/Config";

interface Props {}

const Banner: React.FunctionComponent<Props> = (props: Props) => {
  const { useGetAdvertising } = Advertising;

  const { load, advertising } = useGetAdvertising();

  const advertisingRandom = useMemo(() => {
    if (load) {
      return advertising[Math.floor(Math.random() * advertising.length)];
    }
    return null;
  }, [load]);

  return (
    <Load {...{ load }}>
      {advertisingRandom && (
        <div className="banner">
          <div className="banner-image-wrapper">
            {advertisingRandom.files.length > 0 && (
              <img
                src={`${API_URL}api/v1/advertising/content/${
                  advertisingRandom.files[
                    Math.floor(Math.random() * advertisingRandom.files.length)
                  ].path
                }`}
              />
            )}
          </div>

          <div className="banner-content">
            <span>{advertisingRandom.title}</span>
            <span>{advertisingRandom.subTitle}</span>
            <span>{advertisingRandom.content}</span>
          </div>
        </div>
      )}
    </Load>
  );
};

export default Banner;
