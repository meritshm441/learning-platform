"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function RevenueChart() {
  const data = [
    { name: "Jan", value: 5000 },
    { name: "Feb", value: 8000 },
    { name: "Mar", value: 12000 },
    { name: "Apr", value: 9000 },
    { name: "May", value: 3000 },
    { name: "Jun", value: 5500 },
    { name: "Jul", value: 15000 },
    { name: "Aug", value: 22000 },
    { name: "Sep", value: 12000 },
    { name: "Oct", value: 16000 },
    { name: "Nov", value: 10000 },
    { name: "Dec", value: 25000 },
  ]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="value" fill="#01589a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
