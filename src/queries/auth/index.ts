import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import * as api from "src/api/auth/index";

export const useUpdateUser = (options?: UseMutationOptions<AxiosResponse>) => {
  return useMutation(api.updateUser, options as any);
};
