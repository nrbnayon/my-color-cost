"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { name: "5k", value: 20 },
  { name: "10k", value: 30 },
  { name: "15k", value: 48 },
  { name: "20k", value: 35 },
  { name: "25k", value: 52 }, // Peak around 20k visually in image but 20k label is X axis.
  // Actually matching the image curve roughly:
  { name: "5k", value: 20 },
  { name: "10k", value: 30 },
  { name: "15k", value: 45 },
  { name: "20k", value: 85 }, // spike
  { name: "25k", value: 35 },
  { name: "30k", value: 50 },
  { name: "35k", value: 45 },
  { name: "40k", value: 60 },
  { name: "45k", value: 25 },
  { name: "50k", value: 48 },
  { name: "55k", value: 45 },
  { name: "60k", value: 70 },
  { name: "65k", value: 50 },
  { name: "70k", value: 60 },
  { name: "75k", value: 55 },
];

export default function SalesDetailsChart() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-[6px_6px_54px_0px_#0000000D] w-full h-[450px] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-foreground">Sales Details</h2>
        <div className="relative">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
               October <ChevronDown className="w-4 h-4" />
             </button>
        </div>
      </div>
      
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4880FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4880FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EAEAEA" strokeDasharray="3 3" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4880FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 6, strokeWidth: 0, fill: '#4880FF' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
