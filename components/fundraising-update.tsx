"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function FundraisingUpdateBox() {
  const [isOpen, setIsOpen] = useState(false)

  // Sample data - replace with actual data from your fundraising source
  const fundraisingData = {
    currentAmount: 235,
    goalAmount: 2184,
    recentDonation: {
      name: "Anonymous",
      amount: 50,
      message: "Keep up the great work!",
    },
    percentComplete: 8,
  }

  return (
    <div
      className={`fixed left-0 top-1/4 z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%-2rem)]"}`}
    >
      <div className="relative flex">
        {/* Main content box */}
        <div className="w-64 rounded-r-2xl bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-lg font-bold">Fundraising Progress</h2>
          <div className="mb-4">
            <div className="mb-1 flex justify-between text-sm">
              <span>£{fundraisingData.currentAmount}</span>
              <span>£{fundraisingData.goalAmount}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-blue-500" style={{ width: `${fundraisingData.percentComplete}%` }}></div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="mb-1 text-sm font-semibold">Latest Donation</h3>
            <p className="text-sm">
              {fundraisingData.recentDonation.name} donated £{fundraisingData.recentDonation.amount}
            </p>
            <p className="text-xs italic text-gray-600">"{fundraisingData.recentDonation.message}"</p>
          </div>
          <div className="text-center">
            <button className="rounded bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800">
              Donate Now
            </button>
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-6 top-1/2 flex h-12 w-6 -translate-y-1/2 items-center justify-center rounded-r-md bg-black text-white"
          aria-label={isOpen ? "Close fundraising update" : "Open fundraising update"}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  )
}

