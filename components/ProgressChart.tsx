"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"
import { motion } from "framer-motion"
import { progressValues } from "@/src/config/progressConfig"
import React from 'react';

interface Activity {
  name: string
  goal: number
  current: number
  color: string
}

const ProgressChart: React.FC = ({ activities }: { activities: Activity[] }) => {
  // Calculate total completed and remaining
  const totalCompleted = activities.reduce((sum, activity) => sum + activity.current, 0);
  const totalGoalSum = activities.reduce((sum, activity) => sum + activity.goal, 0);
  const totalRemaining = totalGoalSum - totalCompleted;

  // Create data with activities in specific order (SWIMMING, WALKING, BIKING) and remaining
  const data = [
    // Swimming will be first (top)
    activities.find(a => a.name === "SWIMMING"),
    // Walking will be second (clockwise)
    activities.find(a => a.name === "WALKING"),
    // Biking will be third
    activities.find(a => a.name === "BIKING"),
  ].map((activity) => ({
    name: activity.name,
    value: activity.current,
    color: activity.color,
  })).concat({
    name: 'Remaining',
    value: totalRemaining,
    color: "transparent",
  });

  const { totalDistance, totalGoal } = progressValues.totals

  return (
    <div className="w-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-64 md:h-[400px] lg:h-[500px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="70%"
              paddingAngle={4}
              dataKey="value"
              strokeWidth={3}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === 'Remaining' ? 'none' : entry.color} 
                  stroke={entry.name === 'Remaining' ? 'none' : '#000000'} 
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox
                  return (
                    <>
                      <text x={cx} y={cy - 10} textAnchor="middle" className="text-3xl md:text-4xl font-black">
                        {Math.round((totalDistance / totalGoal) * 100)}%
                      </text>
                      <text x={cx} y={cy + 20} textAnchor="middle" className="text-sm md:text-base font-bold">
                        COMPLETED
                      </text>
                    </>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
      <div className="mt-8 space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ x: -25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between text-base md:text-lg">
              <span className="font-bold">{activity.name}</span>
              <span className="font-black">
                {activity.current}km / {activity.goal}km
              </span>
            </div>
            <div className="w-full h-3 md:h-4 border-2 border-black">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(activity.current / activity.goal) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="h-full"
                style={{ backgroundColor: activity.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
};

export default ProgressChart;

