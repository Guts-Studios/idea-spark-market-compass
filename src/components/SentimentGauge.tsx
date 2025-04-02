
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentGaugeProps {
  positive: number;
  neutral: number;
  negative: number;
  title?: string;
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({
  positive,
  neutral,
  negative,
  title,
}) => {
  const data = [
    { name: "Positive", value: positive, color: "#10b981" },
    { name: "Neutral", value: neutral, color: "#f59e0b" },
    { name: "Negative", value: negative, color: "#ef4444" },
  ];

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-md font-medium text-center mb-2">{title}</h3>
      )}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentGauge;
