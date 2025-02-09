"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const skills = [
  "Machine Learning",
  "Generative AI",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Multi-Agent Systems",
  "Agentic Solutions",
  "Neural Networks",
  "Langchain Agents",
  "Orchestration",
  "LangChain",
  "CrewAI",
  "TensorFlow",
  "PyTorch",
  "OpenAI",
  "Retell AI",
  "Gemini",
  "Claude",
  "Llama",
  "Deepseek",
  "HuggingFace",
  "Bland AI",
  "Agno",
  "Google Cloud Platform",
  "VectorDB",
  "Python",
  "JavaScript",
  "TypeScript",
  "C++",
  "SQL",
  "HTML & CSS",
  "FastAPI",
  "Flask",
  "Django",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Heroku",
  "Docker",
  "BeautifulSoup",
  "Playwright",
  "Pandas",
  "NumPy",
  "Scikit-Learn",
  "Git & GitHub",
  "AI Automation",
];

const ScrollingSkills = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setScrollWidth(containerRef.current.scrollWidth);
    }
  }, []);

  const startAnimation = () => {
    controls.start({
      x: [0, -scrollWidth / 2],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 45,
          ease: "linear"
        },
      },
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startAnimation();
  };

  useEffect(() => {
    startAnimation();
  }, [scrollWidth]);

  return (
    <div
      className="overflow-hidden py-4 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <motion.div
        className="flex space-x-8 whitespace-nowrap"
        animate={controls}
      >
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className={`bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-4 py-2 rounded-full transition-transform ${
              isHovered ? "hover:scale-110" : ""
            }`}
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingSkills;
