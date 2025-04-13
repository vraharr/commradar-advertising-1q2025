
import { ArrowDownIcon } from "lucide-react";
import { MediaExpenditure } from "@/services/mediaExpenditureService";
import { useIsMobile } from "@/hooks/use-mobile";

interface LosersSectionProps {
  data: MediaExpenditure[];
}

const LosersSection = ({ data }: LosersSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-full">
      <h3 className="text-md font-medium mb-3 flex items-center">
        <ArrowDownIcon className="h-5 w-5 text-rose-500 mr-1" />
        Top Losers
      </h3>
      <div className={`space-y-2 ${isMobile ? 'grid grid-cols-2 gap-2 space-y-0' : ''}`}>
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 bg-rose-50 rounded-md hover:bg-rose-100 transition-colors"
          >
            <div className="font-medium truncate mr-2">{item.medium}</div>
            <div className="text-rose-600 font-medium whitespace-nowrap">{item.percentage_change}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LosersSection;
