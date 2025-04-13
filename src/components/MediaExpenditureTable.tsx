
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
import { mediaTypeMapping } from "@/services/mediaTypes";
import { ArrowDownIcon, ArrowUpIcon, Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MediaExpenditureTableProps {
  data: MediaExpenditure[];
}

const CustomerSpendTable = ({ customers }: { customers: CustomerSpend[] }) => {
  if (!customers || customers.length === 0) {
    return <div className="p-4 text-center text-gray-500">Loading customer data...</div>;
  }
  
  return (
    <ScrollArea className="h-80">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Spend</TableHead>
            <TableHead className="text-right">% of Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.customer}>
              <TableCell className="font-medium">{customer.customer}</TableCell>
              <TableCell className="text-right">{formatCurrency(customer.value)}</TableCell>
              <TableCell className="text-right">{customer.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

const MediaExpenditureTable = ({ data }: MediaExpenditureTableProps) => {
  // Sort the data by 2025 expenditure in descending order
  const sortedData = [...data].sort((a, b) => b.expenditure_2025 - a.expenditure_2025);
  const total = getTotalExpenditure(sortedData);
  const [hoveredMedia, setHoveredMedia] = useState<string | null>(null);
  
  // Get the API media type based on display media name
  const getApiMediaType = (medium: string): string => {
    return mediaTypeMapping[medium] || medium;
  };
  
  // Query for customer data when hovering over a media type
  const { data: customerData = [] } = useQuery({
    queryKey: ['topCustomers', hoveredMedia],
    queryFn: () => {
      if (!hoveredMedia) return Promise.resolve([]);
      console.log(`Fetching data for media type: ${hoveredMedia}, API type: ${getApiMediaType(hoveredMedia)}`);
      return fetchTopCustomersByMedia(getApiMediaType(hoveredMedia));
    },
    enabled: !!hoveredMedia,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const getPercentageChangeClass = (change: number) => {
    if (change > 0) return "text-emerald-600 font-medium";
    if (change < 0) return "text-rose-600 font-medium";
    return "text-gray-500";
  };

  const getPercentageChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpIcon className="h-4 w-4 inline mr-1 text-emerald-500" />;
    if (change < 0) return <ArrowDownIcon className="h-4 w-4 inline mr-1 text-rose-500" />;
    return null;
  };

  // Create a hover card for each media type
  const createMediaHoverCard = (medium: string) => {
    return (
      <HoverCard>
        <HoverCardTrigger 
          className="cursor-help underline decoration-dotted"
          onMouseEnter={() => setHoveredMedia(medium)}
        >
          {medium}
        </HoverCardTrigger>
        <HoverCardContent className="w-96">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Top 10 {medium} Customers</h4>
            <CustomerSpendTable customers={customerData} />
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="bg-[#D3E4FD]">
        <div className="flex items-center gap-2">
          <CardTitle>Detailed Media Expenditure Breakdown</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-blue-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="text-left p-3 max-w-xs">
                The table displays estimated net amounts after all applicable discounts
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[200px]">Medium</TableHead>
                <TableHead className="text-right">2025</TableHead>
                <TableHead className="text-right">2024</TableHead>
                <TableHead className="text-right">Difference</TableHead>
                <TableHead className="text-right">% Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...sortedData, total].map((item) => (
                <TableRow key={item.id} className={item.medium === "Total" ? "font-bold bg-muted/20" : ""}>
                  <TableCell>
                    {item.medium === "Total" 
                      ? item.medium 
                      : createMediaHoverCard(item.medium)}
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
