import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import * as api from "src/api/admin/section";
import { ReadSectionsRequest } from "src/interfaces/request/admin/section";
import { ReadSectionsResponse } from "src/interfaces/response/admin/section";


export const useReadSectionsCombobox = (options?: UseMutationOptions<AxiosResponse<ReadSectionsResponse['data']>>) => {
  return useMutation(
    async (request: ReadSectionsRequest) => {
      // [TODO]: remover quando os filtros forem implementados
      delete request.filters;

      const data = await api.readSections(request);
      return data.data || [];
    },
    options as any
  );
}
