import Pagination from "../pagination";

export interface FilterDashboardResellerRequest {
  initial_date?: Date;
  end_date?: Date;
}

export interface ReadDashboardResellerRequest
  extends Pagination<FilterDashboardResellerRequest> {}
