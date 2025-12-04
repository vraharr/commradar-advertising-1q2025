import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaGroupSummary, formatCurrency } from "@/services/groupDataService";

interface GroupSummaryTableProps {
  data: MediaGroupSummary[];
}

type SortField = "media_group" | "media_type" | "total_amount";
type SortDirection = "asc" | "desc";

const GroupSummaryTable = ({ data }: GroupSummaryTableProps) => {
  const [sortField, setSortField] = useState<SortField>("total_amount");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let comparison = 0;
    if (sortField === "total_amount") {
      comparison = a.total_amount - b.total_amount;
    } else {
      comparison = a[sortField].localeCompare(b[sortField]);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" 
      ? <ArrowUp className="ml-2 h-4 w-4" /> 
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const totalAmount = data.reduce((sum, row) => sum + row.total_amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Expenditure by Media Group & Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto font-semibold hover:bg-transparent"
                    onClick={() => handleSort("media_group")}
                  >
                    Media Group
                    {getSortIcon("media_group")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto font-semibold hover:bg-transparent"
                    onClick={() => handleSort("media_type")}
                  >
                    Media Type
                    {getSortIcon("media_type")}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto font-semibold hover:bg-transparent ml-auto"
                    onClick={() => handleSort("total_amount")}
                  >
                    Total Amount
                    {getSortIcon("total_amount")}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow key={`${row.media_group}-${row.media_type}-${index}`}>
                  <TableCell className="font-medium">{row.media_group}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {row.media_type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(row.total_amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(totalAmount)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GroupSummaryTable;
