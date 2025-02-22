'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Coin {
  id: string
  x: number
  y: number
}

interface FloatingText {
  id: string
  x: number
  y: number
  text: string
}

const SPAWN_INTERVAL = 35000 // New coin every 35 seconds
const MAX_COINS = 5
const COLLECTION_MESSAGES = [
  "Keep pedaling!",
  "Every click helps!",
  "You're making a difference!",
  "Miles for change!",
  "Africa thanks you!",
  "One step closer!",
  "Swim strong!",
  "Fundraising hero!",
  "Incredible effort!",
  "Inspiring journey!",
]

const coinImageUrl = "/images/coin.png";

export default function CoinCollector() {
  const [coins, setCoins] = React.useState<Coin[]>([])
  const [floatingTexts, setFloatingTexts] = React.useState<FloatingText[]>([])
  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  })

  // Update window size on resize (client-side only)
  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial window size
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Spawn coins periodically
  React.useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) {
      return // Don't spawn coins until window size is initialized
    }

    const interval = setInterval(() => {
      if (coins.length < MAX_COINS) {
        const newCoin: Coin = {
          id: Math.random().toString(36).substr(2, 9),
          x: Math.random() * (windowSize.width - 100) + 50, // Keep away from edges
          y: Math.random() * (windowSize.height - 100) + 50,
        }
        setCoins(prev => [...prev, newCoin])
      }
    }, SPAWN_INTERVAL)

    return () => clearInterval(interval)
  }, [coins, windowSize])

  const collectCoin = (coin: Coin) => {
    // Remove the coin
    setCoins(prev => prev.filter(c => c.id !== coin.id))

    // Add floating text
    const newText: FloatingText = {
      id: Math.random().toString(36).substr(2, 9),
      x: coin.x,
      y: coin.y,
      text: COLLECTION_MESSAGES[Math.floor(Math.random() * COLLECTION_MESSAGES.length)],
    }
    setFloatingTexts(prev => [...prev, newText])

    // Remove floating text after animation
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== newText.id))
    }, 1000)
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Coins */}
      <AnimatePresence>
        {coins.map(coin => (
          <motion.button
            key={coin.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.2 }}
            className={cn(
              "absolute pointer-events-auto cursor-pointer",
              "w-12 h-12", // Increased size
              "flex items-center justify-center",
              "shadow-lg",
              "rounded-full overflow-hidden" // Ensure image stays within the circle
            )}
            style={{
              left: coin.x,
              top: coin.y,
            }}
            onClick={() => collectCoin(coin)}
          >
            <img src={coinImageUrl} alt="Coin" className="block w-full h-full object-cover" />
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Floating Text */}
      <AnimatePresence>
        {floatingTexts.map(text => (
          <motion.div
            key={text.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -50 }}
            exit={{ opacity: 0 }}
            className="absolute text-primary font-bold pointer-events-none"
            style={{
              left: text.x,
              top: text.y,
            }}
          >
            {text.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
