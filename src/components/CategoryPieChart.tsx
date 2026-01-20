import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getMediaCategoryData, MediaExpenditure } from "@/services/mediaExpenditureService";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";

interface CategoryPieChartProps {
  data: MediaExpenditure[];
}

const CategoryPieChart = ({ data }: CategoryPieChartProps) => {
  const categoryData = getMediaCategoryData(data);
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Colors for the 3 segments: Traditional, Digital, Out-of-Home
  const SEGMENT_COLORS: Record<string, string> = {
    'Traditional': '#3b82f6',   // Blue
    'Digital': '#8b5cf6',       // Purple
    'Out-of-Home': '#10b981',   // Green
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={14} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
    link.download = "media-expenditure-chart.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-muted-foreground text-sm">Expenditure by Media (2025)</CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardHeader>
      <CardContent ref={chartRef}>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value2025"
                nameKey="name"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[entry.name] || '#6366f1'} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [formatCurrency(Number(value)), name]}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                formatter={(value) => {
                  const item = categoryData.find(d => d.name === value);
                  if (item) {
                    return `${value} (${formatCurrency(item.value2025)})`;
                  }
                  return value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
