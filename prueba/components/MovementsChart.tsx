"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Cell,
} from "recharts";
import { prepareChartData, Movement } from "@/lib/movementsUtils";

interface Props {
  data: Movement[];
}

export default function MovementsChart({ data }: Props) {
  const chartData = prepareChartData(data);

  const formattedData = chartData.map((item) => ({
    concept: item.concept,
    amount: item.type === "Ingreso" ? item.amount : -item.amount,
  }));

  return (
    <div className="w-full max-w-2xl h-64 mx-auto">
      <ResponsiveContainer>
        <BarChart data={formattedData}>
          <CartesianGrid></CartesianGrid>
          <XAxis dataKey="concept" reversed />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="amount" name="Ingresos / Egresos">
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.amount >= 0 ? "#4ade80" : "#f87171"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
