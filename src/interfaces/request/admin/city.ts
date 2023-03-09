import City from "src/interfaces/city";
import Pagination from "../pagination";

export interface CreateCityRequest extends Omit<City, "id"> { }

export interface FilterCityRequest extends Partial<Omit<City, "id">> { }

export interface ReadCitiesRequest extends Pagination<FilterCityRequest> { }

export interface ReadCityRequest {
  id: string;
}

export interface UpdateCityRequest extends Partial<City> {
  id: string;
}

export interface DeleteCityRequest {
  id: string;
}
