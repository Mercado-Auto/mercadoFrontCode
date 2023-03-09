import { ReadDashboardResellerResponse } from "./../../interfaces/response/reseller/dashboard";
import { ReadDashboardResellerRequest } from "./../../interfaces/request/reseller/dashboard";
import axios from "..";
import { AxiosResponse } from "axios";

export const readDashboardReseller = async (
  options: ReadDashboardResellerRequest
): Promise<ReadDashboardResellerResponse> => {
  const filters = options.filters;
  delete options.filters;
  const { data } = await axios.get<any, AxiosResponse<any>>(
    `/reports/reseller`,
    {
      params: {
        ...options,
        ...(filters || {}),
      },
    }
  );

  return data;
};
