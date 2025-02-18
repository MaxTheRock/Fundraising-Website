"use client"

import React from 'react';
import { motion } from "framer-motion"

const AboutPage: React.FC = () => {
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
        ABOUT ME
      </motion.h2>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 max-w-2xl text-center"
      >
        <p className="text-sm sm:text-base">
          Hi there! I'm Max, and I'm on a mission to make a difference through fitness and fundraising.
        </p>
        <p className="text-sm sm:text-base">
          I've always been passionate about staying active and helping others. That's why I decided to combine these two
          loves into this fundraising campaign.
        </p>
        <p className="text-sm sm:text-base">
          Through swimming, walking, and biking, I'm not just improving my own health, but also raising to help people in Africa.
        </p>
        <p className="text-sm sm:text-base">
          Every kilometer I cover brings us one step closer to our goal. Your support means the world to me and to those
          who will benefit from our collective efforts.
        </p>
      </motion.div>
    </motion.div>
  )
};

export default AboutPage;

