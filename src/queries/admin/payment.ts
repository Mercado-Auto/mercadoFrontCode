import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/admin/payment";
import {ReadPaymentsRequest} from "../../interfaces/request/admin/payment";
import {AxiosResponse} from "axios";

export const useReadPayments = (params?: ReadPaymentsRequest, key = "resellerPayments") => {
  return useQuery([key], () => api.readPayments(params), {
    refetchOnWindowFocus: false,
  });
};

export const useUpdatePaymentStatus = (options?: UseMutationOptions<AxiosResponse<void>>) => {
  return useMutation(
    api.updatePaymentStatus,
    options as any
  );
}
