import axios from "..";

import {
  CreateResellerRequest,
  ReadResellersRequest,
  ReadResellerRequest,
  UpdateResellerRequest,
  DeleteResellerRequest,
} from "src/interfaces/request/admin/reseller";

import {
  ReadResellersResponse,
  ReadResellerResponse,
  CreateResellerResponse,
} from "src/interfaces/response/admin/reseller";
import { AxiosResponse } from "axios";

export const createReseller = async (
  data: CreateResellerRequest
): Promise<CreateResellerResponse> => {
  const { data: retval } = await axios.post<
    CreateResellerRequest,
    AxiosResponse<CreateResellerResponse>
  >(`/resellers`, data);

  return retval;
};

export const readResellers = async (
  options: ReadResellersRequest
): Promise<ReadResellersResponse> => {
  const { data } = await axios.get<
    ReadResellersRequest,
    AxiosResponse<ReadResellersResponse>
  >(`/resellers`, {
    params: options,
  });

  return data;
};

export const readReseller = async ({
  id,
}: ReadResellerRequest): Promise<ReadResellerResponse> => {
  const { data: retval } = await axios.get<
    ReadResellerRequest,
    AxiosResponse<ReadResellerResponse>
  >(`/resellers/${ id }`);
  return retval;
};

export const updateReseller = async ({
  id,
  ...data
}: UpdateResellerRequest): Promise<void> => {
  const { data: retval } = await axios.patch<
    UpdateResellerRequest,
    AxiosResponse<void>
  >(`/resellers/${ id }`, data);
  return retval;
};

export const deleteReseller = async ({ id }: DeleteResellerRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteResellerRequest,
    AxiosResponse<void>
  >(`/resellers/${ id }`);
  return retval;
};
