"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Nvidia Memory Agent",
    description:
      "An AI-powered agent that leverages Nvidia's secure memory encryption for confidential prompt handling.",
    details:
      "This project focuses on developing AI memory agents that can store, retrieve, and process encrypted user queries without exposing sensitive data. Using Nvidia's encryption technology, it ensures secure AI-human interactions by keeping prompts confidential while enabling accurate responses.",
    skills: ["Nvidia AI", "Memory Encryption", "Secure Prompt Processing", "Python", "LangChain"],
    videoUrl: "/videos/nvidia-agent.mp4",
  },
  {
    id: 2,
    title: "LangChain Orchestration Agent",
    description:
      "A multi-agent AI system designed to autonomously gather information, analyze documents, and retrieve personal data.",
    details:
      "This AI agent is powered by LangChain and CrewAI, coordinating multiple specialized agents to efficiently search the web, extract structured data, and analyze user documents. It is particularly useful for knowledge retrieval and automated research applications.",
    skills: ["LangChain", "CrewAI", "Retrieval-Augmented Generation (RAG)", "Python", "AI Orchestration"],
    videoUrl: "/videos/langchain-agent.mp4",
  },
  {
    id: 3,
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
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef(null);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: [0, -2000],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        },
      });
    }
  }, [controls, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      x: [0, -2000],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        },
      },
    });
  };

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowVideo(false);
      }
    };

    if (showVideo) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showVideo]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="overflow-hidden py-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div className="flex space-x-8" animate={controls} style={{ width: `${projects.length * 100}%` }}>
          {projects.concat(projects).map((project, index) => (
            <div key={`${project.id}-${index}`} className="w-full md:w-1/2 lg:w-1/3 px-4">
              <motion.div
                className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm mb-2">{project.description}</p>
                <p className="text-xs mb-4 text-gray-1000">{project.details}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 dark:bg-blue-600 text-blue-500 dark:text-blue-100 px-4 py-2 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                {project.videoUrl ? (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
                  >
                    Watch Project Video
                    <ExternalLink size={16} className="ml-2" />
                  </button>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
                  >
                    Visit Website
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                )}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pop-up Video Modal with External Close Button */}
      {showVideo && projects[currentProject].videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-8 right-10 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
            style={{ marginTop: "60px" }}
          >
            <X size={24} />
          </button>
          <div className="max-w-4xl w-full px-6">
            <video controls className="w-full rounded-lg shadow-lg">
              <source src={projects[currentProject].videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
