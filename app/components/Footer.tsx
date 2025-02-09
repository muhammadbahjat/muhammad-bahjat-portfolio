import { motion } from "framer-motion"
import Link from "next/link"

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-transparent text-gray-600 dark:text-gray-300 py-4 text-center relative z-10"
    >
      <p className="text-sm">
        ©️ Portfolio by{" "}
        <span className="font-semibold text-blue-500 dark:text-blue-800">
          Muhammad Bahjat
        </span>{" "}
        |{" "}
        <Link 

          href="https://www.linkedin.com/in/muhammadbahjat/" 
          target="_blank" 
          className="text-blue-500 hover:text-blue-600 dark:text-blue-800 dark:hover:text-blue-800"
        >
          LinkedIn
        </Link>{" "}
        |{" "}
        <Link 
          href="https://github.com/muhammadbahjat" 
          target="_blank"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-800 dark:hover:text-blue-800"
        >
          GitHub
        </Link>
      </p>
    </motion.footer>
  )
}

export default Footer