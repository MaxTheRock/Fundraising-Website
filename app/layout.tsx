import type { Metadata } from 'next'
import './globals.css'
import FundraisingNewsCard from "@/components/fundraising-news-card"

export const metadata: Metadata = {
  title: "Max's African Adventures",
  description: 'A website to show the progress of Max',
  generator: 'MaxTheCoder',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <FundraisingNewsCard />
      <body>{children}</body>
    </html>
  )
}
