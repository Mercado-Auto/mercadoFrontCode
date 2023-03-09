import Section from "src/interfaces/section";
import Pagination from "../pagination";

export interface CreateSectionRequest extends Omit<Section, "id"> {}

export interface FilterSectionRequest extends Partial<Omit<Section, "id">> {}

export interface ReadSectionsRequest extends Pagination<FilterSectionRequest> {}

export interface ReadSectionRequest {
  id: string;
}

export interface UpdateSectionRequest extends Partial<Section> {
  id: string;
}

export interface UpdateSectionPositionRequest extends Partial<Section> {
  section_id: string;
  to_section_id: string;
}

export interface DeleteSectionRequest {
  id: string;
}
