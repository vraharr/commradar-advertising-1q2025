
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { TopAdvertiser } from "../TopAdvertisersTable";

interface AdvertiserRowProps {
  advertiser: TopAdvertiser;
}

const AdvertiserTableRow = ({ advertiser }: AdvertiserRowProps) => {
  const formatPercentage = (value: number | string | null): string => {
    if (value === null || value === undefined) return "";
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return "";
    return `${numValue.toFixed(2)}%`;
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

  const renderPercentageChange = (change: number | string | null) => {
    if (change === null) return "";
    
    const numChange = typeof change === 'string' ? parseFloat(change) : change;
    if (isNaN(numChange)) return "";
    
    const isPositive = numChange > 0;
    const isNegative = numChange < 0;
    
    return (
      <div className={`flex items-center justify-end ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : ''}`}>
        {isPositive && <ArrowUpIcon className="h-4 w-4 mr-1" />}
        {isNegative && <ArrowDownIcon className="h-4 w-4 mr-1" />}
        {numChange.toFixed(2)}%
      </div>
    );
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{advertiser.customer}</TableCell>
      <TableCell className="text-right">{formatPercentage(advertiser.mg_pct)}</TableCell>
      <TableCell className="text-right">{formatPercentage(advertiser.outdoor_pct)}</TableCell>
      <TableCell className="text-right">{formatPercentage(advertiser.pa_pct)}</TableCell>
      <TableCell className="text-right">{formatPercentage(advertiser.radio_pct)}</TableCell>
      <TableCell className="text-right">{formatPercentage(advertiser.tv_pct)}</TableCell>
      <TableCell className="text-right">{formatPercentage(advertiser.web_pct)}</TableCell>
      <TableCell className="text-right">{advertiser["total 2025"] ? formatCurrency(advertiser["total 2025"]) : ""}</TableCell>
      <TableCell className="text-right">
        {renderPercentageChange(advertiser.percentage_change)}
      </TableCell>
    </TableRow>
  );
};

export default AdvertiserTableRow;
