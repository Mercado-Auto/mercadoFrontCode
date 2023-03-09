export default interface DashboardReseller {
  gross_profit: number;
  net_profit: number;
  pending_payments: number;
  processed_payments: number;
  transferred_total_amount: number;
  best_product: string;
  worst_product: string;
  data_grafic: {
    data: any[];
    type: "Day" | "Month";
  };
  top_most_sold: {
    id: string;
    name: string;
    sale_qty: number;
  }[];
  top_less_sold: {
    id: string;
    name: string;
    sale_qty: number;
  }[];
  sales: {
    total: number;
    waiting_payment: number;
    separating_order: number;
    canceled: number;
    delivery_transit: number;
    delivered: number;
  };
}
