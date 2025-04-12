
export type MediaExpenditure = {
  id: string;
  medium: string;
  expenditure_2025: number;
  expenditure_2024: number;
  percentage_change: number;
};

export type CustomerSpend = {
  customer: string;
  value: number;
  percentage: number;
};

export type CategoryData = {
  name: string;
  value2025: number;
  value2024: number;
  change: number;
};
