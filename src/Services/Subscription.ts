import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HidePreloader, ShowPreloader } from "Redux/Actions";
import { GetUserId, GetUserToken } from "Redux/Selectors";
import { AppDispatch } from "Redux/Store";
import axios from "Utils/Axios";
import { API_URL } from "Utils/Config";
import {
  IActiveSubscription,
  ISubscription,
  ISubscriptionGroup,
} from "./Interfaces";

export const useGetSubscriptions = () => {
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

export const useGetSubscriptionGroups = () => {
  const [subscriptionGroups, setSubscriptionGroups] = useState<
    ISubscriptionGroup[]
  >([]);
  const [load, setLoad] = useState<boolean>(false);

  const get = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${API_URL}api/v1/subscription-variant/group/`
      );
      if (data.status !== 200) {
        throw new Error(data.message);
      }

      setSubscriptionGroups(
        Object.values<ISubscriptionGroup>(data.data).map(
          (group: ISubscriptionGroup) => ({
            ...group,
            variants: group.variants.sort((a, b) => a.price - b.price),
          })
        )
      );

      // Injecting lite subscription
      setSubscriptionGroups((subs) => [
        { id: "lite", name: "Lite", variants: [] },
        ...subs,
      ]);
      setLoad(true);
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
    subscriptionGroups,
    load,
  };
};

export const useGetSubscriptionGroupsById = (id: string) => {
  const [subscriptionGroup, setSubscriptionGroup] =
    useState<ISubscriptionGroup>();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const get = async (): Promise<void> => {
    try {
      dispatch(ShowPreloader());

      const { data } = await axios.get(
        `${API_URL}api/v1/subscription-variant/group/${id}/`
      );
      if (data.status !== 200) {
        throw new Error(data.message);
      }

      setSubscriptionGroup({
        ...data.data,
        variants: data.data.variants.sort(
          (a: ISubscription, b: ISubscription) => a.price - b.price
        ),
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      dispatch(HidePreloader());
      setIsLoading(false);
    }
  };
  const init = async (): Promise<void> => {
    await get();
  };
  useEffect(() => {
    init();
  }, []);
  return {
    subscriptionGroup,
    isLoading,
  };
};

export const useGetActiveSubscription = () => {
  const [activeSubscription, setActiveSubscription] =
    useState<IActiveSubscription | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const userId = useSelector(GetUserId);

  const get = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${API_URL}api/v1/subscription/user/${userId}`
      );

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      data.data.active && setActiveSubscription(data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoad(true);
    }
  };

  const init = async (): Promise<void> => {
    await get();
  };

  useEffect(() => {
    init();
  }, []);

  return {
    activeSubscription,
    load,
  };
};
