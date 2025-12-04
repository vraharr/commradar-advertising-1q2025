import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpDown, ArrowUp, ArrowDown, Share2, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PivotData, formatCurrency, GroupDataRow } from "@/services/groupDataService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
interface GroupSummaryTableProps {
  data: PivotData;
  rawData: GroupDataRow[];
}
type SortDirection = "asc" | "desc";
interface MediaNameBreakdown {
  mediaName: string;
  value: number;
}
const GroupSummaryTable = ({
  data,
  rawData
}: GroupSummaryTableProps) => {
  const [sortField, setSortField] = useState<string>("grand_total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Link copied to clipboard");
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  };
  const handleDownloadExcel = () => {
    const headers = ["media_group", ...data.mediaTypes, "Grand Total"];
    const csvRows = [headers.join(",")];
    sortedRows.forEach(row => {
      const values = [`"${row.media_group}"`, ...data.mediaTypes.map(mt => row[mt] || 0), row.grand_total];
      csvRows.push(values.join(","));
    });

    // Add totals row
    const totalsRow = ["Grand Total", ...data.mediaTypes.map(mt => data.columnTotals[mt]), data.columnTotals.grand_total];
    csvRows.push(totalsRow.join(","));
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "group_expenditure_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Data downloaded successfully");
  };
  const sortedRows = [...data.rows].sort((a, b) => {
    let comparison = 0;
    if (sortField === "media_group") {
      comparison = (a.media_group as string).localeCompare(b.media_group as string);
    } else {
      const aVal = a[sortField] as number || 0;
      const bVal = b[sortField] as number || 0;
      comparison = aVal - bVal;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3" />;
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />;
  };
  const formatValue = (value: number | string | undefined) => {
    if (typeof value === 'number' && value > 0) {
      return formatCurrency(value);
    }
    return "";
  };
  const getMediaNameBreakdown = (groupName: string): MediaNameBreakdown[] => {
    const groupRows = rawData.filter(r => r.media_group === groupName);
    const mediaNameMap = new Map<string, number>();
    groupRows.forEach(row => {
      if (row.media_name && row.amount) {
        const current = mediaNameMap.get(row.media_name) || 0;
        mediaNameMap.set(row.media_name, current + row.amount);
      }
    });
    return Array.from(mediaNameMap.entries()).map(([mediaName, value]) => ({
      mediaName,
      value
    })).sort((a, b) => b.value - a.value);
  };
  const selectedGroupData = selectedGroup ? getMediaNameBreakdown(selectedGroup) : [];
  return <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Expenditure by Media Group </CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleDownloadExcel} className="h-8 w-8" title="Download as Excel">
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} className="h-8 w-8" title="Share link">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <div className="min-w-max">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-100 hover:bg-blue-100">
                    <TableHead className="sticky left-0 bg-blue-100 z-10">
                      <Button variant="ghost" className="p-0 h-auto font-semibold hover:bg-transparent text-xs" onClick={() => handleSort("media_group")}>
                        media_group
                        {getSortIcon("media_group")}
                      </Button>
                    </TableHead>
                    {data.mediaTypes.map(mediaType => <TableHead key={mediaType} className="text-right bg-blue-100">
                        <Button variant="ghost" className="p-0 h-auto font-semibold hover:bg-transparent text-xs ml-auto" onClick={() => handleSort(mediaType)}>
                          {mediaType}
                          {getSortIcon(mediaType)}
                        </Button>
                      </TableHead>)}
                    <TableHead className="text-right bg-blue-100">
                      <Button variant="ghost" className="p-0 h-auto font-semibold hover:bg-transparent text-xs ml-auto" onClick={() => handleSort("grand_total")}>
                        Grand Total
                        {getSortIcon("grand_total")}
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRows.map((row, index) => <TableRow key={row.media_group} className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                      <TableCell className={`font-medium sticky left-0 z-10 cursor-pointer text-blue-600 hover:text-blue-800 hover:underline ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`} onClick={() => setSelectedGroup(row.media_group)}>
                        {row.media_group}
                      </TableCell>
                      {data.mediaTypes.map(mediaType => <TableCell key={mediaType} className="text-right font-mono text-sm">
                          {formatValue(row[mediaType])}
                        </TableCell>)}
                      <TableCell className="text-right font-mono text-sm font-semibold">
                        {formatCurrency(row.grand_total)}
                      </TableCell>
                    </TableRow>)}
                  <TableRow className="bg-blue-50 font-bold border-t-2">
                    <TableCell className="sticky left-0 bg-blue-50 z-10">Grand Total</TableCell>
                    {data.mediaTypes.map(mediaType => <TableCell key={mediaType} className="text-right font-mono text-sm">
                        {formatCurrency(data.columnTotals[mediaType])}
                      </TableCell>)}
                    <TableCell className="text-right font-mono text-sm">
                      {formatCurrency(data.columnTotals.grand_total)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">{selectedGroup}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-100 hover:bg-blue-100">
                  <TableHead>Media Name</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedGroupData.map((item, index) => <TableRow key={item.mediaName} className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <TableCell className="font-medium">{item.mediaName}</TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatCurrency(item.value)}
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default GroupSummaryTable;