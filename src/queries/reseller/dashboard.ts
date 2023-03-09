import { ReadDashboardResellerRequest } from "./../../interfaces/request/reseller/dashboard";
import { useQuery } from "react-query";
import * as api from "src/api/reseller/dashboard";

export const useReadDashboardReseller = (
  params: ReadDashboardResellerRequest
) => {
  return useQuery(
    ["dashboardData", params],
    () => api.readDashboardReseller(params),
    {
      refetchOnWindowFocus: false,
    }
  );
};
