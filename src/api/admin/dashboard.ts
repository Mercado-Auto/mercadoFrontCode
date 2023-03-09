import { ReadDashboardAdminResponse } from "./../../interfaces/response/admin/dashboard";
import { ReadDashboardAdminRequest } from "./../../interfaces/request/admin/dashboard";
import axios from "..";
import { AxiosResponse } from "axios";

export const readDashboardAdmin = async (
  options: ReadDashboardAdminRequest
): Promise<ReadDashboardAdminResponse> => {
  const { data } = await axios.get<any, AxiosResponse<any>>(`/reports/admin`, {
    params: options,
  });

  return data;
};
