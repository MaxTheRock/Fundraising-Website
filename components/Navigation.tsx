"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface NavigationProps {
  onNext: () => void
  onPrev: () => void
}

export default function Navigation({ onNext, onPrev }: NavigationProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const resetTimer = useCallback(() => {
    setShowTooltip(false)
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 5000)
    return timer
  }, [])

  useEffect(() => {
    let timer = resetTimer()

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
    const handleUserActivity = () => {
      clearTimeout(timer)
      timer = resetTimer()
    }

    events.forEach((event) => document.addEventListener(event, handleUserActivity))

    const handleResize = () => {
      setIsSmallScreen(window.innerHeight < 868)
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timer)
      events.forEach((event) => document.removeEventListener(event, handleUserActivity))
      window.removeEventListener("resize", handleResize)
    }
  }, [resetTimer])

  return (
    <div
      className={`fixed ${isSmallScreen ? "bottom-0 left-0 right-0" : "bottom-8 right-8"} flex flex-col items-end z-50`}
    >
      <AnimatePresence>
        {showTooltip && !isSmallScreen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-4 bg-[#FFEB3B] px-5 py-1 rounded-2xl relative text-black font-bold"
            style={{
              borderRadius: "1.5rem",
              paddingBottom: "0",
            }}
          >
            <div className="mb-1">CLICK ME!</div>
            <div className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-l-8 border-r-8 border-transparent border-t-[#FFEB3B]"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={`bg-white border-2 border-black ${isSmallScreen ? "rounded-t-xl w-full" : "rounded-xl"} p-4`}
        whileHover={isSmallScreen ? {} : { scale: 1.05 }}
      >
        <div className="text-sm font-bold mb-2 text-center">LET'S MOVE!</div>
        <div className={`flex gap-2 ${isSmallScreen ? "justify-center" : ""}`}>
          <button
            onClick={onPrev}
            className="border-2 border-black rounded-lg p-2 hover:bg-black hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            onClick={onNext}
            className="border-2 border-black rounded-lg p-2 hover:bg-black hover:text-white transition-colors"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

