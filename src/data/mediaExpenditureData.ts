
export type MediaExpenditure = {
  medium: string;
  expenditure2025: number;
  expenditure2024: number;
  percentageChange: number;
};

export const mediaExpenditureData: MediaExpenditure[] = [
  {
    medium: "TV",
    expenditure2025: 8450079.36,
    expenditure2024: 9009609.68,
    percentageChange: -6.21,
  },
  {
    medium: "RADIO",
    expenditure2025: 3410610.70,
    expenditure2024: 2991942.90,
    percentageChange: 13.99,
  },
  {
    medium: "OUTDOOR",
    expenditure2025: 2286702.50,
    expenditure2024: 2492276.60,
    percentageChange: -8.25,
  },
  {
    medium: "MALLS",
    expenditure2025: 445400.00,
    expenditure2024: 394654.00,
    percentageChange: 12.89,
  },
  {
    medium: "AIRPORTS",
    expenditure2025: 587500.00,
    expenditure2024: 512887.00,
    percentageChange: 14.55,
  },
  {
    medium: "LOCAL WEBSITE",
    expenditure2025: 2436352.50,
    expenditure2024: 2473162.00,
    percentageChange: -1.49,
  },
  {
    medium: "NEWSPAPERS",
    expenditure2025: 1078190.00,
    expenditure2024: 1211027.50,
    percentageChange: -10.97,
  },
  {
    medium: "GOOGLE ADS",
    expenditure2025: 3664023.26,
    expenditure2024: 3392614.13,
    percentageChange: 8.00,
  },
  {
    medium: "SOCIAL MEDIA",
    expenditure2025: 3855147.50,
    expenditure2024: 3537750.00,
    percentageChange: 8.97,
  },
  {
    medium: "MAGAZINES",
    expenditure2025: 426440.00,
    expenditure2024: 541285.00,
    percentageChange: -21.22,
  },
];

export const getTotalExpenditure = () => {
  const total2025 = mediaExpenditureData.reduce(
    (acc, item) => acc + item.expenditure2025,
    0
  );
  const total2024 = mediaExpenditureData.reduce(
    (acc, item) => acc + item.expenditure2024,
    0
  );
  const percentageChange = ((total2025 - total2024) / total2024) * 100;

  return {
    medium: "Total",
    expenditure2025: total2025,
    expenditure2024: total2024,
    percentageChange: parseFloat(percentageChange.toFixed(2)),
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const getMediaCategoryData = () => {
  // Group data into categories
  const digital = ["GOOGLE ADS", "SOCIAL MEDIA", "LOCAL WEBSITE"];
  const traditional = ["TV", "RADIO", "NEWSPAPERS", "MAGAZINES"];
  const outOfHome = ["OUTDOOR", "MALLS", "AIRPORTS"];

  // Calculate totals for each category
  const calculateCategoryTotal = (category: string[], year: "2024" | "2025") => {
    return mediaExpenditureData
      .filter((item) => category.includes(item.medium))
      .reduce((acc, item) => acc + (year === "2025" ? item.expenditure2025 : item.expenditure2024), 0);
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
