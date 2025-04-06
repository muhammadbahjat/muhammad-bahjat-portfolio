"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "WhatsApp AI Agent Chatbot",
    description:
      "An AI-powered chatbot integrated with WhatsApp using Twilio and Gemini, capable of smart conversations and task automation for teams.",
    details:
      "This project centers around building an intelligent WhatsApp AI agent using Twilio, Google's Gemini, and LangChain. The agent maintains context through chat history, enabling it to understand ongoing conversations and provide coherent responses. Its core strength lies in seamless integration with platforms like Jira to automate workflows — including ticket creation, task assignment, and real-time project updates. It acts as a smart assistant for team leads and managers to monitor progress and streamline communication.",
    skills: ["Twilio", "Gemini", "LangChain", "Python", "Chat History", "Jira Integration", "Web Search","Youtube Video Summarization", "AI Automation"],
    videoUrl: "/videos/Whatsapp-Assistant.mp4",
  },
  {
    id: 2,
    title: "Nvidia Memory Agent",
    description:
      "An AI-powered agent that leverages Nvidia's secure memory encryption for confidential prompt handling.",
    details:
      "This project focuses on developing AI memory agents that can store, retrieve, and process encrypted user queries without exposing sensitive data. Using Nvidia's encryption technology, it ensures secure AI-human interactions by keeping prompts confidential while enabling accurate responses.",
    skills: ["Nvidia AI", "Memory Encryption", "Secure Prompt Processing", "Python", "LangChain"],
    videoUrl: "/videos/nvidia-agent.mp4",
  },
  {
    id: 3,
    title: "Web Scraping Agent",
    description:
      "An AI-powered browser automation agent capable of scraping, searching, and interacting with websites undetectably.",
    details:
      "This project involves building a smart web scraping agent that uses browser automation to search, extract data, fill out forms, and navigate complex websites. Equipped with proxy support, the agent can bypass detection mechanisms and remain undetectable during scraping operations. It also integrates CAPTCHA-solving services to handle verification challenges automatically. Designed for robust deployment, the agent can operate in headless environments—even in cases where traditional headless setups are blocked—leveraging my experience in deploying resilient scrapers under such constraints.",
    skills: ["Browser Automation", "Web Scraping", "Proxy Rotation", "CAPTCHA Solving", "Python", "Headless Deployment", "LangChain"],
    videoUrl: "/videos/WEB-UI.mp4",
  },
  {
    id: 4,
    title: "LangChain Orchestration Agent",
    description:
      "A multi-agent AI system designed to autonomously gather information, analyze documents, and retrieve personal data.",
    details:
      "This AI agent is powered by LangChain and CrewAI, coordinating multiple specialized agents to efficiently search the web, extract structured data, and analyze user documents. It is particularly useful for knowledge retrieval and automated research applications.",
    skills: ["LangChain", "CrewAI", "Retrieval-Augmented Generation (RAG)", "Python", "AI Orchestration"],
    videoUrl: "/videos/langchain-agent.mp4",
  },
  {
    id: 5,
    title: "Food Ordering Website",
    description:
      "An interactive food ordering platform that streamlines restaurant operations by integrating a robotic waiter for food delivery.",
    details:
      "Food Ordering & Delivery System – A web-based restaurant platform where customers place orders online via a Django RESTful API. A robotic waiter then autonomously picks up meals from the kitchen and delivers them to tables, enhancing efficiency and reducing manual labor.",
    skills: ["React.js", "Django", "RESTful API", "Robotics", "LiDAR", "SLAM", "Raspberry Pi", "ROS"],
    link: "https://web-project-nine-alpha.vercel.app/"
  },  
];

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const autoPlayInterval = useRef<NodeJS.Timeout>();

  const nextProject = () => {
    setDirection(1);
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(nextProject, 8000);
    } else {
      clearInterval(autoPlayInterval.current);
    }
    return () => clearInterval(autoPlayInterval.current);
  }, [isAutoPlaying]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 2000 : -2000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 2000 : -2000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-teal-400 via-blue-400 to-blue-600">
      <div className="relative min-h-screen">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentProject}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 30 },
              opacity: { duration: 0.8 }
            }}
            className="absolute inset-0 w-full"
          >
            <div className="container mx-auto px-4 py-16 h-full">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 h-full">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-4xl font-bold mb-6 text-white/90">
                    {projects[currentProject].title}
                  </h3>
                  
                  <p className="text-xl text-white/80 mb-4">
                    {projects[currentProject].description}
                  </p>
                  
                  <p className="text-base text-white/70 mb-8">
                    {projects[currentProject].details}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {projects[currentProject].skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/20 text-white px-4 py-2 rounded-full text-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {projects[currentProject].videoUrl ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowVideo(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      Watch Demo
                      <ExternalLink size={20} />
                    </motion.button>
                  ) : (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={projects[currentProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors inline-block"
                    >
                      Visit Project
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
          <button
            onClick={prevProject}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          
          <div className="flex gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentProject ? 1 : -1);
                  setCurrentProject(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentProject 
                    ? "bg-white" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextProject}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && projects[currentProject].videoUrl && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-8 right-8 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="max-w-4xl w-full px-6">
            <video controls className="w-full rounded-xl shadow-2xl">
              <source src={projects[currentProject].videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
