import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import * as api from "src/api/admin/tag";
import {
  CreateTagResponse,
  DeleteTagResponse,
  UpdateTagResponse,
} from "src/interfaces/response/admin/tag";

export const useCreateTag = (
  options?: UseMutationOptions<AxiosResponse<CreateTagResponse>>
) => {
  return useMutation(api.createTag, options as any);
};

export const useDeleteTag = (
  options?: UseMutationOptions<AxiosResponse<DeleteTagResponse>>
) => {
  return useMutation(api.deleteTag, options as any);
};

export const useEditTag = (
  options?: UseMutationOptions<AxiosResponse<UpdateTagResponse>>
) => {
  return useMutation(api.updateTag, options as any);
};

export const useReadTags = (options: any) => {
  return useQuery(["adminTags", options], () => api.readTags(options), {
    refetchOnWindowFocus: false,
  });
};

export const useReadTag = (id: string) => {
  return useQuery(["adminTag"], () => api.readTag({ id }), {
    refetchOnWindowFocus: false,
  });
};
