import axios from "..";

import {
  CreateUserRequest,
  ReadUsersRequest,
  ReadUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from "src/interfaces/request/admin/user";

import {
  ReadUsersResponse,
  ReadUserResponse,
  CreateUserResponse,
} from "src/interfaces/response/admin/user";
import { AxiosResponse } from "axios";

export const createUser = async (
  data: CreateUserRequest
): Promise<CreateUserResponse> => {
  const { data: retval } = await axios.post<
    CreateUserRequest,
    AxiosResponse<CreateUserResponse>
  >(`/users`, data);

  return retval;
};

export const readUsers = async (
  options: ReadUsersRequest
): Promise<ReadUsersResponse> => {
  const { data } = await axios.get<
    ReadUsersRequest,
    AxiosResponse<ReadUsersResponse>
  >(`/users`, {
    params: {
      ...options,
      ...(options.filters && Object.keys(options.filters).length
        ? { filters: JSON.stringify(options.filters) }
        : { filters: {} }),
    },
  });

  return data;
};

export const readUser = async ({
  id,
}: ReadUserRequest): Promise<ReadUserResponse> => {
  const { data: retval } = await axios.get<
    ReadUserRequest,
    AxiosResponse<ReadUserResponse>
  >(`/users/${id}`);
  return retval;
};

export const updateUser = async ({
  id,
  ...data
}: UpdateUserRequest): Promise<void> => {
  const { data: retval } = await axios.patch<
    UpdateUserRequest,
    AxiosResponse<void>
  >(`/users/${id}`, data);
  return retval;
};

export const deleteUser = async ({ id }: DeleteUserRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteUserRequest,
    AxiosResponse<void>
  >(`/users/${id}`);
  return retval;
};
