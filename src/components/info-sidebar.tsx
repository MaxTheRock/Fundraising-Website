"use client"

import { useState } from "react"
import { X, Info } from "lucide-react"

export default function InfoSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 md:hidden"
        aria-label={isOpen ? "Close information" : "Open information"}
      >
        {isOpen ? <X size={24} /> : <Info size={24} />}
      </button>

      {/* Info Box - Mobile slide-in, Desktop permanent */}
      <div
        className={`fixed left-0 top-0 z-40 h-full w-full max-w-sm transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="md:sticky md:top-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Information</h2>

          {/* Sample content - customize as needed */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">About the Challenge</h3>
              <p className="text-neutral-600">
                Join Max's African Adventure as we raise funds through swimming, walking, and biking challenges.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">How to Participate</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Choose your activity</li>
                <li>• Set your distance goal</li>
                <li>• Track your progress</li>
                <li>• Share your journey</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Contact</h3>
              <p className="text-neutral-600">Have questions? Reach out to us at support@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  )
}

