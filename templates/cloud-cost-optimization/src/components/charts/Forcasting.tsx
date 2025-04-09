"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample historical data (e.g., monthly cloud cost in USD)
const historicalData = [
  { month: "Jan", cost: 1200 },
  { month: "Feb", cost: 1350 },
  { month: "Mar", cost: 1400 },
  { month: "Apr", cost: 1500 },
  { month: "May", cost: 1600 },
  { month: "Jun", cost: 1700 },
];

// Function to forecast future cost (very basic linear forecast)
const forecastData = (data: { cost: number }[], months: number) => {
  const lastCost = data[data.length - 1].cost;
  const trend = (data[data.length - 1].cost - data[0].cost) / (data.length - 1); // avg monthly increase

  const forecast = [];
  for (let i = 1; i <= months; i++) {
    forecast.push({
      month: `+${i}M`,
      cost: Math.round(lastCost + trend * i),
      isForecast: true,
    });
  }
  return forecast;
};

const Forcasting: React.FC = () => {
  const forecast = forecastData(historicalData, 4);

  const combinedData = [
    ...historicalData.map((d) => ({ ...d, isForecast: false })),
    ...forecast,
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis unit="$" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#8884d8"
            strokeDasharray="0"
            name="Historical Cost"
            isAnimationActive={false}
            dot={{ r: 5 }}
            strokeOpacity={1}
            data={combinedData.filter((d) => !d.isForecast)}
          />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#82ca9d"
            strokeDasharray="5 5"
            name="Forecast"
            isAnimationActive={false}
            dot={{ r: 5 }}
            strokeOpacity={1}
            data={combinedData.filter((d) => d.isForecast)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Forcasting;
