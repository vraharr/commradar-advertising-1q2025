
import { formatCurrency, mediaExpenditureData } from "@/data/mediaExpenditureData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ExpenditureBarChart = () => {
  const chartData = mediaExpenditureData.map((item) => ({
    name: item.medium,
    "2025": item.expenditure2025,
    "2024": item.expenditure2024,
  }));

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Expenditure Comparison by Medium</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
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
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
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
