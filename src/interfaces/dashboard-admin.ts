export default interface DashboardAdmin {
  resellers_qty: number;
  gross_profit: number;
  net_profit: number;
  pending_payments: number;
  processed_payments: number;
  transferred_total_amount: number;
  top_most_searched: {
    description: string,
    qty: number
  }[];
  top_most_resellers: {
    id: string;
    name: string;
    sale_qty: number
  }[];
}
