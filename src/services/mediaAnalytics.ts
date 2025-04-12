
import { MediaExpenditure, CategoryData } from "./types";
import { mediaCategories } from "./mediaTypes";

/**
 * Calculate total expenditure from media expenditure data
 */
export const getTotalExpenditure = (data: MediaExpenditure[]): MediaExpenditure => {
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

/**
 * Group media data into categories and calculate totals
 */
export const getMediaCategoryData = (data: MediaExpenditure[]): CategoryData[] => {
  // Calculate totals for each category
  const calculateCategoryTotal = (category: string[], year: "2024" | "2025") => {
    return data
      .filter((item) => category.includes(item.medium))
      .reduce((acc, item) => acc + (year === "2025" ? item.expenditure_2025 : item.expenditure_2024), 0);
  };

  const digitalTotal2025 = calculateCategoryTotal(mediaCategories.digital, "2025");
  const digitalTotal2024 = calculateCategoryTotal(mediaCategories.digital, "2024");
  const digitalChange = ((digitalTotal2025 - digitalTotal2024) / digitalTotal2024) * 100;

  const traditionalTotal2025 = calculateCategoryTotal(mediaCategories.traditional, "2025");
  const traditionalTotal2024 = calculateCategoryTotal(mediaCategories.traditional, "2024");
  const traditionalChange = ((traditionalTotal2025 - traditionalTotal2024) / traditionalTotal2024) * 100;

  const outOfHomeTotal2025 = calculateCategoryTotal(mediaCategories.outOfHome, "2025");
  const outOfHomeTotal2024 = calculateCategoryTotal(mediaCategories.outOfHome, "2024");
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
