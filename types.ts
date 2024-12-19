export interface Transaction {
  id: number;
  category_id: number;
  amount: number;
  date: number;
  note: string;
  type: "Expense" | "Budget";
}

export interface Category {
  id: number;
  name: string;
  type: "Expense" | "Budget";
  totalBudget: number;
  remainingBudget: number;
}

export interface TransactionsByMonth {
  totalExpenses: number;
  totalBudget: number;
}
