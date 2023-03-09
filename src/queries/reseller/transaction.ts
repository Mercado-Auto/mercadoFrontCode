import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/reseller/transaction";
import {ReadTransactionsRequest} from "../../interfaces/request/reseller/transaction";

export const useReadTransactions = (params?: ReadTransactionsRequest, key = "resellerTransactions") => {
  return useQuery([key], () => api.readTransactions(params), {
    refetchOnWindowFocus: false,
  });
};
