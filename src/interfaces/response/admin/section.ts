import { BaseGetResponse } from "../base";
import Section from "src/interfaces/section";

export interface ReadSectionsResponse extends BaseGetResponse<Section> {}

export interface ReadSectionResponse extends Section {}

export interface CreateSectionResponse extends ReadSectionResponse {}

export interface DeleteSectionResponse {}

export interface UpdateSectionResponse {}

export interface UpdatePositionResponse {}
