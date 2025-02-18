"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/Header"
import ProgressChart from "@/components/ProgressChart"
import FundraisingProgress from "@/components/FundraisingProgress"
import JourneyPage from "@/components/JourneyPage"
import AboutPage from "@/components/AboutPage"
import CustomCursor from "@/components/CustomCursor"
import Navigation from "@/components/Navigation"
import FloatingElements from "@/components/FloatingElements"
import { Button } from "@/components/ui/button"
import { Share2, DollarSign } from "lucide-react"
import FacebookImagesPage from "@/components/FacebookImagesPage"
import { progressValues } from "@/src/config/progressConfig"
import CoinCollector from "@/components/Coins"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home")

  const activities = progressValues.activities
  const { currentAmount, targetAmount } = progressValues.fundraising

  // Disable scroll when not on the home page
  useEffect(() => {
    if (currentPage !== "home") {
      document.body.style.overflow = "auto"
    } else {
      document.body.style.overflow = "idden"
      window.scrollTo(0, document.body.scrollHeight);
    }

    // Clean up: re-enable scroll on component unmount or page change
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [currentPage])

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

  const nextPage = () => {
    setCurrentPage((prev) => 
      prev === "home" ? "journey" : 
      prev === "journey" ? "about" : 
      prev === "about" ? "facebook" : "home")
  }

  const prevPage = () => {
    setCurrentPage((prev) => 
      prev === "facebook" ? "about" : 
      prev === "about" ? "journey" : 
      prev === "journey" ? "home" : "facebook")
  }

  const handleDonateClick = () => {
    window.location.href = "https://myaa.african-adventures.co.uk/fundraising/9452-maximilian-misiurski/1768/"
  }

  const handleShareClick = () => {
    const shareData = {
      title: 'Share this page with your friends',
      text: 'Help Max raise funds for his trip to Africa!',
      url: 'https://bit.ly/maxs-african-adventure'
    }

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Successful share'))
        .catch((error) => console.error('Error sharing:', error))
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert("URL copied to clipboard!")
      }).catch(err => {
        console.error("Failed to copy: ", err)
      })
    }
  }

  return (
    <main className="min-h-screen w-full bg-white overflow-hidden relative flex flex-col px-4 md:px-6">
      <CustomCursor />
      <FloatingElements />
      <Header />
      <div className="absolute top-6 right-4 z-10 flex space-x-2 flex-wrap justify-end">
        <Button
          onClick={handleDonateClick}
          className="bg-black text-white rounded-full hover:bg-black/90 text-lg px-6 py-3 flex items-center md:text-sm md:px-5 md:py-2 sm:text-xs sm:px-3 sm:py-1"
        >
          <DollarSign className="mr-1 h-5 w-5 md:h-4 md:w-4 sm:h-3 sm:w-3" /> 
          <span className="hidden sm:inline md:inline">Donate</span>
        </Button>
        <Button
          onClick={handleShareClick}
          className="bg-black text-white rounded-full hover:bg-black/90 text-lg px-6 py-3 flex items-center md:text-sm md:px-5 md:py-2 sm:text-xs sm:px-3 sm:py-1"
        >
          <Share2 className="mr-1 h-5 w-5 md:h-4 md:w-4 sm:h-3 sm:w-3" /> 
          <span className="hidden sm:inline md:inline">Share</span>
        </Button>
      </div>
      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.div
            key="main"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="flex-grow flex flex-col justify-center items-center px-4 md:px-8"
          >
            <h1 className="text-2xl md:text-3xl font-black text-center mb-5">
              Goal: Travel distance of largest river in the UK
            </h1>
            <div className="w-full max-w-screen-sm">
              <FundraisingProgress current={currentAmount} goal={targetAmount} />
            </div>
            <div className="mb-20 w-full max-w-screen-sm">
              <ProgressChart activities={activities} />
            </div>
          </motion.div>
        )}
        {currentPage === "journey" && <JourneyPage activities={activities} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "facebook" && <FacebookImagesPage />}
      </AnimatePresence>
      <Navigation onNext={nextPage} onPrev={prevPage} />
      <CoinCollector />
    </main>
  )
}
