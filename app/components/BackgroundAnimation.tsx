"use client"

import { motion } from "framer-motion"

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-900 dark:to-purple-900"
        animate={{
          background: [
            "linear-gradient(to bottom right, #60A5FA, #A78BFA)",
            "linear-gradient(to bottom right, #34D399, #60A5FA)",
            "linear-gradient(to bottom right, #F472B6, #60A5FA)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white dark:bg-gray-800 opacity-20"
          style={{
            width: Math.random() * 100 + 10,
            height: Math.random() * 100 + 10,
          }}
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundAnimation

