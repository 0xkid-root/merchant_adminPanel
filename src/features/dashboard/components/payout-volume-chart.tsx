"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1 Sep", total: 4000, successful: 3500, pending: 300, processing: 100, failed: 100 },
  { name: "2 Sep", total: 3000, successful: 2600, pending: 200, processing: 150, failed: 50 },
  { name: "3 Sep", total: 4500, successful: 4000, pending: 300, processing: 50, failed: 150 },
  { name: "4 Sep", total: 4800, successful: 4200, pending: 250, processing: 150, failed: 200 },
  { name: "5 Sep", total: 3800, successful: 3400, pending: 200, processing: 100, failed: 100 },
  { name: "6 Sep", total: 5200, successful: 4600, pending: 350, processing: 150, failed: 100 },
  { name: "7 Sep", total: 6000, successful: 5500, pending: 200, processing: 100, failed: 200 },
];

export function PayoutVolumeChart() {
  return (
    <div className="flex h-full min-h-[350px] w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Payout Volume Overview (Last 7 Days)</h3>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-slate-500">Amount (₹)</span>
          <div className="flex items-center rounded-md bg-slate-100 p-0.5 dark:bg-slate-800">
            <button className="rounded bg-white px-2.5 py-1 text-[12px] font-semibold text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white">7D</button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: "8px", 
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px -4px rgb(0 0 0 / 0.1)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#334155"
              }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", fontWeight: 500, paddingBottom: "20px" }}
            />
            <Area
              type="monotone"
              dataKey="total"
              name="Total"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorTotal)"
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="successful"
              name="Successful"
              stroke="#10b981"
              strokeWidth={2}
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="pending"
              name="Pending"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="processing"
              name="Processing"
              stroke="#f97316"
              strokeWidth={2}
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="failed"
              name="Failed"
              stroke="#ef4444"
              strokeWidth={2}
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
