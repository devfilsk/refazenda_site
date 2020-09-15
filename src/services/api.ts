import axios from "axios";

export const TOKEN_LABEL = "refazenda:user:token";

export const api2 = axios.create({
  baseURL: "http://localhost:3000"
});

export const api = axios.create({
  // baseURL: "https://api-santamalmita.herokuapp.com/" // SANTA MALMITA
  // baseURL: "https://santamalmita-api.herokuapp.com/", // DEVFILSK
  baseURL: "http://localhost:3333/api/v1/"
});

api.interceptors.request.use(
  function(config: any) {
    const token = localStorage.getItem(TOKEN_LABEL);
    if (token) {
      config.headers.Accept = "application/json";
      config.headers.Authorization = token;
      config.headers.contentType = "application/json";
    }
    return config;
  },
  function error(error: any) {
    return Promise.reject(error);
  }
);
