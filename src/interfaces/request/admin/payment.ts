import Payment from "src/interfaces/payment";
import Pagination from "../pagination";

export interface FilterPaymentRequest extends Partial<Omit<Payment, "id">> { }

export interface ReadPaymentsRequest extends Pagination<FilterPaymentRequest> { }
