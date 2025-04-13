
export const createCSVContent = (headers: string[], rows: string[][]) => {
  return [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");
};

export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// New responsive utilities
export const getResponsiveTableColumns = (isMobile: boolean, columns: string[]): string[] => {
  // On mobile, display fewer columns
  if (isMobile) {
    // Return a subset of important columns for mobile view
    const importantColumns = ['customer', 'total 2025', 'percentage_change'];
    return columns.filter(col => importantColumns.includes(col));
  }
  
  return columns;
};

export const getResponsiveCardSize = (isMobile: boolean): string => {
  return isMobile ? 'p-2 text-sm' : 'p-4';
};

export const getResponsiveGridLayout = (count: number, isMobile: boolean): string => {
  if (isMobile) return 'grid-cols-1';
  if (count <= 2) return 'grid-cols-1 md:grid-cols-2';
  if (count <= 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-' + count;
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
};
