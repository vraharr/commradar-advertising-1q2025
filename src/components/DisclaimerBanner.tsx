import { useState } from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const DisclaimerBanner = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="container mx-auto px-4 py-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 text-sm text-amber-800 hover:text-amber-900 transition-colors w-full justify-center">
              <Info className="h-4 w-4" />
              <span className="font-medium">Important Disclaimer</span>
              <span className="text-amber-600">– Click to read about our data methodology</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Data Disclaimer & Methodology</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[65vh] pr-4">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The advertising expenditure data presented on this website is compiled for informational and analytical purposes only. The Data reflects estimated advertising investments across monitored media channels in Cyprus based on a proprietary methodology. It is not a statement of actual company revenues, agency billings, or audited financial transactions.
                </p>
                
                <p>
                  While we strive for accuracy and consistency in our monitoring and calculations, the Data is provided "as is." We make no warranties, express or implied, regarding the completeness, accuracy, reliability, or suitability of the Data for any specific purpose. Users of this Data should exercise their own judgment before making any business or investment decisions based upon the information on this page.
                </p>
                
                <p>
                  Trends and figures may be revised retrospectively as more complete information becomes available. Comparisons across different media types should be made with a clear understanding of the underlying methodological differences in valuation.
                </p>
                
                <h3 className="text-base font-semibold text-foreground pt-4">Methodology Description: How We Calculate Advertising Expenditure</h3>
                
                <p>
                  Our figures represent an estimate of the "Net Cost" of advertising space or time, not necessarily the final negotiated amount paid by an advertiser. We arrive at this estimate through a specific, three-step process:
                </p>
                
                <div className="space-y-3 pl-4">
                  <p>
                    <strong className="text-foreground">1. Monitoring & Data Collection:</strong> Our team systematically monitors advertising activity across the full spectrum of major media in Cyprus, including Television (TV), Radio, Outdoor billboards, Press (Newspapers, Magazines), Online platforms (Social Media, Google Ads, Local Websites), and key locations like Airports and shopping malls.
                  </p>
                  
                  <p>
                    <strong className="text-foreground">2. Application of Published Rates:</strong> For each detected advertisement, we assign an initial value based on the medium's official, publicly available rate card (e.g., cost per 30-second TV spot, cost per full-page newspaper ad, cost for a specific digital banner package).
                  </p>
                  
                  <p>
                    <strong className="text-foreground">3. Adjustment to Estimated Market Value:</strong> Recognizing that final investments are often subject to negotiation and discounts, we adjust the initial rate card value. We apply a standard, estimated industry-average discount to each media type to better approximate the actual Net expenditure. These discount rates are derived from ongoing market analysis and industry insights.
                  </p>
                </div>
                
                <p>
                  <strong className="text-foreground">Example:</strong> A TV spot with a rate card value of €100 is adjusted by the estimated average market discount for TV (e.g., 92%) to yield a final estimated expenditure value of €8 (€100 * 0.08). Conversely, a medium with a lower average discount, like Print, will have a smaller adjustment from its rate card value.
                </p>
                
                <p>
                  This methodology allows for consistent, year-on-year comparison of advertising investment trends across different media. It is designed to reflect the relative weight and momentum of advertising channels in the Cypriot market, providing a clear picture of the advertising market size in Cyprus.
                </p>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
