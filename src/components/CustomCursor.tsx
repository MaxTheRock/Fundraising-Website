"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", mouseMove)
    document.documentElement.style.cursor = "none" // Hide system cursor everywhere

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.documentElement.style.cursor = "default"
    }
  }, [])

  return (
    <motion.div
      className="custom-cursor"
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.1 }} // Smooth movement
    />
  )
}
