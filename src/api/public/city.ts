import axios from "..";

import { ReadCitiesRequest } from "src/interfaces/request/public/city";

import { ReadCitiesResponse } from "src/interfaces/response/public/city";
import { AxiosResponse } from "axios";
import { clearEmpties } from "src/utils/clear-empties";

export const readCities = async (
  options: ReadCitiesRequest
): Promise<ReadCitiesResponse> => {
  const { data } = await axios.get<
    ReadCitiesRequest,
    AxiosResponse<ReadCitiesResponse>
  >(`/app/city`, {
    params: clearEmpties(options),
  });

  return data;
};
