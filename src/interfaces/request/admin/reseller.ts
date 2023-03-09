import Reseller from "src/interfaces/reseller";
import Pagination from "../pagination";

export interface CreateResellerRequest extends Omit<Reseller, "id"> { }

export interface FilterResellerRequest extends Partial<Omit<Reseller, "id">> { }

export interface ReadResellersRequest extends Pagination<FilterResellerRequest> { }

export interface ReadResellerRequest {
  id: string;
}

export interface UpdateResellerRequest extends Partial<Omit<Reseller, 'address_city'>> {
  id: string;
  address_city: string;
}

export interface DeleteResellerRequest {
  id: string;
}
