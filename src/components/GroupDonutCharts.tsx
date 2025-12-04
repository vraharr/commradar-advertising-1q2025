import { useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { PivotData, formatCurrency } from "@/services/groupDataService";

interface GroupDonutChartsProps {
  data: PivotData;
}

const COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", 
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#a855f7", "#22c55e", "#eab308", "#0ea5e9"
];

const GroupDonutCharts = ({ data }: GroupDonutChartsProps) => {
  const groupChartRef = useRef<HTMLDivElement>(null);
  const mediaTypeChartRef = useRef<HTMLDivElement>(null);

  // Data for share by group
  const groupData = data.rows.map((row, index) => ({
    name: row.media_group,
    value: row.grand_total,
    color: COLORS[index % COLORS.length]
  }));

  // Data for share by media type
  const mediaTypeData = data.mediaTypes.map((mediaType, index) => ({
    name: mediaType,
    value: data.columnTotals[mediaType],
    color: COLORS[index % COLORS.length]
  }));

  const handleDownload = (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;
    
    const svg = ref.current.querySelector("svg");
    if (!svg) {
      toast.error("Could not find chart to download");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 600;
    canvas.height = 400;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const link = document.createElement("a");
        link.download = `${filename}.jpg`;
        link.href = canvas.toDataURL("image/jpeg", 0.9);
        link.click();
        toast.success("Chart downloaded successfully");
      }
    };

    img.onerror = () => {
      toast.error("Failed to download chart");
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Share by Media Group</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDownload(groupChartRef, "share-by-media-group")}
            className="h-8 w-8"
          >
            <Download className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={groupChartRef}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={groupData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {groupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Share by Media Type</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDownload(mediaTypeChartRef, "share-by-media-type")}
            className="h-8 w-8"
          >
            <Download className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={mediaTypeChartRef}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mediaTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {mediaTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupDonutCharts;
