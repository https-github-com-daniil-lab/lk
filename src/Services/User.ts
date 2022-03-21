import axios from "Utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { GetUserId } from "Redux/Selectors";
import { AppDispatch } from "Redux/Store";
import { API_URL } from "Utils/Config";
import { HidePreloader, ShowPreloader, ShowToast } from "Redux/Actions";
import IsPhone from "Utils/IsPhone";
import IsEmail from "Utils/IsEmail";

const useEditEmail = (email: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(GetUserId);

  const setEditableEmail = async (): Promise<void> => {
    try {
      if (IsEmail(email)) {
        dispatch(ShowPreloader());
        const res = await axios.patch(`${API_URL}api/v1/user/${userId}`, {
          email,
        });
        if (res.data.status === 200) {
          dispatch(HidePreloader());
          dispatch(
            ShowToast({
              text: "Email изменен",
              title: "Успех",
              type: "success",
            })
          );
        } else {
          throw new Error(res.data.message);
        }
      } else {
        throw new Error("Некорректный email");
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
    setEditableEmail,
  };
};

const useEditPhone = (phone: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(GetUserId);

  const setEditablePhone = async (): Promise<void> => {
    try {
      if (IsPhone(phone)) {
        dispatch(ShowPreloader());
        const res = await axios.patch(`${API_URL}api/v1/user/${userId}`, {
          username: phone,
        });
        if (res.data.status === 200) {
          dispatch(HidePreloader());
          dispatch(
            ShowToast({
              text: "Номер телефона изменен",
              title: "Успех",
              type: "success",
            })
          );
        } else {
          throw new Error(res.data.message);
        }
      } else {
        throw new Error("Некорректный номер телефона");
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
    setEditablePhone,
  };
};

export default { useEditEmail, useEditPhone };
