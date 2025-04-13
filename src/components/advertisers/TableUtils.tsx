
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
