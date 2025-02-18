"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"
import { motion } from "framer-motion"
import { progressValues } from "@/src/config/progressConfig"

interface Activity {
  name: string
  goal: number
  current: number
  color: string
}

const ProgressChart: React.FC = () => {
  return (
    <div>
      <h2>Progress Chart</h2>
      {/* Add chart implementation here */}
    </div>
  );
};

export default ProgressChart;

