import { useEffect, useState } from "react";

import axios from "Utils/Axios";

import { API_URL } from "Utils/Config";

import { IAdvertising } from "./Interfaces";

const useGetAdvertising = () => {
  const [advertising, setAdvertising] = useState<IAdvertising[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  const get = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}api/v1/advertising/`, {});
      if (res.data.status === 200) {
        console.log(res.data.data);
        setAdvertising(res.data.data);
        setLoad(true);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const init = async (): Promise<void> => {
    await get();
  };

  useEffect(() => {
    init();
  }, []);
  return { advertising, load };
};

export default { useGetAdvertising };
