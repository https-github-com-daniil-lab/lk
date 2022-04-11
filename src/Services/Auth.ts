import axios from "Utils/Axios";

import { AppDispatch, RootStore } from "Redux/Store";

import { HidePreloader, Logout, SetUser, ShowPreloader } from "Redux/Actions";

import { Buffer } from "buffer";

import { API_URL } from "Utils/Config";

class Auth {
  dispatch: AppDispatch | undefined;
  store?: RootStore | undefined;

  constructor(dispatch: AppDispatch, store?: RootStore) {
    this.dispatch = dispatch;
    this.store = store;
  }

  private clearNumber(str: string): string {
    return str.replace(/[^0-9]/g, "");
  }

  public async ChekRegister(username: string): Promise<boolean | undefined> {
    if (this.dispatch) {
      try {
        if (username === "") throw new Error("Поле не должно быть пустым");
        this.dispatch(ShowPreloader());

        const response = await axios({
          method: "post",
          url: `${API_URL}api/v1/auth/check-register`,
          data: {
            phone: `+${this.clearNumber(username)}`,
          },
        });

        if (response.status === 200) {
          this.dispatch(HidePreloader());
          return true;
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        this.dispatch(HidePreloader());
        if (error.request.status === 404) {
          return false;
        } else {
          alert(error.message);
        }
      }
    }
  }

  public async SignIn(username: string, password: string): Promise<void> {
    if (this.dispatch) {
      try {
        if (username === "" || password === "")
          throw new Error("Заполните все поля");

        const data = {
          username: `+${this.clearNumber(username)}`,
          password: Buffer.from(password).toString("base64"),
        };

        const response = await axios({
          method: "post",
          url: `${API_URL}api/v1/auth/`,
          data,
        });

        if (response.status === 200) {
          const { token, user } = response.data.data;
          if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user_id", user.id);

            this.dispatch(SetUser(token, user));
          }
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        alert(error.message);
      }
    }
  }

  private async GetUser(user_id: string, token: string): Promise<void> {
    if (this.dispatch) {
      try {
        const response = await axios({
          method: "get",
          url: `${API_URL}api/v1/user/${user_id}`,
        });

        if (response.status === 200) {
          const user = response.data.data;
          this.dispatch(SetUser(token, user));
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        alert(error.message);
      }
    }
  }

  public async Initialization(): Promise<void> {
    if (this.dispatch) {
      try {
        this.dispatch(ShowPreloader());
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        if (token && user_id) {
          await this.GetUser(user_id, token);
        }
        this.dispatch(HidePreloader());
      } catch (error: any) {
        this.dispatch(HidePreloader());
        alert(error.message);
      }
    }
  }

  public async SmsSubmit(username: string): Promise<string | undefined> {
    if (this.dispatch) {
      try {
        this.dispatch(ShowPreloader());

        const data = {
          phone: `+${this.clearNumber(username)}`,
        };

        const response = await axios({
          method: "post",
          url: `${API_URL}api/v1/auth/sms-submit`,
          data,
        });

        if (response.status === 200) {
          this.dispatch(HidePreloader());
          return response.data.data.id;
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        this.dispatch(HidePreloader());
        alert(error.message);
      }
    }
  }

  public async SmsConfirm(
    id: string,
    code: string
  ): Promise<boolean | undefined> {
    if (this.dispatch) {
      try {
        if (code === "") throw new Error("Заполните все поля");
        this.dispatch(ShowPreloader());

        const data = {
          id,
          code,
        };

        const response = await axios({
          method: "post",
          url: `${API_URL}api/v1/auth/sms-submit/result`,
          data,
        });

        if (response.status === 200) {
          this.dispatch(HidePreloader());
          return true;
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        this.dispatch(HidePreloader());
        alert(error.message);
      }
    }
  }

  public async CreateUser(
    username,
    password,
    walletType,
    email,
    type
  ): Promise<void> {
    if (this.dispatch) {
      try {
        const data = {
          username: `+${this.clearNumber(username)}`,
          password: Buffer.from(password).toString("base64"),
          walletType,
          email,
          type,
        };

        const response = await axios({
          method: "post",
          url: `${API_URL}api/v1/user/`,
          data,
        });
        if (response.status === 201) {
          this.dispatch(HidePreloader());
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        this.dispatch(HidePreloader());
        alert(error.message);
      }
    }
  }

  public Logout() {
    if (this.dispatch) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      this.dispatch(Logout());
    }
  }
}

export default Auth;
