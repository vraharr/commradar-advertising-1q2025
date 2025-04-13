
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
import { formatCurrency } from "@/services/formatters";
import { ArrowDownIcon, ArrowUpIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TopAdvertiser {
  customer: string;
  mg: number;
  outdoor: number;
  pa: number;
  radio: number;
  tv: number;
  web: number;
  percentage_change: number;
  grandTotal?: number;
}

const TopAdvertisersTable = ({ limit = 40 }: { limit?: number }) => {
  const [advertisers, setAdvertisers] = useState<TopAdvertiser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof TopAdvertiser>("percentage_change");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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

        // Transform the data to match our interface
        const transformedData: TopAdvertiser[] = data.map(item => {
          // Convert percentages to decimal values for display
          const mg = item.mg_pct || 0;
          const outdoor = item.outdoor_pct || 0;
          const pa = item.pa_pct || 0;
          const radio = item.radio_pct || 0;
          const tv = item.tv_pct || 0;
          const web = item.web_pct || 0;
          
          // Calculate grand total based on all media percentages (to show relative market share)
          // Here we're using dummy values for the actual amounts since we only have percentages
          const avgSpend = 500000; // Average spend per media type
          const mgValue = mg * avgSpend / 100;
          const outdoorValue = outdoor * avgSpend / 100;
          const paValue = pa * avgSpend / 100;
          const radioValue = radio * avgSpend / 100;
          const tvValue = tv * avgSpend / 100;
          const webValue = web * avgSpend / 100;
          
          const grandTotal = mgValue + outdoorValue + paValue + radioValue + tvValue + webValue;
          
          return {
            customer: item.customer,
            mg: mgValue,
            outdoor: outdoorValue,
            pa: paValue,
            radio: radioValue,
            tv: tvValue,
            web: webValue,
            percentage_change: item.percentage_change || 0,
            grandTotal
          };
        });

        setAdvertisers(transformedData);
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
    const valueA = a[sortField];
    const valueB = b[sortField];
    
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
    const headers = ["Customer", "MG", "OUTDOOR", "PA", "Radio", "TV", "WEB", "Grand Total", "% Change"];
    const rows = sortedData.map(adv => [
      adv.customer,
      adv.mg.toString(),
      adv.outdoor.toString(),
      adv.pa.toString(),
      adv.radio.toString(),
      adv.tv.toString(),
      adv.web.toString(),
      adv.grandTotal?.toString() || "0",
      adv.percentage_change.toString()
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

  // Function to render the percentage change with appropriate styling
  const renderPercentageChange = (change: number) => {
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
        <CardTitle>Top 40 Advertisers by Media</CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0 z-10">
                <TableRow>
                  <TableHead 
                    className="w-[200px] cursor-pointer" 
                    onClick={() => handleSort("customer")}
                  >
                    Customer {getSortIcon("customer")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("mg")}
                  >
                    MG {getSortIcon("mg")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("outdoor")}
                  >
                    OUTDOOR {getSortIcon("outdoor")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("pa")}
                  >
                    PA {getSortIcon("pa")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("radio")}
                  >
                    Radio {getSortIcon("radio")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("tv")}
                  >
                    TV {getSortIcon("tv")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("web")}
                  >
                    WEB {getSortIcon("web")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("grandTotal")}
                  >
                    Grand Total {getSortIcon("grandTotal")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer" 
                    onClick={() => handleSort("percentage_change")}
                  >
                    % Change {getSortIcon("percentage_change")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((adv) => (
                  <TableRow key={adv.customer}>
                    <TableCell className="font-medium">{adv.customer}</TableCell>
                    <TableCell className="text-right">{formatCurrency(adv.mg)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(adv.outdoor)}</TableCell>
                    <TableCell className="text-right">{adv.pa > 0 ? formatCurrency(adv.pa) : ""}</TableCell>
                    <TableCell className="text-right">{formatCurrency(adv.radio)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(adv.tv)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(adv.web)}</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(adv.grandTotal || 0)}</TableCell>
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
