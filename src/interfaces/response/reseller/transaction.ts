import { BaseGetResponse } from "../base";
import Transaction from "src/interfaces/transaction";

type Base = {
  balance: number;
  debit_unpaid: Transaction[];
  amount_next_payment: { amount: number; createdAt: string };
} & BaseGetResponse<Transaction>;

export interface ReadTransactionsResponse extends Base {}
