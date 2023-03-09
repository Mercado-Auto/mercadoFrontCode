import Transaction from "src/interfaces/transaction";
import Pagination from "../pagination";

export interface FilterTransactionRequest extends Partial<Omit<Transaction, "id">> { }

export interface ReadTransactionsRequest extends Pagination<FilterTransactionRequest> { }
