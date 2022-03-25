import axios from "Utils/Axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HidePreloader, ShowPreloader, ShowToast } from "Redux/Actions";
import { GetUserId, GetUserToken } from "Redux/Selectors";
import { AppDispatch } from "Redux/Store";
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
      const res = await axios.get(`${API_URL}api/v1/bill/?userId=${userId}`);
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

const useAddBill = (name: string, balance: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(GetUserId);

  const addBill = async (): Promise<void> => {
    try {
      if (name.length != 0 && balance.length != 0) {
        dispatch(ShowPreloader());
        const res = await axios.post(`${API_URL}api/v1/bill/`, {
          userId,
          name,
          balance,
          cents: 0,
        });
        console.log(res.data);
        if (res.data.status === 201) {
          dispatch(HidePreloader());
          dispatch(
            ShowToast({
              text: "Счет добавлен",
              title: "Успех",
              type: "success",
            })
          );
        } else {
          throw new Error(res.data.message);
        }
      } else {
        throw new Error("Некорректные имя или баланс");
      }
    } catch (error: any) {
      dispatch(HidePreloader());
      dispatch(
        ShowToast({
          text: error.message,
          title: "Ошибка",
          type: "error",
        })
      );
    }
  };

  return {
    addBill,
  };
};

const useTinkoff = (
  login?: string,
  password?: string,
  date?: string,
  code?: string
) => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector(GetUserId);

  const [transactions, setTransactions] = useState([]);

  const [status, setStatus] = useState<"signin" | "code">("signin");

  const signin = async (): Promise<void> => {
    if (!login && !password && !code && !date && !code) return;
    try {
      if (code!.length === 0) {
      } else {
        throw new Error("Некорректные поля");
      }
    } catch (error: any) {
      dispatch(HidePreloader());
      dispatch(
        ShowToast({
          text: error.message,
          title: "Ошибка",
          type: "error",
        })
      );
    }
  };

  const syncTinkoff = async (): Promise<void> => {
    if (!login && !password && !code && !date && !code) return;

    try {
      if (login!.length != 0 && password!.length != 0 && date!.length === 0) {
      } else {
        throw new Error("Некорректные поля");
      }
    } catch (error: any) {
      dispatch(HidePreloader());
      dispatch(
        ShowToast({
          text: error.message,
          title: "Ошибка",
          type: "error",
        })
      );
    }
  };

  const getTinkoffTransactions = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}api/v1/tinkoff/cards/${userId}`);
      console.log("tt", res.data);
      if (res.data.status === 200) {
        const cards = res.data.data;
        let r: any = [];

        for (let i = 0; i < cards.length; i++) {
          const trRes = await axios.get(
            `${API_URL}api/v1/tinkoff/transactions/${cards[i].id}?page=0&pageSize=100`
          );
          r = [
            ...r,
            ...trRes.data.data.page.map((item) => ({
              name: cards[i].cardNumber,
              balance: item.amount,
            })),
          ];
        }

        setTransactions(r);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      dispatch(
        ShowToast({
          text: error.message,
          title: "Ошибка",
          type: "error",
        })
      );
    }
  };

  const init = async (): Promise<void> => {
    await getTinkoffTransactions();
  };

  useEffect(() => {
    init();
  }, []);

  return {
    syncTinkoff,
    signin,
    status,
    transactions,
  };
};

const useSber = (login: string, date: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const syncTinkoff = async (): Promise<void> => {
    try {
      if (login.length !== 0 && date.length === 0) {
      } else {
        throw new Error("Некорректные поля");
      }
    } catch (error: any) {
      dispatch(HidePreloader());
      dispatch(
        ShowToast({
          text: error.message,
          title: "Ошибка",
          type: "error",
        })
      );
    }
  };
  return {
    syncTinkoff,
  };
};

export default { useGetBill, useAddBill, useTinkoff, useSber };
