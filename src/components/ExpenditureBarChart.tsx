import { formatCurrency, MediaExpenditure } from "@/services/mediaExpenditureService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, LabelList } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import { useRef } from "react";

interface ExpenditureBarChartProps {
  data: MediaExpenditure[];
}

const ExpenditureBarChart = ({ data }: ExpenditureBarChartProps) => {
  const chartData = data.map((item) => ({
    name: item.medium,
    "2025": item.expenditure_2025,
    "2024": item.expenditure_2024,
    increased: item.expenditure_2025 > item.expenditure_2024,
  }));
  
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!chartRef.current) return;
    
    const svgElement = chartRef.current.querySelector("svg");
    if (!svgElement) return;
    
    // Create a copy of the SVG with proper dimensions
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    const viewBox = svgElement.getAttribute("viewBox");
    const width = svgElement.getBoundingClientRect().width;
    const height = svgElement.getBoundingClientRect().height;
    
    svgClone.setAttribute("width", width.toString());
    svgClone.setAttribute("height", height.toString());
    if (viewBox) svgClone.setAttribute("viewBox", viewBox);
    
    // Create the SVG serializer
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);
    
    // Convert SVG to data URL
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    
    // Create and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "expenditure-comparison-chart.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Custom label component to show growth/decline indicator
  const renderChangeIndicator = (props: any) => {
    const { x, y, width, index } = props;
    const item = chartData[index];
    if (!item) return null;
    
    if (item.increased) {
      return (
        <g>
          <circle cx={x + width / 2} cy={y - 12} r={8} fill="#22c55e" />
          <text x={x + width / 2} y={y - 8} textAnchor="middle" fill="white" fontSize={10}>↑</text>
        </g>
      );
    } else {
      return (
        <g>
          <circle cx={x + width / 2} cy={y - 12} r={8} fill="#ef4444" />
          <text x={x + width / 2} y={y - 8} textAnchor="middle" fill="white" fontSize={10}>↓</text>
        </g>
      );
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-muted-foreground">Expenditure Comparison by Medium</CardTitle>
          <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span>= Growth</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
            <TrendingDown className="h-3 w-3" />
            <span>= Decline</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardHeader>
      <CardContent className="pl-2" ref={chartRef}>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              barGap={0}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `€${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  
                  const value2024 = payload.find(p => p.dataKey === "2024")?.value as number || 0;
                  const value2025 = payload.find(p => p.dataKey === "2025")?.value as number || 0;
                  const percentageChange = ((value2025 - value2024) / value2024) * 100;
                  
                  return (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3 min-w-[200px]">
                      <div className="font-semibold text-sm border-b pb-2 mb-2 text-gray-800">
                        {label}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">2024:</span>
                          <span className="font-medium">{formatCurrency(value2024)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">2025:</span>
                          <span className="font-medium">{formatCurrency(value2025)}</span>
                        </div>
                      </div>
                      <div className="border-t mt-2 pt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">YoY Change:</span>
                        <span className={`text-sm font-semibold ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="2024" fill="#6366f1" name="2024 Expenditure" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill="#9ca3af" name="2025 Expenditure" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill="#9ca3af"
                  />
                ))}
                <LabelList content={renderChangeIndicator} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenditureBarChart;
