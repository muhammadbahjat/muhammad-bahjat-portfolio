"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ScrollingSkills from "./components/ScrollingSkills";
import Projects from "./projects/page";
import Chatbot from "./chatbot/page";
import { Code2, Brain, Cpu, Rocket } from "lucide-react";

export default function Home() {
  const [showHireOptions, setShowHireOptions] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="space-y-16">
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16"
      >
        <Image
          src="/5.jpg"
          alt="Syed Muhammad Bahjat"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Muhammad Bahjat</h1>
        <p className="text-lg md:text-xl mb-4">AI Engineer | Generative AI & LangChain Expert</p>
        
        {/* Buttons Container */}
        <div className="relative inline-block space-x-4">
          {/* Hire Me Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => setShowHireOptions(!showHireOptions)}
          >
            Hire Me
          </motion.button>

          {/* Get My Resume Button */}
          <motion.a
            href="/Bahjat-CV.pdf" // Ensure your resume is inside `/public/`
            download="Muhammad_Bahjat_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors cursor-pointer"
          >
            Get My Resume
          </motion.a>

          {/* Dropdown Options */}
          {showHireOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10"
            >
              <a
                href="https://wa.me/923354615591"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Connect via WhatsApp
              </a>
              <a
                href="mailto:syedmbahjat848@gmail.com"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Connect via Email
              </a>
            </motion.div>
          )}
        </div>
      </motion.section>

      <ScrollingSkills />
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center relative"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold">AI Expertise</h3>
            </div>
            <p className="text-sm md:text-base">
              I am <b>Muhammad Bahjat</b>, an <b>AI Engineer & Automation Developer</b> with expertise in <b>machine learning, deep learning, and AI-driven automation</b>. I specialize in <b>agentic AI systems</b>, real estate automation, and <b>end-to-end AI development</b>.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-semibold">Technical Skills</h3>
            </div>
            <p className="text-sm md:text-base">
              With hands-on experience in <b>LangChain, CrewAI, FastAPI, TensorFlow, and VectorDB</b>, I build AI agents that <b>enhance business efficiency, optimize workflows, and automate real-world processes</b>.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold">Development Focus</h3>
            </div>
            <p className="text-sm md:text-base">
              My work spans <b>chatbots, predictive analytics, and intelligent automation</b> solutions. I focus on creating scalable and efficient AI systems that solve real-world problems.
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-semibold">Innovation Drive</h3>
            </div>
            <p className="text-sm md:text-base">
              Whether it's <b>AI research, full-stack development, or automation engineering</b>, I am always eager to push the limits of AI innovation. 🚀
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <span className="inline-block px-4 py-2 bg-blue-800/10 rounded-full text-blue-700 text-sm font-medium">
            Open to exciting AI and automation projects – Connect Now!
          </span>
        </motion.div>
      </motion.section>

      <section id="projects" className="pt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Awesome Projects</h2>
        <Projects />
      </section>

      <section id="chatbot" className="pt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Who is Bahjat? Ask My AI!</h2>
        <Chatbot />
      </section>
    </div>
  );
}
