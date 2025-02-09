"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import LoadingAnimation from "./LoadingAnimation"
import BackgroundAnimation from "./BackgroundAnimation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={darkMode ? "dark" : ""}>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <BackgroundAnimation />
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
            {children}
          </main>
          <Footer />
        </>
      )}
    </div>
  )
} 