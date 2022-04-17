import axios from "./Axios";
import { API_URL } from "./Config";
import { Banks } from "./Types";

interface Params {
  code: string | number;
  bankUserId: string;
  password: string;
  exportDate: string;
}

const submitBankConnection = async (bank: Banks, params: Params) => {
  if (bank === "tinkoff") {
    const { data } = await axios.post(
      `${API_URL}api/v1/tinkoff/connect/submit`,
      {
        code: params.code,
        id: params.bankUserId,
        password: params.password,
      }
    );

    return data;
  }

  if (bank === "sber") {
    const { data } = await axios.post(`${API_URL}api/v1/sber/connect/submit`, {
      code: params.code,
      userId: params.bankUserId,
    });

    return data;
  }

  if (bank === "tochka") {
    const { data } = await axios.post(
      `${API_URL}api/v1/tochka/connect/submit-auth`,
      {
        code: params.code,
        userId: params.bankUserId,
        startDate: params.exportDate,
      }
    );

    return data;
  }
};
export default submitBankConnection;
