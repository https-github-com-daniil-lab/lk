import { API_URL } from "Utils/Config";
import axios from "Utils/Axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetUserToken } from "Redux/Selectors";
import { ISubscription } from "./Interfaces";

const useGetSubscriptions = () => {
  const token = useSelector(GetUserToken);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const get = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}api/v1/subscription-variant/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === 200) {
        setSubscriptions(res.data.data);
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
  return {
    subscriptions,
    load,
  };
};

export default { useGetSubscriptions };
