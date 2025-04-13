
import { ArrowUpIcon } from "lucide-react";
import { MediaExpenditure } from "@/services/mediaExpenditureService";

interface GainersSectionProps {
  data: MediaExpenditure[];
}

const GainersSection = ({ data }: GainersSectionProps) => {
  return (
    <div>
      <h3 className="text-md font-medium mb-3 flex items-center">
        <ArrowUpIcon className="h-5 w-5 text-emerald-500 mr-1" />
        Top Gainers
      </h3>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-emerald-50 rounded-md">
            <div className="font-medium">{item.medium}</div>
            <div className="text-emerald-600 font-medium">+{item.percentage_change}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GainersSection;
