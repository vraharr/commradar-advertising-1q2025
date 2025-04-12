
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
import { formatCurrency } from "@/services/formatters";
import { ArrowDownIcon, ArrowUpIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TopAdvertiser {
  customer: string;
  mg: number;
  outdoor: number;
  pa: number;
  radio: number;
  tv: number;
  web: number;
  grandTotal: number;
}

// Generate dummy data for top advertisers
const generateDummyTopAdvertisers = (count: number): TopAdvertiser[] => {
  const customers = [
    "LIDL", "ALPHAMEGA", "METRO", "COCA-COLA", "BANK OF CYPRUS", 
    "HELLENIC BANK", "MTN", "EPIC", "RCB BANK", "CYTA",
    "McDONALDS", "OPAP", "BETTING COMPANY", "DEBENHAMS", "JUMBO",
    "ALPHA BANK", "STARBUCKS", "EAC", "CARREFOUR", "AMAZON",
    "TOYOTA", "MERCEDES", "BMW", "UNIVERSITY OF NICOSIA", "PEPSI",
    "HEINEKEN", "KEO", "FOUR SEASONS", "HILTON", "BURGER KING"
  ];

  return customers.slice(0, count).map((customer, index) => {
    // Random values that make realistic proportions
    const mg = Math.round(Math.random() * 15000) + 1000;
    const outdoor = Math.round(Math.random() * 25000) + 5000;
    const pa = Math.round(Math.random() * 30000) + 15000;
    const radio = Math.round(Math.random() * 300000) + 50000;
    const tv = Math.round(Math.random() * 3000000) + 500000;
    const web = Math.round(Math.random() * 50000) + 10000;
    const grandTotal = mg + outdoor + pa + radio + tv + web;

    // Make the first two match the example data in the image
    if (index === 0) {
      return {
        customer: "LIDL",
        mg: 14350,
        outdoor: 16120,
        pa: 25970,
        radio: 282472.5,
        tv: 3112201.87,
        web: 11207.02,
        grandTotal: 3462301.39
      };
    } else if (index === 1) {
      return {
        customer: "ALPHAMEGA",
        mg: 1250,
        outdoor: 23690,
        pa: 0,
        radio: 196436.04,
        tv: 1831045.59,
        web: 31943.64,
        grandTotal: 2084365.27
      };
    }

    return {
      customer,
      mg,
      outdoor,
      pa,
      radio,
      tv,
      web,
      grandTotal
    };
  });
};

// Generate 30 top advertisers
const TOP_ADVERTISERS = generateDummyTopAdvertisers(30);

interface TopAdvertisersTableProps {
  limit?: number;
}

const TopAdvertisersTable = ({ limit = 30 }: TopAdvertisersTableProps) => {
  const [sortField, setSortField] = useState<keyof TopAdvertiser>("grandTotal");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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
  const sortedData = [...TOP_ADVERTISERS].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  }).slice(0, limit);

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
    const headers = ["Customer", "MG", "OUTDOOR", "PA", "Radio", "TV", "WEB", "Grand Total"];
    const rows = sortedData.map(adv => [
      adv.customer,
      adv.mg.toString(),
      adv.outdoor.toString(),
      adv.pa.toString(),
      adv.radio.toString(),
      adv.tv.toString(),
      adv.web.toString(),
      adv.grandTotal.toString()
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

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="bg-[#D3E4FD] flex flex-row items-center justify-between">
        <CardTitle>Top 30 Advertisers by Medium</CardTitle>
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
                    <TableCell className="text-right font-bold">{formatCurrency(adv.grandTotal)}</TableCell>
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
