"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LoadingAnimation from "./components/LoadingAnimation"
import BackgroundAnimation from "./components/BackgroundAnimation"
import type React from "react"
import { useState, useEffect } from "react"
import Head from "next/head"

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
    }, 4000) // 4 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <Head>
        <title>Muhammad Bahjat - Portfolio</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"
        />
      </Head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
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

