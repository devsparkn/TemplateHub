"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Define the type for predicted cost data items
interface PredictedCostData {
  ds: string; // date string
  yhat: number; // predicted cost value
}

// Define the component props
interface CostChartProps {
  data?: PredictedCostData[];
  anomalies?: unknown; // You can update this type later if needed
}

// Default sample data in the predicted cost data format
const defaultChartData: PredictedCostData[] = [
  { ds: "2024-01-01", yhat: 100 },
  { ds: "2024-02-01", yhat: 120 },
  { ds: "2024-03-01", yhat: 110 },
  { ds: "2024-04-01", yhat: 100 },
  { ds: "2024-05-01", yhat: 130 },
  { ds: "2024-06-01", yhat: 150 },
  { ds: "2024-07-01", yhat: 100 },
  { ds: "2024-08-01", yhat: 120 },
  { ds: "2024-09-01", yhat: 160 },
];

export default function CostChart({ data }: CostChartProps) {
  // Use the provided data if it's an array; otherwise, fallback to the default sample data
  const chartData: PredictedCostData[] = Array.isArray(data)
    ? data
    : defaultChartData;

  console.log("Chart data:", chartData);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="ds" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="yhat" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
