import { BaseGetResponse } from "../base";
import Sale from "src/interfaces/sale";

export interface ReadSalesResponse extends BaseGetResponse<Sale> { }

export interface ReadSaleResponse extends Sale { }

export interface DeleteSaleNFResponse { }

export interface UpdateTrackerCodeSaleResponse { }
