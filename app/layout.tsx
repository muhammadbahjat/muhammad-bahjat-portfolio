import "./globals.css"
import { Inter } from "next/font/google"
import ClientLayout from "./components/ClientLayout"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

// Remove "use client" directive and move metadata to a separate file
export const metadata = {
  title: 'Muhammad Bahjat - Portfolio',
  description: 'AI Engineer & Automation Developer Portfolio',
  icons: {
    icon: '/icons8-ai-96 (1).png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

