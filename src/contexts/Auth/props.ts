import {
  LoginRequest,
  register,
  ResetPasswordRequest,
  User,
  UserType,
  ConfirmEmailRequest,
} from "src/api/auth";
import { MenuProps } from "antd";

export interface AuthLoginArg extends LoginRequest {
  remember: boolean;
}

export interface AuthState extends User {
  token: string;
  isAuthenticated: boolean;
}

export interface AuthProps extends AuthState {
  menu: Required<MenuProps["items"]>;
  register: typeof register;
  confirmEmail(data: ConfirmEmailRequest): Promise<void>;

  login(data: AuthLoginArg): Promise<void>;
  isType(type: UserType | UserType[]): boolean;
  sendRecoverEmail(email: string): Promise<void>;
  logout(redirectToLogin: boolean): Promise<void>;
  resetPassword(data: ResetPasswordRequest): Promise<void>;
  resetPasswordByUser(data: ResetPasswordRequest): Promise<void>;
}
