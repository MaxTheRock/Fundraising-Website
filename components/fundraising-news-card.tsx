"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"

type ActivityType = "biking" | "swimming" | "walking"

interface NewsItem {
  title: string
  description: string
  imageUrl: string
  activityType: ActivityType
  updatedAt: Date // Changed this to Date
}

interface DonationInfo {
  name: string
  amount: number
  message: string
}

export default function FundraisingNewsCard() {
  const [isOpen, setIsOpen] = useState(true) // Set initial state to true
  const [lastUpdated, setLastUpdated] = useState<string>()

  // Sample data - replace with actual data from your source
  const latestNews: NewsItem = {
    title: "Part of WYCR!",
    description: "Max just completed part of the West Yorkshire Cycle Route totaling 27.53km!",
    imageUrl: "/images/facebook/image15.jpeg",
    activityType: "biking",
    updatedAt: new Date(2025, 3, 27, 9, 56, 0)  // (year, month-1, day, hours, minutes, seconds)
  }

  const latestDonation: DonationInfo = {
    name: "Grandpa",
    amount: 20,
    message: "",
  }

  const activityColors: Record<ActivityType, string> = {
    biking: "#D3D3D3", // Color for BIKING
    swimming: "#A7C7E7", // Color for SWIMMING
    walking: "#B6D7A8", // Color for WALKING
  }

  useEffect(() => {
    const updateLastUpdated = () => {
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - latestNews.updatedAt.getTime()) / 1000)

      if (diffInSeconds < 60) {
        setLastUpdated(`Updated ${diffInSeconds} seconds ago`)
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        setLastUpdated(`Updated ${minutes} minutes ago`)
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        setLastUpdated(`Updated ${hours} hours ago`)
      } else if (diffInSeconds < 2592000) { // 30 days approx
        const days = Math.floor(diffInSeconds / 86400)
        setLastUpdated(`Updated ${days} days ago`)
      } else if (diffInSeconds < 31536000) { // 12 months approx
        const months = Math.floor(diffInSeconds / 2592000)
        setLastUpdated(`Updated ${months} months ago`)
      } else {
        const years = Math.floor(diffInSeconds / 31536000)
        setLastUpdated(`Updated ${years} years ago`)
      }
    }

    updateLastUpdated()
    const timer = setInterval(updateLastUpdated, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [latestNews.updatedAt])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`fixed left-0 top-1/4 z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative flex">
        {/* Main content box */}
        <div className="w-80 overflow-hidden rounded-r-2xl bg-white shadow-lg">
          <div className="p-4">
            <h2 className="mb-2 text-lg font-bold">Latest News</h2>
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={latestNews.imageUrl || "/placeholder.svg"}
                alt={latestNews.title}
                width={300}
                height={200}
                className="h-40 w-full object-cover"
              />
              <div
                className="p-2"
                style={{ backgroundColor: activityColors[latestNews.activityType] }}
              >
                <h3 className="font-semibold text-black">{latestNews.title}</h3>
                <p className="text-sm text-black">{latestNews.description}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="mb-1 text-sm font-semibold">Latest Donation</h3>
              <p className="text-sm">
                {latestDonation.name} donated £{latestDonation.amount}
              </p>
              <p className="text-xs italic text-gray-600">"{latestDonation.message}"</p>
            </div>
            <div className="text-center">
              <a
                href="https://myaa.african-adventures.co.uk/fundraising/9452-maximilian-misiurski/1768/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
              >
                Donate Now
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-2">
            <p className="text-xs text-gray-500">{lastUpdated || ''}</p>
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-6 top-1/2 flex h-12 w-6 -translate-y-1/2 items-center justify-center rounded-r-md bg-black text-white"
          aria-label={isOpen ? "Close news update" : "Open news update"}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  )
}
