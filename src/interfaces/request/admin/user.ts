import User from "src/interfaces/user";
import Pagination from "../pagination";

export interface CreateUserRequest extends Omit<User, "id" | "access_type"> { }

export interface FilterUserRequest extends Partial<Omit<User, "id" | "access_type" | "password">> { }

export interface ReadUsersRequest extends Pagination<FilterUserRequest> { }

export interface ReadUserRequest {
  id: string;
}

export interface UpdateUserRequest extends Partial<Omit<User, "access_type">> {
  id: string;
}

export interface DeleteUserRequest {
  id: string;
}
