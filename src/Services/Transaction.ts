import axios from "Utils/Axios";

import moment from "moment";

import { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";

import { GetUserId, GetUserToken } from "Redux/Selectors";

import ArrayGroups from "Utils/ArrayGroups";

import { API_URL } from "Utils/Config";

import { ITransaction } from "./Interfaces";

export type TransactionsSortedType = {
  createAt: string;
  transactions: ITransaction[];
};

interface State {
  transactions: TransactionsSortedType[];
  income: number;
  expenses: number;
  load: boolean;
  selectedDate: string;
}

const useGetTransaction = () => {
  const userId = useSelector(GetUserId);

  const [state, setState] = useState<State>({
    transactions: [],
    income: 0,
    expenses: 0,
    load: false,
    selectedDate: "2022-03-09",
  });

  const setDate = (v: string): void => {
    setState({
      ...state,
      selectedDate: moment(v).format("YYYY-MM-DD"),
    });
  };

  const prev = (): void => {
    let currentDate = moment(state.selectedDate);

    setState({
      ...state,
      selectedDate: moment(currentDate)
        .subtract(1, "months")
        .format("YYYY-MM-DD"),
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
      selectedDate: futureMonth.format("YYYY-MM-DD"),
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
      selectedDate: "2022-03-09",
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
      .find((g) => g.createAt === state.selectedDate)
      ?.transactions.map((t) => t.sum);
    if (f) return f;
    else return [];
  }, [state.selectedDate, state.transactions]);

  const filterdTransactions = useMemo(() => {
    const f = state.transactions.filter(
      (g) => g.createAt === state.selectedDate
    );
    if (f) return f;
    else return [];
  }, [state.selectedDate, state.transactions]);

  useEffect(() => {
    init();
  }, []);

  return {
    ...state,
    transactions: filterdTransactions,
    prices: prices,
    prev,
    next,
    selectedDate: state.selectedDate,
    setDate,
  };
};

const budgetСalculation = (
  transactions: TransactionsSortedType[],
  income: number,
  expenses: number
) => {};

export default {
  useGetTransaction,
  budgetСalculation,
};
