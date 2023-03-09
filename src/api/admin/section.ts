import axios from "..";

import {
  CreateSectionRequest,
  ReadSectionsRequest,
  ReadSectionRequest,
  UpdateSectionRequest,
  DeleteSectionRequest,
  UpdateSectionPositionRequest,
} from "src/interfaces/request/admin/section";

import {
  ReadSectionsResponse,
  ReadSectionResponse,
  CreateSectionResponse,
} from "src/interfaces/response/admin/section";
import { AxiosResponse } from "axios";

export const createSection = async (
  data: CreateSectionRequest
): Promise<CreateSectionResponse> => {
  const { data: retval } = await axios.post<
    CreateSectionRequest,
    AxiosResponse<CreateSectionResponse>
  >(`/sections`, data);

  return retval;
};

export const readSections = async (
  options: ReadSectionsRequest
): Promise<ReadSectionsResponse> => {
  const { data } = await axios.get<
    ReadSectionsRequest,
    AxiosResponse<ReadSectionsResponse>
  >(`/sections`, {
    params: {
      ...options,
      ...(options.filters && Object.keys(options.filters).length
        ? { filters: JSON.stringify(options.filters) }
        : { filters: {} }),
    },
  });

  return data;
};

export const readSection = async ({
  id,
}: ReadSectionRequest): Promise<ReadSectionResponse> => {
  const { data: retval } = await axios.get<
    ReadSectionRequest,
    AxiosResponse<ReadSectionResponse>
  >(`/sections/${id}`);
  return retval;
};

export const updateSection = async ({
  id,
  ...data
}: UpdateSectionRequest): Promise<void> => {
  const { data: retval } = await axios.patch<
    UpdateSectionRequest,
    AxiosResponse<void>
  >(`/sections/${id}`, data);
  return retval;
};

export const updatePosition = async ({
  id,
  ...data
}: UpdateSectionPositionRequest): Promise<void> => {
  const { data: retval } = await axios.patch<
    UpdateSectionPositionRequest,
    AxiosResponse<void>
  >(`/sections/position`, data);
  return retval;
};

export const deleteSection = async ({
  id,
}: DeleteSectionRequest): Promise<void> => {
  const { data: retval } = await axios.delete<
    DeleteSectionRequest,
    AxiosResponse<void>
  >(`/sections/${id}`);
  return retval;
};
