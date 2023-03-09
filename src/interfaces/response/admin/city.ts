import { BaseGetResponse } from "../base";
import City from "src/interfaces/city";

export interface ReadCitiesResponse extends BaseGetResponse<City> { }

export interface ReadCityResponse extends City { }

export interface CreateCityResponse extends ReadCityResponse { }

export interface DeleteCityResponse { }

export interface UpdateCityResponse { }
