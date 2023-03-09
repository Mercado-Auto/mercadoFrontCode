import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/admin/section";
import {
  CreateSectionResponse,
  DeleteSectionResponse,
  UpdatePositionResponse,
  UpdateSectionResponse,
} from "src/interfaces/response/admin/section";

export const useCreateSection = (
  options?: UseMutationOptions<AxiosResponse<CreateSectionResponse>>
) => {
  return useMutation(api.createSection, options as any);
};

export const useDeleteSection = (
  options?: UseMutationOptions<AxiosResponse<DeleteSectionResponse>>
) => {
  return useMutation(api.deleteSection, options as any);
};

export const useEditSection = (
  options?: UseMutationOptions<AxiosResponse<UpdateSectionResponse>>
) => {
  return useMutation(api.updateSection, options as any);
};

export const useEditPosition = (
  options?: UseMutationOptions<AxiosResponse<UpdatePositionResponse>>
) => {
  return useMutation(api.updatePosition, options as any);
};

export const useReadSections = (options: any) => {
  return useQuery(["adminSections", options], () => api.readSections(options), {
    refetchOnWindowFocus: false,
  });
};

export const useReadSection = (id: string) => {
  return useQuery(["adminSection"], () => api.readSection({ id }), {
    refetchOnWindowFocus: false,
  });
};
