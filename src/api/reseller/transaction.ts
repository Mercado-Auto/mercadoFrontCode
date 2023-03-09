import axios from "..";

import {
  ReadTransactionsRequest,
} from "src/interfaces/request/reseller/transaction";

import {
  ReadTransactionsResponse,
} from "src/interfaces/response/reseller/transaction";
import { AxiosResponse } from "axios";

export const readTransactions = async (
  params?: ReadTransactionsRequest
): Promise<ReadTransactionsResponse> => {
  const { data } = await axios.get<
    ReadTransactionsRequest,
    AxiosResponse<ReadTransactionsResponse>
  >(`/resellers/transactions`, {
    params: {
      ...params,
      ...(params?.filters ? { filters: JSON.stringify(params.filters) } : {})
    },
  });

  return data;
};
