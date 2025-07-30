import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, PercentIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getTotalExpenditure, getMediaCategoryData, MediaExpenditure } from "@/services/mediaExpenditureService";

interface OverviewCardsProps {
  data: MediaExpenditure[];
}

const OverviewCards = ({ data }: OverviewCardsProps) => {
  const totalData = getTotalExpenditure(data);
  const categoryData = getMediaCategoryData(data);
  
  // Find category with highest growth
  const highestGrowth = [...categoryData].sort((a, b) => b.change - a.change)[0];
  
  // Find category with highest expenditure
  const highestExpenditure = [...categoryData].sort((a, b) => b.value2025 - a.value2025)[0];

  // Find medium with most reduced expenditure
  const mostReduced = [...data].sort((a, b) => a.percentage_change - b.percentage_change)[0];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenditure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalData.expenditure_2025)}</div>
          <div className="flex items-center pt-1">
            {totalData.percentage_change >= 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-emerald-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-rose-500 mr-1" />
            )}
            <p className={`text-xs ${totalData.percentage_change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
              {totalData.percentage_change >= 0 ? "+" : ""}{totalData.percentage_change}% from previous year
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Highest Growth</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highestGrowth.name}</div>
          <div className="flex items-center pt-1">
            <ArrowUpIcon className="h-4 w-4 text-emerald-500 mr-1" />
            <p className="text-xs text-emerald-500">
              +{highestGrowth.change}% from previous year
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Top Channel</CardTitle>
          <PercentIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highestExpenditure.name}</div>
          <p className="text-xs text-muted-foreground pt-1">
            {formatCurrency(highestExpenditure.value2025)}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Most Reduced</CardTitle>
          <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mostReduced.medium}</div>
          <div className="flex items-center pt-1">
            <ArrowDownIcon className="h-4 w-4 text-rose-500 mr-1" />
            <p className="text-xs text-rose-500">
              {mostReduced.percentage_change}% from previous year
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
