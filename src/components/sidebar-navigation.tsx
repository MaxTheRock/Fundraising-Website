"use client"

import { useState } from "react"
import { Menu, X, ChevronRight, Twitter, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-sm transition-all hover:bg-black/90 focus:outline-none lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed left-0 top-0 z-40 flex h-full w-[300px] transform flex-col bg-black/80 p-8 text-white backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Area */}
        <div className="mb-12 mt-4">
          <h1 className="text-2xl font-bold">Max's African Adventure</h1>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1">
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-neutral-400">ACTIVITIES</h2>
            <ul className="space-y-3">
              {["Swimming", "Walking", "Biking"].map((activity) => (
                <li key={activity}>
                  <Link
                    href={`#${activity.toLowerCase()}`}
                    className="group flex items-center text-lg transition-colors hover:text-blue-200"
                  >
                    {activity}
                    <ChevronRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-neutral-400">INFORMATION</h2>
            <ul className="space-y-3">
              {["About the Challenge", "How to Participate", "Fundraising Goals", "Support Team"].map((item) => (
                <li key={item}>
                  <Link href="#" className="group flex items-center text-lg transition-colors hover:text-blue-200">
                    {item}
                    <ChevronRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-neutral-400">PROGRESS</h2>
            <ul className="space-y-3">
              {["Current Status", "Milestones", "Leaderboard", "Activity Log"].map((item) => (
                <li key={item}>
                  <Link href="#" className="group flex items-center text-lg transition-colors hover:text-blue-200">
                    {item}
                    <ChevronRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex space-x-4">
            <Link href="#" className="text-white/70 transition-colors hover:text-blue-200" aria-label="Twitter">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-white/70 transition-colors hover:text-blue-200" aria-label="Instagram">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-white/70 transition-colors hover:text-blue-200" aria-label="Facebook">
              <Facebook size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}

