
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency, MediaExpenditure } from "@/services/mediaExpenditureService";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface TopGainersLosersProps {
  data: MediaExpenditure[];
}

const TopGainersLosers = ({ data }: TopGainersLosersProps) => {
  // Sort data by percentage change
  const sortedData = [...data].sort((a, b) => b.percentage_change - a.percentage_change);
  
  // Get top 3 gainers and losers
  const topGainers = sortedData.slice(0, 3);
  const topLosers = sortedData.slice(-3).reverse();

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-muted-foreground">Top Performers & Underperformers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <ArrowUpIcon className="h-5 w-5 text-emerald-500 mr-1" />
              Top Gainers
            </h3>
            <div className="space-y-2">
              {topGainers.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-emerald-50 rounded-md">
                  <div className="font-medium">{item.medium}</div>
                  <div className="text-emerald-600 font-medium">+{item.percentage_change}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <ArrowDownIcon className="h-5 w-5 text-rose-500 mr-1" />
              Top Losers
            </h3>
            <div className="space-y-2">
              {topLosers.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-rose-50 rounded-md">
                  <div className="font-medium">{item.medium}</div>
                  <div className="text-rose-600 font-medium">{item.percentage_change}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopGainersLosers;
