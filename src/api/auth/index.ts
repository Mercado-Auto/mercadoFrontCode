import { UpdateProductRequest } from "src/interfaces/request/auth";
import axios from "..";
import {
  ConfirmEmailRequest,
  ForgetPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  User,
} from "./models";

export const login = async (data: LoginRequest) => {
  return await axios.post<LoginResponse>(`/auth/login`, data);
};

export const profile = async () => {
  return await axios.get<User>("/auth/profile");
};

export const sendRecoverEmail = async (email: string) => {
  return await axios.post<void>(`/auth/forget-password`, { email });
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  return await axios.post<void>(`/auth/change-password/${data.token}`, data);
};

export const updateUser = async (data: UpdateProductRequest) => {
  return await axios.patch<void>(`/users/change-user`, data);
};

export const resetPasswordOfUser = async (data: ResetPasswordRequest) => {
  return await axios.post<void>(
    `/app/accounts/change-password/${data.token}`,
    data
  );
};

export const register = async (data: RegisterRequest) => {
  return await axios.post<void>(`/auth/register`, data);
};

export const confirmEmail = async (data: ConfirmEmailRequest) => {
  return await axios.post<void>(`/auth/confirm-mail/${data.token}`, data);
};

export * from "./models";
