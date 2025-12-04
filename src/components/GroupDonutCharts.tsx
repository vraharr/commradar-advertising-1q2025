import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Share by Media Group</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
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
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: 20 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Share by Media Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
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
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: 20 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupDonutCharts;
