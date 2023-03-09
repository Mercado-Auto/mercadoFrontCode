import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/admin/city";
import {
  CreateCityResponse,
  DeleteCityResponse,
  UpdateCityResponse,
} from "src/interfaces/response/admin/city";

export const useCreateCity = (
  options?: UseMutationOptions<AxiosResponse<CreateCityResponse>>
) => {
  return useMutation(api.createCity, options as any);
};

export const useDeleteCity = (
  options?: UseMutationOptions<AxiosResponse<DeleteCityResponse>>
) => {
  return useMutation(api.deleteCity, options as any);
};

export const useEditCity = (
  options?: UseMutationOptions<AxiosResponse<UpdateCityResponse>>
) => {
  return useMutation(api.updateCity, options as any);
};

export const useReadCities = (options: any) => {
  return useQuery(["adminCities", options], () => api.readCities(options), {
    refetchOnWindowFocus: false,
  });
};

export const useReadCity = (id: string) => {
  return useQuery(["adminCity"], () => api.readCity({ id }), {
    refetchOnWindowFocus: false,
  });
};
