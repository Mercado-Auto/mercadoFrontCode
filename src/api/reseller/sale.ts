import {
  DeleteSaleNFRequest,
  UpdateTrackerCodeSaleRequest,
} from "./../../interfaces/request/reseller/sale";
import {
  DeleteSaleNFResponse,
  UpdateTrackerCodeSaleResponse,
} from "./../../interfaces/response/reseller/sale";
import axios from "..";

import {
  ReadSalesRequest,
  ReadSaleRequest,
} from "src/interfaces/request/reseller/sale";

import {
  ReadSalesResponse,
  ReadSaleResponse,
} from "src/interfaces/response/reseller/sale";
import { AxiosResponse } from "axios";

export const readSales = async (
  options: ReadSalesRequest
): Promise<ReadSalesResponse> => {
  const { data } = await axios.get<
    ReadSalesRequest,
    AxiosResponse<ReadSalesResponse>
  >(`/sales`, {
    params: {
      ...options,
      ...(options.filters && Object.keys(options.filters).length
        ? { filters: JSON.stringify(options.filters) }
        : { filters: {} }),
    },
  });

  return data;
};

export const readSale = async ({
  id,
}: ReadSaleRequest): Promise<ReadSaleResponse> => {
  const { data: retval } = await axios.get<
    ReadSaleRequest,
    AxiosResponse<ReadSaleResponse>
  >(`/sales/${id}`);
  return retval;
};

export const updateSaleStatus = async ({
  sale_id,
  tracker_code,
}: UpdateTrackerCodeSaleRequest): Promise<UpdateTrackerCodeSaleResponse> => {
  const { data: retval } = await axios.patch<
    ReadSaleRequest,
    AxiosResponse<UpdateTrackerCodeSaleResponse>
  >(`/sales/${sale_id}`, tracker_code ? { tracker_code } : {});
  return retval;
};

export const deleteSaleNF = async ({
  sale_id,
}: DeleteSaleNFRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteSaleNFResponse,
    AxiosResponse<void>
  >(`/sales/${sale_id}/detach-nf`);
  return retval;
};
