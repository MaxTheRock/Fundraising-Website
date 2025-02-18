"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"

interface Activity {
  name: string
  amount: number
  color: string
}

export default function wPieChart({ activities }: { activities: Activity[] }) {
  const total = activities.reduce((sum, activity) => sum + activity.amount, 0)

  return (
    <div className="w-full md:w-1/2 h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={activities} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="amount">
            {activities.map((activity, index) => (
              <Cell key={`cell-${index}`} fill={activity.color} stroke="#000000" strokeWidth={2} />
            ))}
            <Label
              content={({ viewBox }) => {
                const { cx, cy } = viewBox
                return (
                  <>
                    <text x={cx} y={cy - 10} textAnchor="middle" className="text-4xl font-black">
                      £{total}
                    </text>
                    <text x={cx} y={cy + 20} textAnchor="middle" className="text-sm font-bold">
                      TOTAL RAISED
                    </text>
                  </>
                )
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

