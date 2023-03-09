import Pagination from "../pagination";

export interface FilterDashboardAdminRequest {
  initial_date?: Date;
  end_date?: Date;
}

export type ReadDashboardAdminRequest = Omit<Pagination, "filters"> &
  FilterDashboardAdminRequest;
