
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  formatCurrency, 
  getTotalExpenditure, 
  MediaExpenditure,
  fetchTopCustomersByMedia,
  CustomerSpend
} from "@/services/mediaExpenditureService";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useQuery } from "@tanstack/react-query";

interface MediaExpenditureTableProps {
  data: MediaExpenditure[];
}

const CustomerSpendTable = ({ customers }: { customers: CustomerSpend[] }) => {
  if (customers.length === 0) {
    return <div className="p-4 text-center text-gray-500">Loading customer data...</div>;
  }
  
  return (
    <div className="max-h-80 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Spend</TableHead>
            <TableHead className="text-right">% of Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{customer.customer}</TableCell>
              <TableCell className="text-right">{formatCurrency(customer.value)}</TableCell>
              <TableCell className="text-right">{customer.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const MediaExpenditureTable = ({ data }: MediaExpenditureTableProps) => {
  const total = getTotalExpenditure(data);
  const [hoveredMedia, setHoveredMedia] = useState<string | null>(null);
  
  // Query for customer data when hovering over a media type
  const { data: customerData = [] } = useQuery({
    queryKey: ['topCustomers', hoveredMedia],
    queryFn: () => hoveredMedia ? fetchTopCustomersByMedia(hoveredMedia) : Promise.resolve([]),
    enabled: !!hoveredMedia,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
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
                  <TableCell>
                    {item.medium === "TV" ? (
                      <HoverCard>
                        <HoverCardTrigger 
                          className="cursor-help underline decoration-dotted"
                          onMouseEnter={() => setHoveredMedia("TV")}
                        >
                          {item.medium}
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Top 10 TV Customers</h4>
                            <CustomerSpendTable customers={customerData} />
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      item.medium
                    )}
                  </TableCell>
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
