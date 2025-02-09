"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Moon, Sun, Menu, Linkedin, GitlabIcon as GitHub } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (darkMode: boolean) => void }) => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "chatbot"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-4 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Left Side - Logo & Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          {/* Small Image Logo */}
          <Image src="/2.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
          
          <Link href="/" className="text-xl md:text-2xl font-bold">
            Muhammad Bahjat
          </Link>
        </motion.div>

        {/* Center - Social Links */}
        <div className="hidden md:flex items-center space-x-6">
          <motion.a
            href="https://www.linkedin.com/in/muhammadbahjat/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={28} />
          </motion.a>
          <motion.a
            href="https://github.com/muhammadbahjat"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <GitHub size={28} />
          </motion.a>
        </div>

        {/* Right Side - Navigation & Dark Mode */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button className="md:hidden mr-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>

          {/* Navigation Links */}
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent md:space-x-6 items-center p-4 md:p-0`}
          >
            {[
              { name: "Home", path: "/" },
              { name: "Projects", path: "/#projects" },
              { name: "Chatbot", path: "/#chatbot" },
            ].map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative py-2 md:py-0 cursor-pointer"
              >
                <a
                  href={item.path}
                  className={`hover:text-gray-400 transition-colors ${
                    activeSection === item.name.toLowerCase() ? "text-blue-500 font-semibold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.name === "Home") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      scrollToSection(item.name.toLowerCase());
                    }
                  }}
                >
                  {item.name}
                </a>
                {activeSection === item.name.toLowerCase() && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400"
                    layoutId="underline"
                  />
                )}
              </motion.li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 ml-4"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
