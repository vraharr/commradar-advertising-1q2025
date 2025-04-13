
import { ArrowDownIcon } from "lucide-react";
import { MediaExpenditure } from "@/services/mediaExpenditureService";

interface LosersSectionProps {
  data: MediaExpenditure[];
}

const LosersSection = ({ data }: LosersSectionProps) => {
  return (
    <div>
      <h3 className="text-md font-medium mb-3 flex items-center">
        <ArrowDownIcon className="h-5 w-5 text-rose-500 mr-1" />
        Top Losers
      </h3>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-rose-50 rounded-md">
            <div className="font-medium">{item.medium}</div>
            <div className="text-rose-600 font-medium">{item.percentage_change}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LosersSection;
