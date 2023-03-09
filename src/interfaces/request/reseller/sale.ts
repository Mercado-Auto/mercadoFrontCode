import Sale from "src/interfaces/sale";
import Pagination from "../pagination";

export interface FilterSaleRequest extends Partial<Omit<Sale, "id">> {}

export interface ReadSalesRequest extends Pagination<FilterSaleRequest> {}

export interface ReadSaleRequest {
  id: string;
}

export interface UpdateTrackerCodeSaleRequest {
  sale_id: string;
  tracker_code?: string;
}

export interface DeleteSaleNFRequest {
  sale_id: string;
}
