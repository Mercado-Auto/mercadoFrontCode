import axios from "..";

import {
  CreateTagRequest,
  ReadTagsRequest,
  ReadTagRequest,
  UpdateTagRequest,
  DeleteTagRequest,
} from "src/interfaces/request/admin/tag";

import {
  ReadTagsResponse,
  ReadTagResponse,
  CreateTagResponse,
} from "src/interfaces/response/admin/tag";
import { AxiosResponse } from "axios";

export const createTag = async (
  data: CreateTagRequest
): Promise<CreateTagResponse> => {
  const { data: retval } = await axios.post<
    CreateTagRequest,
    AxiosResponse<CreateTagResponse>
  >(`/tags`, data);

  return retval;
};

export const readTags = async (
  options: ReadTagsRequest
): Promise<ReadTagsResponse> => {
  const { data } = await axios.get<
    ReadTagsRequest,
    AxiosResponse<ReadTagsResponse>
  >(`/tags`, {
    params: {
      ...options,
      ...(options.filters && Object.keys(options.filters).length
        ? { filters: JSON.stringify(options.filters) }
        : { filters: {} }),
    },
  });

  return data;
};

export const readTag = async ({
  id,
}: ReadTagRequest): Promise<ReadTagResponse> => {
  const { data: retval } = await axios.get<
    ReadTagRequest,
    AxiosResponse<ReadTagResponse>
  >(`/tags/${id}`);
  return retval;
};

export const updateTag = async ({
  id,
  ...data
}: UpdateTagRequest): Promise<void> => {
  const { data: retval } = await axios.patch<
    UpdateTagRequest,
    AxiosResponse<void>
  >(`/tags/${id}`, data);
  return retval;
};

export const deleteTag = async ({ id }: DeleteTagRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteTagRequest,
    AxiosResponse<void>
  >(`/tags/${id}`);
  return retval;
};
