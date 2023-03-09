import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import * as api from "src/api/public/city";
import { ReadCitiesRequest } from "src/interfaces/request/public/city";
import { ReadCitiesResponse } from "src/interfaces/response/public/city";


export const useReadCitiesCombobox = (options?: UseMutationOptions<AxiosResponse<ReadCitiesResponse>>) => {
  return useMutation(
    async (request: ReadCitiesRequest) => {
      // [TODO]: remover quando os filtros forem implementados
      const data = await api.readCities(request);
      return data || [];
    },
    options as any
  );
}
