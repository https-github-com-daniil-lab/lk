import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HidePreloader, ShowPreloader, ShowToast } from "Redux/Actions";
import { GetUserId } from "Redux/Selectors";
import { AppDispatch } from "Redux/Store";
import axios from "Utils/Axios";
import { API_URL } from "Utils/Config";
import submitBankConnection from "Utils/submitBankConnection";
import { Banks } from "Utils/Types";
import { IBalances, ISberCard, ITinkoffCard, ITochkaCard } from "./Interfaces";

const useGetBill = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [balances, setBalances] = useState<IBalances[]>([]);

  const [generalBalance, setGeneralBalance] = useState<number>(0);

  const [load, setLoad] = useState<boolean>(false);

  const getGeneralBalance = (array: IBalances[]): void => {
    const res = array.reduce((x, y) => x + y.balance.amount, 0);

    setGeneralBalance(res);
  };

  const get = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}api/v1/bill/`);
      if (res.data.status === 200) {
        setBalances(res.data.data);
        getGeneralBalance(res.data.data);
        setLoad(true);
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
    load,
    balances,
    generalBalance,
  };
};

const useGetTinkoffCards = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [cards, setCards] = useState<ITinkoffCard[]>([]);

  const [load, setLoad] = useState<boolean>(false);

  const get = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}api/v1/tinkoff/cards/`);
      if (res.data.status === 200) {
        setCards(res.data.data);
        setLoad(true);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      if (error.response.status !== 404) {
        dispatch(
          ShowToast({
            text: error.message,
            title: "Ошибка",
            type: "error",
          })
        );
      }
      setLoad(true);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    cards,
    load,
  };
};

const useGetSberCards = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [cards, setCards] = useState<ISberCard[]>([]);

  const [load, setLoad] = useState<boolean>(false);

  const get = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${API_URL}api/v1/sber/cards/`);
      if (data.status === 200) {
        setCards(data.data);
        setLoad(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      if (error.response.status !== 404) {
        dispatch(
          ShowToast({
            text: error.message,
            title: "Ошибка",
            type: "error",
          })
        );
      }
      setLoad(true);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    cards,
    load,
  };
};

const useGetTochkaCards = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [cards, setCards] = useState<ITochkaCard[]>([]);

  const [load, setLoad] = useState<boolean>(false);

  const get = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${API_URL}api/v1/tochka/cards/`);
      if (data.status === 200) {
        setCards(data.data);
        setLoad(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      if (error.response.status !== 404) {
        dispatch(
          ShowToast({
            text: error.message,
            title: "Ошибка",
            type: "error",
          })
        );
      }
      setLoad(true);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    cards,
    load,
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

export const useBankConnection = (bank: Banks, exportDate: string | null) => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector(GetUserId);

  const [act, setAct] = useState<"start" | "submit">("start");
  const [bankUserId, setBankUserId] = useState<string>();

  const startConnection = async (phone: string): Promise<void> => {
    try {
      if (!phone) {
        throw new Error("Введите номер телефона");
      }

      if (!exportDate) {
        throw new Error("Введите дату");
      }

      dispatch(ShowPreloader());

      const { data } = await axios.post(
        `${API_URL}api/v1/${bank}/connect/start/`,
        {
          phone,
          exportStartDate: new Date(exportDate),
          startExportDate: new Date(exportDate),
        }
      );

      if (data.status === 200) {
        setAct("submit");
        setBankUserId(data.data.id);
      }
    } catch (error: any) {
      const text =
        error.response.status === 400
          ? "Интеграция уже подключена"
          : error.message;

      dispatch(
        ShowToast({
          text,
          title: "Ошибка",
          type: "error",
        })
      );
    } finally {
      dispatch(HidePreloader());
    }
  };

  const submitConnection = async (
    password: string,
    code: string | number,
    onSuccess: () => void
  ): Promise<void> => {
    try {
      if (!password) {
        throw new Error("Введите код");
      }

      if (!code) {
        throw new Error("Введите код");
      }

      if (!exportDate) {
        throw new Error("Введите дату");
      }

      if (!bankUserId) {
        throw new Error("Не удалось подключить банк");
      }

      dispatch(ShowPreloader());

      const data = await submitBankConnection(bank, {
        code,
        bankUserId,
        password,
        exportDate,
      });

      if (data.status === 200) {
        const isSync = await syncConnection();
        isSync && onSuccess();
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      dispatch(
        ShowToast({
          text: error.message,
          title: "Ошибка",
          type: "error",
        })
      );
    } finally {
      dispatch(HidePreloader());
    }
  };

  const syncConnection = async (): Promise<boolean> => {
    try {
      const { data } = await axios.get(`${API_URL}api/v1/${bank}/sync/`);

      if (data.status === 200) {
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      dispatch(
        ShowToast({
          text: error.message,
          title: "Ошибка",
          type: "error",
        })
      );
    } finally {
      dispatch(HidePreloader());
    }

    return false;
  };

  return {
    act,
    startConnection,
    submitConnection,
  };
};

export default {
  useGetBill,
  useGetTinkoffCards,
  useGetSberCards,
  useGetTochkaCards,
  useAddBill,
};
