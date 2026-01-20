import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getMediaCategoryData, MediaExpenditure } from "@/services/mediaExpenditureService";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import { mediaCategories } from "@/services/mediaTypes";

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

  // Map segment names to media categories
  const segmentToMediaTypes: Record<string, string[]> = {
    'Traditional': mediaCategories.traditional,
    'Digital': mediaCategories.digital,
    'Out-of-Home': mediaCategories.outOfHome,
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

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    const segmentName = payload[0].name;
    const segmentData = categoryData.find(d => d.name === segmentName);
    const mediaTypes = segmentToMediaTypes[segmentName] || [];
    
    // Get individual media breakdown
    const mediaBreakdown = mediaTypes.map(medium => {
      const mediaItem = data.find(d => d.medium === medium);
      if (!mediaItem) return null;
      const change = ((mediaItem.expenditure_2025 - mediaItem.expenditure_2024) / mediaItem.expenditure_2024) * 100;
      return {
        name: medium,
        value2025: mediaItem.expenditure_2025,
        change: change,
      };
    }).filter(Boolean).sort((a, b) => (b?.value2025 || 0) - (a?.value2025 || 0));

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3 min-w-[220px]">
        <div className="font-semibold text-sm border-b pb-2 mb-2" style={{ color: SEGMENT_COLORS[segmentName] }}>
          {segmentName}
        </div>
        <div className="space-y-1.5">
          {mediaBreakdown.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <span className="text-gray-600">{item?.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formatCurrency(item?.value2025 || 0)}</span>
                <span className={`text-xs ${(item?.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(item?.change || 0) >= 0 ? '↑' : '↓'} {Math.abs(item?.change || 0).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-700">Total</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{formatCurrency(segmentData?.value2025 || 0)}</span>
            <span className={`text-xs font-medium ${(segmentData?.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(segmentData?.change || 0) >= 0 ? '↑' : '↓'} {Math.abs(segmentData?.change || 0).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
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
              <Tooltip content={<CustomTooltip />} />
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
