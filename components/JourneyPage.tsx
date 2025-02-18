"use client"

import { motion } from "framer-motion"

interface Activity {
  name: string
  goal: number
  current: number
  color: string
}

interface JourneyPageProps {
  activities: Activity[]
}

export default function JourneyPage({ activities }: JourneyPageProps) {
  const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "-100%" },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 overflow-y-auto"
    >
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl sm:text-3xl font-black mb-6"
      >
        MY JOURNEY
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="border-2 border-black p-4"
            style={{ backgroundColor: activity.color }}
          >
            <h3 className="text-lg sm:text-xl font-black mb-2">{activity.name}</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                Current: <span className="font-bold">{activity.current}km</span>
              </p>
              <p>
                Goal: <span className="font-bold">{activity.goal}km</span>
              </p>
              <p>
                Remaining: <span className="font-bold">{(activity.goal - activity.current).toFixed(1)}km</span>
              </p>
              <div className="w-full h-2 border border-black mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(activity.current / activity.goal) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                  className="h-full bg-black"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

