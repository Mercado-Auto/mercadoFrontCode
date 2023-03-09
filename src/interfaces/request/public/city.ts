import City from "src/interfaces/city";

export interface CreateCityRequest extends Omit<City, "id"> { }

export interface FilterCityRequest extends Partial<Omit<City, "id">> { }

export interface ReadCitiesRequest extends FilterCityRequest { }
