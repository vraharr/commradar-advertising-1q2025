
import { useState, useEffect } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AdvertisersTableHeader from "./advertisers/TableHeader";
import AdvertiserTableRow from "./advertisers/TableRow";
import { downloadXLSX } from "./advertisers/TableUtils";

export interface TopAdvertiser {
  customer: string;
  mg_pct: string | null;
  outdoor_pct: string | null;
  pa_pct: string | null;
  radio_pct: string | null;
  tv_pct: string | null;
  web_pct: string | null;
  "total 2025": number | null;
  percentage_change: string | null;
}

const TopAdvertisersTable = ({ limit = 40 }: { limit?: number }) => {
  const [advertisers, setAdvertisers] = useState<TopAdvertiser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof TopAdvertiser>("total 2025");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const tooltipText = "This table includes the top 100 advertisers in the market. This table splits between the advertisers with the highest increase/decrease in advertising expenditure compared to the year before.";

  const calculationInfo = `Advertising Expenditure Calculation

The figures represent estimated net expenditures after applying standard media discounts to published rate card values. Discounts are applied as follows:

• TV: 92% discount (client pays 8% of rate card)
• Radio: 86% discount (client pays 14% of rate card)
• Outdoor, Press & Web: 50% discount (client pays 50% of rate card)

These adjusted values reflect typical actual paid amounts in the market.`;

  useEffect(() => {
    const fetchTopAdvertisers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('customer_media_percentages')
          .select('*');

        if (error) {
          console.error('Error fetching top advertisers:', error);
          toast.error('Failed to load top advertisers data');
          return;
        }

        setAdvertisers(data as any[]);
      } catch (error) {
        console.error('Error in fetchTopAdvertisers:', error);
        toast.error('Failed to process top advertisers data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopAdvertisers();
  }, [limit]);

  const handleSort = (field: keyof TopAdvertiser) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleDownloadXLSX = () => {
    const headers = ["Customer", "MG (%)", "OUTDOOR (%)", "PA (%)", "Radio (%)", "TV (%)", "WEB (%)", "Total 2025 (€)", "% Change"];
    const rows = sortedData.map(adv => [
      adv.customer,
      formatPercentage(adv.mg_pct),
      formatPercentage(adv.outdoor_pct),
      formatPercentage(adv.pa_pct),
      formatPercentage(adv.radio_pct),
      formatPercentage(adv.tv_pct),
      formatPercentage(adv.web_pct),
      adv["total 2025"] ?? 0,
      formatPercentage(adv.percentage_change)
    ]);
    
    downloadXLSX(headers, rows, "top_advertisers.xlsx");
  };

  const formatPercentage = (value: string | number | null): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") {
      // If it's already formatted as a percentage string, return as is
      if (value.includes("%")) return value;
      // Otherwise parse as number and format
      const numValue = parseFloat(value);
      return isNaN(numValue) ? "" : `${numValue.toFixed(2)}%`;
    }
    return `${value.toFixed(2)}%`;
  };

  const formatCurrency = (value: number | null): string => {
    if (value === null || value === undefined) return "";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-4">
        <CardHeader className="bg-[#D3E4FD] flex flex-row items-center justify-between">
          <CardTitle className="text-muted-foreground">Top 100 Advertisers by Media</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-2">Loading advertiser data...</p>
            <div className="h-2 w-40 mx-auto bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...advertisers].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];
    
    // Handle null/undefined values
    if (valueA === null || valueA === undefined) valueA = sortField === "total 2025" ? 0 : "";
    if (valueB === null || valueB === undefined) valueB = sortField === "total 2025" ? 0 : "";
    
    // Convert string percentages to numbers for comparison
    if (typeof valueA === "string" && typeof valueB === "string") {
      const numA = parseFloat(valueA.replace("%", "")) || 0;
      const numB = parseFloat(valueB.replace("%", "")) || 0;
      
      if (sortDirection === "asc") {
        return numA - numB;
      } else {
        return numB - numA;
      }
    }
    
    // Handle numeric values
    if (typeof valueA === "number" && typeof valueB === "number") {
      if (sortDirection === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    }
    
    // Handle string values (customer names)
    if (typeof valueA === "string" && typeof valueB === "string") {
      if (sortDirection === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }
    
    return 0;
  });

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="bg-[#D3E4FD] flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-muted-foreground">
          Top 100 Advertisers by Media
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-4 w-4 ml-2 text-blue-600 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownloadXLSX}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Excel
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative max-h-[600px] overflow-auto">
          <Table className="relative">
            <AdvertisersTableHeader 
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              calculationInfo={calculationInfo}
            />
            <TableBody>
              {sortedData.map((advertiser) => (
                <AdvertiserTableRow key={advertiser.customer} advertiser={advertiser} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopAdvertisersTable;
