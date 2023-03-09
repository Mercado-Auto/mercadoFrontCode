import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/reseller/sale";

export const useReadSales = (params: any) => {
  return useQuery(["resellerSales", params], () => api.readSales(params), {
    refetchOnWindowFocus: false,
  });
};

export const useReadSale = (id: string) => {
  return useQuery(["resellerSale"], () => api.readSale({ id }), {
    refetchOnWindowFocus: false,
  });
};

export const useDeleteSaleNF = (
  options?: UseMutationOptions<AxiosResponse<void>>
) => {
  return useMutation(api.deleteSaleNF, options as any);
};

export const useUpdateSaleStatus = (
  options?: UseMutationOptions<AxiosResponse<void>>
) => {
  return useMutation(api.updateSaleStatus, options as any);
};
