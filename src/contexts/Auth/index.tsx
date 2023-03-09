import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  login as loginHandler,
  resetPassword as resetPasswordHandler,
  resetPasswordOfUser as resetPasswordUserHandler,
  ResetPasswordRequest,
  sendRecoverEmail as sendRecoverEmailHandler,
  RegisterRequest,
  register as registerHandler,
  confirmEmail as confirmEmailHandler,
  UserType,
  profile as profileHandler,
  ConfirmEmailRequest,
} from "src/api/auth";
import { getHTTPError } from "src/api/get-http-error";
import { useEffectOnlyOnce } from "src/hooks/use-effect-only-once";

import { Storage } from "../../utils/storage";
import menuList from "./menu-list";
import { AuthLoginArg, AuthProps, AuthState } from "./props";

export const Context = createContext<AuthProps>({} as AuthProps);

const SAVED_STATE =
  Storage.getItem(process.env.REACT_APP_STORAGE_USER_KEY) ?? {};

const CLEAN_STATE: AuthState = {} as AuthState;

const INITIAL_STATE: AuthState = {
  ...CLEAN_STATE,
  ...(SAVED_STATE || {}),
};

const Provider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<AuthState>(INITIAL_STATE);
  const [menu, setMenu] = useState<AuthProps["menu"]>(
    menuList[user.access_type] ?? []
  );

  const updateMenu = useCallback((data: AuthState) => {
    if (data.token && data.access_type) {
      setMenu(menuList[data.access_type]);
    } else {
      setMenu([]);
    }
  }, []);

  const loadProfile = useCallback(
    async (userData?: any) => {
      let newAuthUserState = {
        ...(userData ? userData : {}),
      };
      try {
        const { data } = await profileHandler();
        newAuthUserState = {
          ...newAuthUserState,
          ...data,
          verified_email: true,
        };

        setUser(newAuthUserState);
      } catch {
        setUser(CLEAN_STATE);
      } finally {
        updateMenu(newAuthUserState);
      }
    },
    [updateMenu]
  );

  const login = useCallback(
    async (data: AuthLoginArg) => {
      try {
        const { data: response } = await loginHandler(data);
        if (response) {
          const newState = {
            ...INITIAL_STATE,
            token: response.access_token,
            isAuthenticated: true,
          };
          Storage.setItem(process.env.REACT_APP_STORAGE_USER_KEY, newState);
          setUser(newState);
          await loadProfile(newState);
        }
      } catch (error) {
        throw getHTTPError(error);
      }
    },
    [loadProfile]
  );

  const sendRecoverEmail = useCallback(async (email: string) => {
    try {
      await sendRecoverEmailHandler(email);
    } catch (error) {
      throw getHTTPError(error);
    }
  }, []);

  const resetPassword = useCallback(async (data: ResetPasswordRequest) => {
    try {
      await resetPasswordHandler(data);
    } catch (error) {
      throw getHTTPError(error);
    }
  }, []);

  const resetPasswordByUser = useCallback(
    async (data: ResetPasswordRequest) => {
      try {
        await resetPasswordUserHandler(data);
      } catch (error) {
        throw getHTTPError(error);
      }
    },
    []
  );

  const confirmEmail = useCallback(async (data: ConfirmEmailRequest) => {
    try {
      await confirmEmailHandler(data);
    } catch (error) {
      throw getHTTPError(error);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      return await registerHandler(data);
    } catch (error) {
      throw getHTTPError(error);
    }
  }, []);

  const logout = useCallback(async (redirectToLogin = true) => {
    setUser(CLEAN_STATE);

    if (redirectToLogin) {
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 300);
    }
  }, []);

  const isType = useCallback(
    (type: UserType | UserType[]) => {
      return (Array.isArray(type) ? type : [type]).includes(user.access_type);
    },
    [user]
  );

  useEffect(() => {
    Storage.setItem(process.env.REACT_APP_STORAGE_USER_KEY, user);
  }, [user]);

  useEffectOnlyOnce(() => {
    loadProfile(user).then(() => console.log("Profile is ready!"));
  }, [loadProfile, user]);

  return (
    <Context.Provider
      value={{
        ...user,
        menu,
        login,
        logout,
        isType,
        register,
        confirmEmail,
        resetPassword,
        sendRecoverEmail,
        resetPasswordByUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = (): AuthProps => {
  return useContext(Context);
};

export default Provider;
export * from "./props";
