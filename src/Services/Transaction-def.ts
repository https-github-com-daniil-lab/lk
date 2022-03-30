import axios from "Utils/Axios";

import moment from "moment";

import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ShowToast, UpdateOperations } from "Redux/Actions";

import { GetUserId, GetUserToken, GetUpdateOperations } from "Redux/Selectors";

import ArrayGroups from "Utils/ArrayGroups";

import { API_URL } from "Utils/Config";

import {
  IBalances,
  IBaseCategory,
  ITinkoffTransaction,
  ITransaction,
  TransactionType,
} from "./Interfaces";
import { AppDispatch } from "Redux/Store";
import { HidePreloader, ShowPreloader } from "Redux/Actions";

const useGetTinkoffTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector(GetUserId);

  const [transactions, setTransactions] = useState<any[]>([]);

  const get = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}api/v1/tinkoff/cards/${userId}`);
      if (res.data.status === 200) {
        const cards = res.data.data;
        let r: ITinkoffTransaction[] = [];
        for (let i = 0; i < cards.length; i++) {
          const trRes = await axios.get(
            `${API_URL}api/v1/tinkoff/transactions/${cards[i].id}?page=0&pageSize=100`
          );
          console.log();
          r = [...r, ...trRes.data.data.page];
        }

        const refTinkoffTransactions = r.map((transaction) => ({
          type: "WITHDRAW",
          color: { hex: "" },
          icon: {
            name: "",
          },
          title: transaction.description,
          sum: transaction.amount.amount,
        }));

        setTransactions(refTinkoffTransactions);
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

  useEffect(() => {
    get();
  }, []);

  return {
    transactions,
  };
};

export type TransactionsSortedType = {
  createAt: string;
  transactions: ITransaction[];
};

interface State {
  transactions: TransactionsSortedType[];
  income: number;
  expenses: number;
  load: boolean;
  selectedDate: string[];
}

const useGetTransaction = () => {
  const userId = useSelector(GetUserId);
  const updateOperations = useSelector(GetUpdateOperations);

  const [state, setState] = useState<State>({
    transactions: [],
    income: 0,
    expenses: 0,
    load: false,
    selectedDate: [moment().format("YYYY-MM-DD")],
  });

  const filterByDate = (v) => state.selectedDate.includes(v.createAt);

  const setDate = (v: string[]): void => {
    setState({
      ...state,
      selectedDate: v.map((i) => moment(i).format("YYYY-MM-DD")),
    });
  };

  const prev = (): void => {
    let currentDate = moment(state.selectedDate);

    setState({
      ...state,
      selectedDate: [
        moment(currentDate).subtract(1, "months").format("YYYY-MM-DD"),
      ],
    });
  };

  const next = (): void => {
    let currentDate = moment(state.selectedDate);
    let futureMonth = moment(currentDate).add(1, "M");
    let futureMonthEnd = moment(futureMonth).endOf("month");

    if (
      currentDate.date() != futureMonth.date() &&
      futureMonth.isSame(futureMonthEnd.format("YYYY-MM-DD"))
    ) {
      futureMonth = futureMonth.add(1, "d");
    }

    setState({
      ...state,
      selectedDate: [futureMonth.format("YYYY-MM-DD")],
    });
  };

  /**
   *
   * Расчет доходов
   */
  const getIncome = (array: ITransaction[]): number => {
    return array
      .filter((i) => i.action === "DEPOSIT")
      .reduce((x, y) => x + y.sum, 0);
  };

  /**
   *
   * Расчет расходов
   */
  const getExpenses = (array: ITransaction[]): number => {
    return array
      .filter((i) => i.action === "WITHDRAW")
      .reduce((x, y) => x + y.sum, 0);
  };

  /**
   *
   * Сортировка по дате
   */
  const sorted = (array: ITransaction[]): TransactionsSortedType[] => {
    const sortedTransactionByGroup = ArrayGroups(array);
    const sortedTransactionByDate = sortedTransactionByGroup.sort(
      (x, y) =>
        <any>moment(y.createAt).format("L") -
        <any>moment(x.createAt).format("L")
    );
    return sortedTransactionByDate;
  };

  /**
   *
   *  Обработка данных
   */
  const set = (transactions: ITransaction[]): void => {
    const sortedTransactions: TransactionsSortedType[] = sorted(transactions);
    const incomeTransactions = getIncome(transactions);
    const expensesTransaction = getExpenses(transactions);

    setState({
      expenses: expensesTransaction,
      income: incomeTransactions,
      selectedDate: [moment().format("YYYY-MM-DD")],
      transactions: sortedTransactions,
      load: true,
    });
  };

  const get = async (): Promise<void> => {
    try {
      const res = await axios.get(
        `${API_URL}api/v1/transaction/user/${userId}?page=0&pageSize=100`
      );
      if (res.data.status === 200) {
        set(res.data.data.page);
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

  const prices = useMemo(() => {
    const f = state.transactions
      .find(filterByDate)
      ?.transactions.map((t) => t.sum);
    if (f) return f;
    else return [];
  }, [state.selectedDate, state.transactions]);

  const filterdTransactions = useMemo(() => {
    const f = state.transactions.filter(filterByDate);
    console.log(f);
    if (f) return f;
    else return [];
  }, [state.selectedDate, state.transactions]);

  useEffect(() => {
    init();
  }, [updateOperations]);

  const _income = useMemo(() => {
    const f = state.transactions
      .filter(filterByDate)
      .map((item) =>
        item.transactions
          .filter((i) => i.action === "DEPOSIT")
          .reduce((x, y) => x + y.sum, 0)
      )
      .reduce((x, y) => x + y, 0);
    return f;
  }, [state.selectedDate]);

  const _expenses = useMemo(() => {
    const f = state.transactions
      .filter(filterByDate)
      .map((item) =>
        item.transactions
          .filter((i) => i.action === "WITHDRAW")
          .reduce((x, y) => x + y.sum, 0)
      )
      .reduce((x, y) => x + y, 0);
    return f;
  }, [state.selectedDate]);

  return {
    ...state,
    transactions: filterdTransactions,
    prices: prices,
    prev,
    next,
    selectedDate: state.selectedDate,
    setDate,
    income: _income,
    expenses: _expenses,
  };
};

const useBudgetСalculation = (
  transactions: TransactionsSortedType[],
  selectedDate: string[]
) => {
  // console.log("old", transactions);
  // console.log(
  //   "new",

  // // const te = transactions.transactions
  //   .filter((i) => i.action === "WITHDRAW")
  //   .reduce((x, y) => x + y.sum, 0);
  const f = (item: TransactionsSortedType) =>
    selectedDate.includes(item.createAt);

  const calc = (): void => {
    console.log("transactions", transactions);
    const t = transactions.filter(f);
    console.log("TTTT", t);
  };

  useEffect(() => {
    calc();
  }, []);

  return {};
};

type OperationParamsType = {
  bill: IBalances | null;
  date: string[] | null;
  selectedCategory: IBaseCategory | null;
  summ: string | null;
  description: string | null;
  location: number[] | null;
  operationType: TransactionType;
};

const useAddOperation = (OperationParams: OperationParamsType) => {
  const dispatch = useDispatch<AppDispatch>();

  const OperationAdd = async (): Promise<void> => {
    dispatch(ShowPreloader());
    const {
      bill,
      operationType,
      summ,
      description,
      selectedCategory,
      location,
      date,
    } = OperationParams;
    console.log(selectedCategory);
    const data =
      operationType === "WITHDRAW"
        ? {
            amount: summ,
            cents: 0,
            description: description,
            categoryId: selectedCategory?.id,
            lon: location![1],
            lat: location![0],
            placeName: "string",
            time: `${date}T16:23:25.356Z`,
          }
        : {
            amount: summ,
            cents: 0,
            description: description,
            categoryId: selectedCategory?.id,
            time: `${date}T16:23:25.356Z`,
          };

    try {
      const url =
        operationType === "WITHDRAW"
          ? `api/v1/bill/withdraw/${bill?.id}`
          : `api/v1/bill/deposit/${bill?.id}`;

      const res = await axios.patch(`${API_URL}${url}`, data);
      console.log("res", res);
      if (res.data.status === 200) {
        console.log(res.data.data);
        dispatch(UpdateOperations());
        dispatch(HidePreloader());
        dispatch(
          ShowToast({
            type: "success",
            title: "Успех",
            text: "Операция успешно добавлена",
          })
        );
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      dispatch(HidePreloader());
      console.log(error.response);
      console.log(error.message);
    }
  };
  return { OperationAdd };
};

export default {
  useGetTransaction,
  useGetTinkoffTransactions,
  useBudgetСalculation,
  useAddOperation,
};
