import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/admin/reseller";
import { CreateResellerResponse, DeleteResellerResponse, UpdateResellerResponse } from "src/interfaces/response/admin/reseller";


export const useCreateReseller = (options?: UseMutationOptions<AxiosResponse<CreateResellerResponse>>) => {
  return useMutation(
    api.createReseller,
    options as any
  );
}

export const useDeleteReseller = (options?: UseMutationOptions<AxiosResponse<DeleteResellerResponse>>) => {
  return useMutation(
    api.deleteReseller,
    options as any
  );
}

export const useEditReseller = (options?: UseMutationOptions<AxiosResponse<UpdateResellerResponse>>) => {
  return useMutation(
    api.updateReseller,
    options as any
  );
}

export const useReadResellers = () => {
  return useQuery(["adminResellers"], () => api.readResellers({}), {
    refetchOnWindowFocus: false,
  });
};

export const useReadReseller = (id: string) => {
  return useQuery(["adminReseller"], () => api.readReseller({ id }), {
    refetchOnWindowFocus: false,
  });
};
