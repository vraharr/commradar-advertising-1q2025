import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PivotData, formatCurrency } from "@/services/groupDataService";

interface GroupSummaryTableProps {
  data: PivotData;
}

type SortDirection = "asc" | "desc";

const GroupSummaryTable = ({ data }: GroupSummaryTableProps) => {
  const [sortField, setSortField] = useState<string>("grand_total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedRows = [...data.rows].sort((a, b) => {
    let comparison = 0;
    if (sortField === "media_group") {
      comparison = (a.media_group as string).localeCompare(b.media_group as string);
    } else {
      const aVal = (a[sortField] as number) || 0;
      const bVal = (b[sortField] as number) || 0;
      comparison = aVal - bVal;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3" />;
    }
    return sortDirection === "asc" 
      ? <ArrowUp className="ml-1 h-3 w-3" /> 
      : <ArrowDown className="ml-1 h-3 w-3" />;
  };

  const formatValue = (value: number | string | undefined) => {
    if (typeof value === 'number' && value > 0) {
      return formatCurrency(value);
    }
    return "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expenditure by Media Group (Pivot)</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="min-w-max">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="sticky left-0 bg-muted/50 z-10">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-semibold hover:bg-transparent text-xs"
                      onClick={() => handleSort("media_group")}
                    >
                      media_group
                      {getSortIcon("media_group")}
                    </Button>
                  </TableHead>
                  {data.mediaTypes.map((mediaType) => (
                    <TableHead key={mediaType} className="text-right">
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto font-semibold hover:bg-transparent text-xs ml-auto"
                        onClick={() => handleSort(mediaType)}
                      >
                        {mediaType}
                        {getSortIcon(mediaType)}
                      </Button>
                    </TableHead>
                  ))}
                  <TableHead className="text-right">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-semibold hover:bg-transparent text-xs ml-auto"
                      onClick={() => handleSort("grand_total")}
                    >
                      Grand Total
                      {getSortIcon("grand_total")}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRows.map((row) => (
                  <TableRow key={row.media_group}>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">
                      {row.media_group}
                    </TableCell>
                    {data.mediaTypes.map((mediaType) => (
                      <TableCell key={mediaType} className="text-right font-mono text-sm">
                        {formatValue(row[mediaType])}
                      </TableCell>
                    ))}
                    <TableCell className="text-right font-mono text-sm font-semibold">
                      {formatCurrency(row.grand_total)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-bold border-t-2">
                  <TableCell className="sticky left-0 bg-muted/50 z-10">Grand Total</TableCell>
                  {data.mediaTypes.map((mediaType) => (
                    <TableCell key={mediaType} className="text-right font-mono text-sm">
                      {formatCurrency(data.columnTotals[mediaType])}
                    </TableCell>
                  ))}
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
  );
};

export default GroupSummaryTable;
