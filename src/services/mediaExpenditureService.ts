
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type MediaExpenditure = {
  id: string;
  medium: string;
  expenditure_2025: number;
  expenditure_2024: number;
  percentage_change: number;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const fetchMediaExpenditures = async (): Promise<MediaExpenditure[]> => {
  try {
    const { data, error } = await supabase
      .from('media_expenditure')
      .select('*')
      .order('medium');
    
    if (error) {
      console.error("Error fetching media expenditures:", error);
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error: any) {
    console.error("Error fetching media expenditures:", error);
    throw new Error(error.message || "Failed to fetch media expenditures");
  }
};

export const getTotalExpenditure = (data: MediaExpenditure[]) => {
  const total2025 = data.reduce(
    (acc, item) => acc + item.expenditure_2025,
    0
  );
  const total2024 = data.reduce(
    (acc, item) => acc + item.expenditure_2024,
    0
  );
  const percentageChange = ((total2025 - total2024) / total2024) * 100;

  return {
    id: "total",
    medium: "Total",
    expenditure_2025: total2025,
    expenditure_2024: total2024,
    percentage_change: parseFloat(percentageChange.toFixed(2)),
  };
};

export const getMediaCategoryData = (data: MediaExpenditure[]) => {
  // Group data into categories
  const digital = ["GOOGLE ADS", "SOCIAL MEDIA", "LOCAL WEBSITE"];
  const traditional = ["TV", "RADIO", "NEWSPAPERS", "MAGAZINES"];
  const outOfHome = ["OUTDOOR", "MALLS", "AIRPORTS"];

  // Calculate totals for each category
  const calculateCategoryTotal = (category: string[], year: "2024" | "2025") => {
    return data
      .filter((item) => category.includes(item.medium))
      .reduce((acc, item) => acc + (year === "2025" ? item.expenditure_2025 : item.expenditure_2024), 0);
  };

  const digitalTotal2025 = calculateCategoryTotal(digital, "2025");
  const digitalTotal2024 = calculateCategoryTotal(digital, "2024");
  const digitalChange = ((digitalTotal2025 - digitalTotal2024) / digitalTotal2024) * 100;

  const traditionalTotal2025 = calculateCategoryTotal(traditional, "2025");
  const traditionalTotal2024 = calculateCategoryTotal(traditional, "2024");
  const traditionalChange = ((traditionalTotal2025 - traditionalTotal2024) / traditionalTotal2024) * 100;

  const outOfHomeTotal2025 = calculateCategoryTotal(outOfHome, "2025");
  const outOfHomeTotal2024 = calculateCategoryTotal(outOfHome, "2024");
  const outOfHomeChange = ((outOfHomeTotal2025 - outOfHomeTotal2024) / outOfHomeTotal2024) * 100;

  return [
    {
      name: "Digital",
      value2025: digitalTotal2025,
      value2024: digitalTotal2024,
      change: parseFloat(digitalChange.toFixed(2)),
    },
    {
      name: "Traditional",
      value2025: traditionalTotal2025,
      value2024: traditionalTotal2024,
      change: parseFloat(traditionalChange.toFixed(2)),
    },
    {
      name: "Out-of-Home",
      value2025: outOfHomeTotal2025,
      value2024: outOfHomeTotal2024,
      change: parseFloat(outOfHomeChange.toFixed(2)),
    },
  ];
};
