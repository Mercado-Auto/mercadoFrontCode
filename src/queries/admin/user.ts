import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/admin/user";
import {
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserResponse,
} from "src/interfaces/response/admin/user";

export const useCreateUser = (
  options?: UseMutationOptions<AxiosResponse<CreateUserResponse>>
) => {
  return useMutation(api.createUser, options as any);
};

export const useDeleteUser = (
  options?: UseMutationOptions<AxiosResponse<DeleteUserResponse>>
) => {
  return useMutation(api.deleteUser, options as any);
};

export const useEditUser = (
  options?: UseMutationOptions<AxiosResponse<UpdateUserResponse>>
) => {
  return useMutation(api.updateUser, options as any);
};

export const useReadUsers = (options: any) => {
  return useQuery(["adminUsers", options], () => api.readUsers(options), {
    refetchOnWindowFocus: false,
  });
};

export const useReadUser = (id: string) => {
  return useQuery(["adminUser"], () => api.readUser({ id }), {
    refetchOnWindowFocus: false,
  });
};
