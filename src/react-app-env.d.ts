/// <reference types="react-scripts" />
declare namespace NodeJS {

  interface ProcessEnv {
    REACT_APP_SECRET_KEY: string;
    REACT_APP_VERSION: string;
    REACT_APP_STORAGE_USER_KEY: string;
    REACT_APP_API: string;
    REACT_APP_STORAGE: string;
  }
}
