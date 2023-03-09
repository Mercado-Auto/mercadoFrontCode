import axios from "..";

import {
  ReadPaymentsRequest,
} from "src/interfaces/request/admin/payment";

import {
  ReadPaymentsResponse,
} from "src/interfaces/response/admin/payment";
import { AxiosResponse } from "axios";
import {generatorTransactions} from "../../utils/generator-transactions";

export const readPayments = async (
  params?: ReadPaymentsRequest
): Promise<ReadPaymentsResponse> => {
  const { data } = await axios.get<
    ReadPaymentsRequest,
    AxiosResponse<ReadPaymentsResponse>
  >(`/transactions`, {
    params: {
      ...params,
      ...(params?.filters ? { filters: JSON.stringify(params.filters) } : {})
    },
  });
  //   .then(() => {
  //   return {
  //     data: {
  //       data: generatorTransactions(20, true, false, true).map((item) => ({ ...item, processed: false, })),
  //       total: 20,
  //     }
  //   };
  // });

  return data;
};

export const updatePaymentStatus = async (ids: string[]): Promise<void> => {
  await axios.patch<
    void,
    AxiosResponse<void>
  >(`/transactions/process`, { transactions: ids });
};
