import Reseller from "./reseller";

export enum TransactionOperation {
  "CREDIT" = "CREDIT",
  "DEBIT" = "DEBIT",
}

export default interface Transaction {
  id: string;

  operation: TransactionOperation;

  amount: number;

  reseller_id: string;

  processed: boolean;

  reseller: Reseller;

  createdAt: string;

  updatedAt: string;
}
