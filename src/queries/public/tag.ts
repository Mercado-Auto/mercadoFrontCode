import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import * as api from "src/api/admin/tag";
import { ReadTagsRequest } from "src/interfaces/request/admin/tag";
import { ReadTagsResponse } from "src/interfaces/response/admin/tag";


export const useReadTagsCombobox = (options?: UseMutationOptions<AxiosResponse<ReadTagsResponse['data']>>) => {
  return useMutation(
    async (request: ReadTagsRequest) => {
      // [TODO]: remover quando os filtros forem implementados
      delete request.filters;

      const data = await api.readTags(request);
      return data.data || [];
    },
    options as any
  );
}
