import axios from "axios";

import { Storage } from "../utils/storage";

const baseURL = process.env.REACT_APP_API;

const apiInstance = axios.create({
  baseURL,
  withCredentials: true,
});

const IGNORE_AUTHORIZATION = [`https://viacep.com.br/`];

const ignoreRedirectToLogin = (url?: string): boolean => {
  if (
    url &&
    /login|register|recover|reset-password|reset-app-password/gm.test(url)
  ) {
    return true;
  }
  return false;
};

apiInstance.interceptors.request.use(
  (config) => {
    if (ignoreRedirectToLogin(config.url)) {
      return config;
    }

    if (
      IGNORE_AUTHORIZATION.some(
        (value) => `${config?.url}`.indexOf(value || "") > -1
      )
    ) {
      delete config.withCredentials;
      return config;
    }

    const user = Storage.getItem(process.env.REACT_APP_STORAGE_USER_KEY) ?? {};
    if (user && user?.token && user?.isAuthenticated) {
      config.headers!["Authorization"] = `Bearer ${user["token"]}`;
    } else {
      config.headers && delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response || typeof error === "object") {
      const currentPage = window.location.href;
      if (
        error?.response?.status === 401 &&
        window.location.pathname.indexOf("/auth/login") === -1 &&
        !ignoreRedirectToLogin(currentPage)
      ) {
        localStorage.removeItem(process.env.REACT_APP_STORAGE_USER_KEY);
        window.location.href = "/auth/login";
        // window.location.reload();
        return Promise.reject("Unauthorized");
      }
    }

    if (error.response.data?.message) {
      return Promise.reject(new Error(error.response.data?.message));
    }

    return Promise.reject(new Error(error));
  }
);

export default apiInstance;
