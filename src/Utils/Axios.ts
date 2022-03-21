import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use((config: any): AxiosRequestConfig<any> => {
  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  config.headers["Content-Type"] = "application/json";

  return config;
});

export default axios;
