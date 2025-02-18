"use client"

import { motion } from "framer-motion"
import React from 'react';

interface FundraisingProgressProps {
  current: number
  goal: number
}

const FundraisingProgress: React.FC<FundraisingProgressProps> = ({ current, goal }) => {
  const progress = (current / goal) * 100

  return (
    <div className="w-full">
      <h2>Fundraising Progress</h2>
      <div className="flex justify-between mb-2 text-xs sm:text-sm">
        <span className="font-bold">FUNDRAISING PROGRESS</span>
        <span className="font-black">
          £{current} / £{goal}
        </span>
      </div>
      <div className="w-full h-3 sm:h-4 border-2 border-black">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-black"
        />
      </div>
    </div>
  )
}

export default FundraisingProgress;

