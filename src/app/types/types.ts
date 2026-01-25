export interface PopularProducts {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
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

export interface ExpenseByCategorySummary {
  expenseByCategoryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: PopularProducts[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchasesSummery[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

export type Users = {
  userId: string;
  name: string;
  email: string;
};

export type UserSettings = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

export type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

export type AggregatedData = {
  [category: string]: AggregatedDataItem;
};
