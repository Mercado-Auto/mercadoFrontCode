import { BaseGetResponse } from "../base";
import User from "src/interfaces/user";
import Reseller from "src/interfaces/reseller";

export interface ReadUsersResponse extends BaseGetResponse<User> { }

export interface ReadUserResponse extends User {
  reseller?: Reseller;
}

export interface CreateUserResponse extends ReadUserResponse { }

export interface DeleteUserResponse { }

export interface UpdateUserResponse { }
