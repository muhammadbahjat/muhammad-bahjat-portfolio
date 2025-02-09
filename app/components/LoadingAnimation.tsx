"use client";

import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Glowing Particle Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          scale: [1, 1.2, 1.5, 1.2, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full shadow-lg"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(5px)",
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      {/* Main Text Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-widest"
        >
          🚀 Building the Future with AI...
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-gray-300 mt-4 text-xl md:text-2xl"
        >
          Crafting intelligent automation, one algorithm at a time.
        </motion.p>

        {/* Animated Circular Loader */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full mx-auto mt-8"
        />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
