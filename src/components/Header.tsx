import { Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const Header = () => {
  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Link copied to clipboard", {
        description: "You can now share this page with others"
      });
    }).catch(error => {
      console.error("Failed to copy URL:", error);
      toast.error("Failed to copy link");
    });
  };
  const calculationInfo = `Advertising Expenditure Calculation
The figures represent estimated net expenditures after applying standard media discounts to published rate card values. Discounts are applied as follows:

TV: 92% discount (client pays 8% of rate card)

Radio: 86% discount (client pays 14% of rate card)

Outdoor, Press & Web: 50% discount (client pays 50% of rate card)

These adjusted values reflect typical actual paid amounts in the market.`;
  return <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/lovable-uploads/56939c85-63df-4098-b7a9-51da392da262.png" alt="CommRadar Logo" className="h-10 w-auto" />
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold md:text-3xl">Advertising Expenditure Cyprus</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 text-blue-100 hover:text-white hover:bg-blue-600/30">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Calculation info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs whitespace-pre-line bg-white text-gray-800 p-4">
                  <h4 className="text-blue-600 underline font-semibold mb-2">Advertising Expenditure Calculation</h4>
                  {calculationInfo.split("Advertising Expenditure Calculation\n")[1]}
                </TooltipContent>
              </Tooltip>
              <p className="text-blue-100 text-sm">S1 2025 vs S1 2024 Estimated Net Advertising</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <div className="hidden md:block">
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="font-medium">Last Updated:</span> July 11, 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;