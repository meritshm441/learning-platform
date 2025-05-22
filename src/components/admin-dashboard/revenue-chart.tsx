"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

type RevenueChartProps = {
  data: Array<{
    name: string
    value: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#888888"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="value" fill="#01589a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
