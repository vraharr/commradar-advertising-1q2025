import * as XLSX from 'xlsx';

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

export const downloadXLSX = (headers: string[], rows: (string | number)[][], filename: string) => {
  // Create worksheet data with headers
  const wsData = [headers, ...rows];
  
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Calculate column widths based on content
  const colWidths = headers.map((header, colIndex) => {
    const headerLength = header.length;
    const maxContentLength = rows.reduce((max, row) => {
      const cellValue = row[colIndex];
      const cellLength = cellValue ? String(cellValue).length : 0;
      return Math.max(max, cellLength);
    }, 0);
    return { wch: Math.max(headerLength, maxContentLength) + 2 };
  });
  
  ws['!cols'] = colWidths;
  
  // Create workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Top Advertisers');
  
  // Generate and download the file
  XLSX.writeFile(wb, filename);
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
