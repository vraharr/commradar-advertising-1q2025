
import { InfoIcon } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TopAdvertiser } from "../TopAdvertisersTable";

interface TableHeaderProps {
  sortField: keyof TopAdvertiser;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof TopAdvertiser) => void;
  calculationInfo: string;
}

const TableColumnHeader = ({ 
  field, 
  label, 
  sortField, 
  sortDirection, 
  onSort, 
  tooltip,
  showInfoIcon = false,
  calculationInfo = ""
}: { 
  field: keyof TopAdvertiser; 
  label: string; 
  sortField: keyof TopAdvertiser;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof TopAdvertiser) => void;
  tooltip?: string;
  showInfoIcon?: boolean;
  calculationInfo?: string;
}) => {
  const getSortIcon = (field: keyof TopAdvertiser) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" ? (
      <span className="h-4 w-4 ml-1 inline">↑</span>
    ) : (
      <span className="h-4 w-4 ml-1 inline">↓</span>
    );
  };

  if (tooltip) {
    return (
      <TableHead 
        className="text-right cursor-pointer bg-white" 
        onClick={() => onSort(field)}
      >
        <Tooltip>
          <TooltipTrigger className="flex items-center justify-end w-full">
            {label} {getSortIcon(field)}
            {showInfoIcon && <InfoIcon className="h-4 w-4 ml-1 text-blue-600 cursor-help" />}
          </TooltipTrigger>
          <TooltipContent className={showInfoIcon ? "max-w-xs text-left whitespace-pre-line p-4" : ""}>
            {showInfoIcon ? (
              <>
                <p className="font-bold mb-2 text-lg">Total Expenditure Calculation</p>
                <p className="mb-2 text-gray-700">{calculationInfo}</p>
              </>
            ) : (
              tooltip
            )}
          </TooltipContent>
        </Tooltip>
      </TableHead>
    );
  }
  
  return (
    <TableHead 
      className={`${field === "customer" ? "w-[200px]" : "text-right"} cursor-pointer bg-white`} 
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        {label} {getSortIcon(field)}
      </div>
    </TableHead>
  );
};

const AdvertisersTableHeader = ({ sortField, sortDirection, onSort, calculationInfo }: TableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableColumnHeader 
          field="customer" 
          label="Customer" 
          sortField={sortField} 
          sortDirection={sortDirection} 
          onSort={onSort} 
        />
        <TableColumnHeader 
          field="mg_pct" 
          label="MG" 
          sortField={sortField} 
          sortDirection={sortDirection} 
          onSort={onSort} 
          tooltip="Magazines" 
        />
        <TableColumnHeader 
          field="outdoor_pct" 
          label="OUTDOOR" 
          sortField={sortField} 
          sortDirection={sortDirection} 
          onSort={onSort}
          tooltip="Outdoor Advertising"
        />
        <TableColumnHeader 
          field="pa_pct" 
          label="PA" 
          sortField={sortField} 
          sortDirection={sortDirection}
          onSort={onSort}
          tooltip="Newspapers"
        />
        <TableColumnHeader 
          field="radio_pct" 
          label="Radio" 
          sortField={sortField} 
          sortDirection={sortDirection}
          onSort={onSort}
          tooltip="Radio Advertising"
        />
        <TableColumnHeader 
          field="tv_pct" 
          label="TV" 
          sortField={sortField} 
          sortDirection={sortDirection}
          onSort={onSort}
          tooltip="Television Advertising"
        />
        <TableColumnHeader 
          field="web_pct" 
          label="WEB" 
          sortField={sortField} 
          sortDirection={sortDirection}
          onSort={onSort}
          tooltip="Web Advertising"
        />
        <TableColumnHeader 
          field="total 2025" 
          label="Total 2025" 
          sortField={sortField} 
          sortDirection={sortDirection}
          onSort={onSort}
          tooltip="Total expenditure for 2025"
          showInfoIcon={true}
          calculationInfo={calculationInfo}
        />
        <TableColumnHeader 
          field="percentage_change" 
          label="% Change" 
          sortField={sortField} 
          sortDirection={sortDirection}
          onSort={onSort}
          tooltip="Percentage change compared to previous year"
        />
      </TableRow>
    </TableHeader>
  );
};

export default AdvertisersTableHeader;
