export type EntryType = 'income' | 'expense';

export interface FinanceRecord {
  id: string;
  date: string;
  amount: number;
  category: string;
  note: string;
  type: EntryType;
}

export type UserRole = 'admin' | 'viewer';
export type ActivePage = 'home' | 'history' | 'charts' | 'settings';

export interface FinanceSummary {
  balance: number;
  income: number;
  expense: number;
  categoryData: { name: string; value: number }[];
  trendData: { date: string; balance: number }[];
}
