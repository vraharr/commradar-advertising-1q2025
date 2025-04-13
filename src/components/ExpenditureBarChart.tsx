import { formatCurrency, MediaExpenditure } from "@/services/mediaExpenditureService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";

interface ExpenditureBarChartProps {
  data: MediaExpenditure[];
}

const ExpenditureBarChart = ({ data }: ExpenditureBarChartProps) => {
  const chartData = data.map((item) => ({
    name: item.medium,
    "2025": item.expenditure_2025,
    "2024": item.expenditure_2024,
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

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-muted-foreground">Expenditure Comparison by Medium</CardTitle>
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
                formatter={(value) => [formatCurrency(Number(value)), ""]} 
                labelStyle={{ fontWeight: "bold" }}
                contentStyle={{ 
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="2025" fill="#3b82f6" name="2025 Expenditure" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2024" fill="#6366f1" name="2024 Expenditure" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenditureBarChart;
