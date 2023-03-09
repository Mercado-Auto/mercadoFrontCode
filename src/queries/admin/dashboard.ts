import { ReadDashboardAdminRequest } from "./../../interfaces/request/admin/dashboard";
import { useQuery } from "react-query";
import * as api from "src/api/admin/dashboard";

export const useReadDashboardAdmin = (params: ReadDashboardAdminRequest) => {
  return useQuery(
    ["dashboardData", params],
    () => api.readDashboardAdmin(params),
    {
      refetchOnWindowFocus: false,
    }
  );
};
