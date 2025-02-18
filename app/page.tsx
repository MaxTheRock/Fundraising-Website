"use client"

import { useState } from "react"
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

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home")

  const activities = progressValues.activities
  const { currentAmount, targetAmount } = progressValues.fundraising

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
    if (currentPage === "home") setCurrentPage("journey")
    else if (currentPage === "journey") setCurrentPage("about")
    else if (currentPage === "about") setCurrentPage("facebook")
    else setCurrentPage("home")
  }

  const prevPage = () => {
    if (currentPage === "facebook") setCurrentPage("about")
    else if (currentPage === "about") setCurrentPage("journey")
    else if (currentPage === "journey") setCurrentPage("home")
    else setCurrentPage("facebook")
  }

  const handleDonateClick = () => {
    window.location.href = "https://myaa.african-adventures.co.uk/fundraising/9452-maximilian-misiurski/1768/"
  }

  const handleShareClick = () => {
    const shareData = {
      title: 'Check this out!',
      text: 'Here is something interesting I found.',
      url: 'https://example.com/share'
    }

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Successful share'))
        .catch((error) => console.error('Error sharing:', error))
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert("URL copied to clipboard!")
      }).catch(err => {
        console.error("Failed to copy: ", err)
      })
    }
  }

  return (
    <main className="min-h-screen w-full bg-white overflow-hidden relative flex flex-col">
      <CustomCursor />
      <FloatingElements />
      <Header />
      <div className="absolute top-6 right-6 z-10 flex space-x-3">
        <Button
          onClick={handleDonateClick}
          className="bg-black text-white rounded-full hover:bg-black/90 text-base px-6 py-2"
        >
          <DollarSign className="mr-2 h-5 w-5" />
          Donate
        </Button>
        <Button
          onClick={handleShareClick}
          className="bg-black text-white rounded-full hover:bg-black/90 text-base px-6 py-2"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share
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
            className="flex-grow flex flex-col justify-center items-center px-6 md:px-8"
          >
            <div className="w-full max-w-2xl">
              <FundraisingProgress current={currentAmount} goal={targetAmount} />
            </div>
            <div className="mt-12 w-full max-w-2xl">
              <ProgressChart activities={activities} />
            </div>
          </motion.div>
        )}
        {currentPage === "journey" && <JourneyPage activities={activities} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "facebook" && <FacebookImagesPage />}
      </AnimatePresence>
      <Navigation onNext={nextPage} onPrev={prevPage} />
    </main>
  )
}

