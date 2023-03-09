import { BaseGetResponse } from "../base";
import Tag from "src/interfaces/tag";

export interface ReadTagsResponse extends BaseGetResponse<Tag> { }

export interface ReadTagResponse extends Tag { }

export interface CreateTagResponse extends ReadTagResponse { }

export interface DeleteTagResponse { }

export interface UpdateTagResponse { }
