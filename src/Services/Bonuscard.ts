import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HidePreloader, ShowPreloader, ShowToast } from "Redux/Actions";
import { GetUserId } from "Redux/Selectors";
import axios from "Utils/Axios";
import { API_URL } from "Utils/Config";
import { IBonus, IBonusBlank } from "./Interfaces";

export const useBonusCards = () => {
  const userId = useSelector(GetUserId);
  const dispatch = useDispatch();

  const [bonusCards, setBonusCards] = useState<IBonus[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const getBonusCards = async () => {
    try {
      setIsLoad(false);

      const { data } = await axios.get(
        `${API_URL}api/v1/loyalty-card/user/?userId=${userId}`
      );

      if (data.status === 200) {
        setBonusCards(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      dispatch(
        ShowToast({
          title: "Ошибка",
          text: error.message,
          type: "error",
        })
      );
    } finally {
      setIsLoad(true);
    }
  };

  const deleteBonusCard = async (cardId: string | number) => {
    try {
      dispatch(ShowPreloader());

      const { data } = await axios.delete(
        `${API_URL}api/v1/loyalty-card/${cardId}`
      );

      if (data.status === 200) {
        dispatch(
          ShowToast({
            title: "Успешно",
            text: "Карточка успешно удалена",
            type: "success",
          })
        );
        getBonusCards();
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      dispatch(
        ShowToast({
          title: "Ошибка",
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(HidePreloader());
    }
  };

  const createBonusCard = async (
    blankId: string,
    code: string,
    onSuccess: () => void
  ) => {
    try {
      dispatch(ShowPreloader());

      const response = await axios.post(`${API_URL}api/v1/loyalty-card/`, {
        blankId,
        userId,
        data: code,
      });

      if (response.data.status === 201) {
        dispatch(
          ShowToast({
            title: "Успешно",
            text: "Карточка успешно создана",
            type: "success",
          })
        );
        getBonusCards();
        onSuccess();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      dispatch(
        ShowToast({
          title: "Ошибка",
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(HidePreloader());
    }
  };

  useEffect(() => {
    getBonusCards();
  }, []);

  return {
    bonusCards,
    isLoad,
    deleteBonusCard,
    createBonusCard,
  };
};

export const useBonusCardBlanks = () => {
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const [bonusCardBlanks, setBonusCardBlanks] = useState<IBonusBlank[]>([]);

  const getBlanks = async () => {
    try {
      setIsLoad(false);

      const { data } = await axios.get(`${API_URL}api/v1/loyalty-blank/`);

      if (data.status === 200) {
        setBonusCardBlanks(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      dispatch(
        ShowToast({
          title: "Ошибка",
          text: error.message,
          type: "error",
        })
      );
    } finally {
      setIsLoad(true);
    }
  };

  useEffect(() => {
    getBlanks();
  }, []);

  return {
    bonusCardBlanks,
    isLoad,
  };
};
