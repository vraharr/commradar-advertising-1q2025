
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getTotalExpenditure, MediaExpenditure } from "@/services/mediaExpenditureService";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface MediaExpenditureTableProps {
  data: MediaExpenditure[];
}

const MediaExpenditureTable = ({ data }: MediaExpenditureTableProps) => {
  const total = getTotalExpenditure(data);
  
  const getPercentageChangeClass = (change: number) => {
    if (change > 0) return "text-emerald-600 font-medium";
    if (change < 0) return "text-rose-600 font-medium";
    return "text-gray-600";
  };

  const getPercentageChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpIcon className="h-4 w-4 inline mr-1 text-emerald-500" />;
    if (change < 0) return <ArrowDownIcon className="h-4 w-4 inline mr-1 text-rose-500" />;
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Detailed Media Expenditure Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[200px]">Medium</TableHead>
                <TableHead className="text-right">2025 (USD)</TableHead>
                <TableHead className="text-right">2024 (USD)</TableHead>
                <TableHead className="text-right">Difference (USD)</TableHead>
                <TableHead className="text-right">% Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...data, total].map((item, i) => (
                <TableRow key={i} className={item.medium === "Total" ? "font-bold bg-muted/20" : ""}>
                  <TableCell>{item.medium}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.expenditure_2025)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.expenditure_2024)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.expenditure_2025 - item.expenditure_2024)}
                  </TableCell>
                  <TableCell className={`text-right ${getPercentageChangeClass(item.percentage_change)}`}>
                    {getPercentageChangeIcon(item.percentage_change)}
                    {item.percentage_change > 0 ? "+" : ""}{item.percentage_change}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaExpenditureTable;
