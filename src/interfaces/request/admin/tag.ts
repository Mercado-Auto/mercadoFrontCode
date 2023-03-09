import Tag from "src/interfaces/tag";
import Pagination from "../pagination";

export interface CreateTagRequest extends Omit<Tag, "id"> { }

export interface FilterTagRequest extends Partial<Omit<Tag, "id">> { }

export interface ReadTagsRequest extends Pagination<FilterTagRequest> { }

export interface ReadTagRequest {
  id: string;
}

export interface UpdateTagRequest extends Partial<Tag> {
  id: string;
}

export interface DeleteTagRequest {
  id: string;
}
