
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MediaExpenditure } from "@/services/mediaExpenditureService";
import GainersSection from "./gainers-losers/GainersSection";
import LosersSection from "./gainers-losers/LosersSection";

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
        <CardTitle className="text-muted-foreground text-sm">Top Performers & Underperformers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <GainersSection data={topGainers} />
          <LosersSection data={topLosers} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopGainersLosers;
