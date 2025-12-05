import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Database, BarChart3, Tag, Headphones, TrendingUp, Share2, MapPin, Monitor } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from "recharts";

const chartData = [
  { year: "2015", value: 10.4, growth: "" },
  { year: "2020", value: 19.8, growth: "+90%" },
  { year: "2023", value: 35.37, growth: "+78%" },
  { year: "2025", value: 38.6, growth: "+9%" },
];

const timelineData = [
  { step: 1, year: "2015", amount: "€10.4M", description: "Digital emergence" },
  { step: 2, year: "2020", amount: "€19.8M", description: "55% growth year-over-year" },
  { step: 3, year: "2023", amount: "€35.37M", description: "Pandemic acceleration" },
  { step: 4, year: "2025 Est", amount: "€38.6M", description: "306% total growth" },
];

const DigitalAdvertising = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Digital Advertising Analysis</h2>
            <p className="text-muted-foreground mt-1">Growth trends in digital advertising expenditure in Cyprus</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("URL copied to clipboard");
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2" disabled>
                  Reports
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuItem asChild>
                <Link to="/group-data" className="flex items-center gap-2 cursor-pointer">
                  <Database className="h-4 w-4" />
                  Group Data
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/digital-advertising" className="flex items-center gap-2 cursor-pointer">
                  <Monitor className="h-4 w-4" />
                  Digital Advertising
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <BarChart3 className="h-4 w-4" />
                Ad Ex by Industry
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <Database className="h-4 w-4" />
                Ad Ex by Media Name
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <Tag className="h-4 w-4" />
                Ad Ex by Brand
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <Headphones className="h-4 w-4" />
                Social Listening
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <TrendingUp className="h-4 w-4" />
                Google Ads Reporting
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <Share2 className="h-4 w-4" />
                Social Media Reporting
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <MapPin className="h-4 w-4" />
                OOH Ad Ex
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4">
            <h3 className="text-xl font-bold">Digital Advertising: Fastest Growing</h3>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      domain={[0, 45]}
                      ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45]}
                    />
                    <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === chartData.length - 1 ? "#1e40af" : "#60a5fa"} 
                        />
                      ))}
                      <LabelList 
                        dataKey="growth" 
                        position="top" 
                        fill="#16a34a" 
                        fontWeight="bold"
                        fontSize={14}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Timeline */}
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  {timelineData.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 border-2 border-blue-600 rounded flex items-center justify-center text-blue-600 font-bold text-sm">
                        {item.step}
                      </div>
                      <div className="flex-1 border-l-2 border-blue-200 pl-4 pb-4">
                        <h4 className="font-bold text-gray-800">{item.year}</h4>
                        <p className="text-blue-600 font-semibold">{item.amount}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Text */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-700">
                <span className="font-bold">270% growth</span> from 2015 to 2025 demonstrates the explosive expansion of digital advertising. 
                These calculations include advertising Expenditure by Companies based in Cyprus, and for adverts shown in REGION = CY. 
                Calculation includes Social Media, Google ads and Local Websites.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalAdvertising;
