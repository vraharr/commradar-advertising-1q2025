import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DownloadIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TopAdvertiser {
  customer: string;
  mg_pct: number | null;
  outdoor_pct: number | null;
  pa_pct: number | null;
  radio_pct: number | null;
  tv_pct: number | null;
  web_pct: number | null;
  percentage_change: number | null;
}

const TopAdvertisersTable = ({ limit = 40 }: { limit?: number }) => {
  const [advertisers, setAdvertisers] = useState<TopAdvertiser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof TopAdvertiser>("percentage_change");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const tooltipText = "This table includes the top 40 advertisers in the market. This table splits between the advertisers with the highest increase/decrease in advertising expenditure compared to the year before.";

  useEffect(() => {
    const fetchTopAdvertisers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('customer_media_percentages')
          .select('*')
          .limit(limit);

        if (error) {
          console.error('Error fetching top advertisers:', error);
          toast.error('Failed to load top advertisers data');
          return;
        }

        setAdvertisers(data as TopAdvertiser[]);
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
      // Toggle sorting direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New sort field, default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Sort the data
  const sortedData = [...advertisers].sort((a, b) => {
    const valueA = a[sortField] ?? 0;
    const valueB = b[sortField] ?? 0;
    
    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const getSortIcon = (field: keyof TopAdvertiser) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" ? (
      <ArrowUpIcon className="h-4 w-4 ml-1 inline" />
    ) : (
      <ArrowDownIcon className="h-4 w-4 ml-1 inline" />
    );
  };

  const handleDownloadCSV = () => {
    // Generate CSV content
    const headers = ["Customer", "MG (%)", "OUTDOOR (%)", "PA (%)", "Radio (%)", "TV (%)", "WEB (%)", "% Change"];
    const rows = sortedData.map(adv => [
      adv.customer,
      formatPercentage(adv.mg_pct),
      formatPercentage(adv.outdoor_pct),
      formatPercentage(adv.pa_pct),
      formatPercentage(adv.radio_pct),
      formatPercentage(adv.tv_pct),
      formatPercentage(adv.web_pct),
      formatPercentage(adv.percentage_change)
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    // Create a Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "top_advertisers.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format percentage values
  const formatPercentage = (value: number | null): string => {
    if (value === null || value === undefined) return "";
    return `${value.toFixed(2)}%`;
  };

  // Function to render the percentage change with appropriate styling
  const renderPercentageChange = (change: number | null) => {
    if (change === null) return "";
    
    const isPositive = change > 0;
    const isNegative = change < 0;
    
    return (
      <div className={`flex items-center justify-end ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : ''}`}>
        {isPositive && <ArrowUpIcon className="h-4 w-4 mr-1" />}
        {isNegative && <ArrowDownIcon className="h-4 w-4 mr-1" />}
        {change.toFixed(2)}%
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-4">
        <CardHeader className="bg-[#D3E4FD] flex flex-row items-center justify-between">
          <CardTitle>Top 40 Advertisers by Media</CardTitle>
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

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="bg-[#D3E4FD] flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          Top 40 Advertisers by Media
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-4 w-4 ml-2 text-blue-600 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead 
                    className="w-[200px] cursor-pointer" 
                    onClick={() => handleSort("customer")}
                  >
                    <div className="flex items-center">
                      Customer {getSortIcon("customer")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("mg_pct")}
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        MG {getSortIcon("mg_pct")}
                      </TooltipTrigger>
                      <TooltipContent>
                        Magazines
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("outdoor_pct")}
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        OUTDOOR {getSortIcon("outdoor_pct")}
                      </TooltipTrigger>
                      <TooltipContent>
                        Outdoor Advertising
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("pa_pct")}
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        PA {getSortIcon("pa_pct")}
                      </TooltipTrigger>
                      <TooltipContent>
                        Newspapers
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("radio_pct")}
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        Radio {getSortIcon("radio_pct")}
                      </TooltipTrigger>
                      <TooltipContent>
                        Radio Advertising
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("tv_pct")}
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        TV {getSortIcon("tv_pct")}
                      </TooltipTrigger>
                      <TooltipContent>
                        Television Advertising
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("web_pct")}
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        WEB {getSortIcon("web_pct")}
                      </TooltipTrigger>
                      <TooltipContent>
                        Web Advertising
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("percentage_change")}
                  >
                    <Tooltip>
                      <TooltipTrigger className="flex items-center justify-end w-full">
                        % Change {getSortIcon("percentage_change")}
                      </TooltipTrigger>
                      <TooltipContent>
                        Percentage change compared to previous year
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((adv) => (
                  <TableRow key={adv.customer}>
                    <TableCell className="font-medium">{adv.customer}</TableCell>
                    <TableCell className="text-right">{formatPercentage(adv.mg_pct)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(adv.outdoor_pct)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(adv.pa_pct)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(adv.radio_pct)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(adv.tv_pct)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(adv.web_pct)}</TableCell>
                    <TableCell className="text-right">
                      {renderPercentageChange(adv.percentage_change)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TopAdvertisersTable;
