import axios from "..";

import {
  CreateCityRequest,
  ReadCitiesRequest,
  ReadCityRequest,
  UpdateCityRequest,
  DeleteCityRequest,
} from "src/interfaces/request/admin/city";

import {
  ReadCitiesResponse,
  ReadCityResponse,
  CreateCityResponse,
} from "src/interfaces/response/admin/city";
import { AxiosResponse } from "axios";

export const createCity = async (
  data: CreateCityRequest
): Promise<CreateCityResponse> => {
  const { data: retval } = await axios.post<
    CreateCityRequest,
    AxiosResponse<CreateCityResponse>
  >(`/cities`, data);

  return retval;
};

export const readCities = async (
  options: ReadCitiesRequest
): Promise<ReadCitiesResponse> => {
  const { data } = await axios.get<
    ReadCitiesRequest,
    AxiosResponse<ReadCitiesResponse>
  >(`/cities`, {
    params: {
      ...options,
      ...(options.filters && Object.keys(options.filters).length
        ? { filters: JSON.stringify(options.filters) }
        : { filters: {} }),
    },
  });

  return data;
};

export const readCity = async ({
  id,
}: ReadCityRequest): Promise<ReadCityResponse> => {
  const { data: retval } = await axios.get<
    ReadCityRequest,
    AxiosResponse<ReadCityResponse>
  >(`/cities/${id}`);
  return retval;
};

export const updateCity = async ({
  id,
  ...data
}: UpdateCityRequest): Promise<void> => {
  const { data: retval } = await axios.patch<
    UpdateCityRequest,
    AxiosResponse<void>
  >(`/cities/${id}`, data);
  return retval;
};

export const deleteCity = async ({ id }: DeleteCityRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteCityRequest,
    AxiosResponse<void>
  >(`/cities/${id}`);
  return retval;
};
