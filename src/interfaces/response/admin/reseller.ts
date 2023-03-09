import { BaseGetResponse } from "../base";
import Reseller from "src/interfaces/reseller";

export interface ReadResellersResponse extends BaseGetResponse<Reseller> { }

export interface ReadResellerResponse extends Reseller { }

export interface CreateResellerResponse extends ReadResellerResponse { }

export interface DeleteResellerResponse { }

export interface UpdateResellerResponse { }
