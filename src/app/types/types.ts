export interface PopularProducts {
  productId: String;
  name: String;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: String;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchasesSummery {
  purchasesSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategory {
  expenseByCategoryId: string;
  category: string;
  amount: number;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: PopularProducts[];
  salesSummary: SalesSummary[];
  purchasesSummary: PurchasesSummery[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategory[];
}
