"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LoadingAnimation from "./components/LoadingAnimation"
import BackgroundAnimation from "./components/BackgroundAnimation"
import type React from "react"
import { useState, useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <BackgroundAnimation />
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  )
}

