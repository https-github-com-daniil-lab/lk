import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetUserId, GetUserToken } from "Redux/Selectors";
import { API_URL } from "Utils/Config";
import { IBalances } from "./Interfaces";

const useGetBill = () => {
  const userId = useSelector(GetUserId);
  const token = useSelector(GetUserToken);

  const [balances, setBalances] = useState<IBalances[]>([]);

  const [generalBalance, setGeneralBalance] = useState<number>(0);

  const [load, setLoad] = useState<boolean>(false);

  const getGeneralBalance = (array: IBalances[]): void => {
    const res = array.reduce((x, y) => x + y.balance.amount, 0);

    setGeneralBalance(res);
  };

  const get = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}api/v1/bill/?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === 200) {
        setBalances(res.data.data);
        getGeneralBalance(res.data.data);
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
    load,
    balances,
    generalBalance,
  };
};

const useAddBill = () => {
  return {};
};

export default { useGetBill, useAddBill };
