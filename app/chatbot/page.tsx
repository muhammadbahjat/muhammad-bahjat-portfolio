"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCw, Loader2, Bot, User, Sparkles } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ id: string; content: string; role: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [sessionId, setSessionId] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize sessionId on component mount
  useEffect(() => {
    const newSessionId = Date.now().toString();
    setSessionId(newSessionId);
    
    const storedSessionId = sessionStorage.getItem("bahjat_session_id");
    const storedMessages = sessionStorage.getItem("bahjat_session");
    
    if (storedSessionId === newSessionId && storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save messages with session
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    sessionStorage.setItem("bahjat_session", JSON.stringify(messages));
    sessionStorage.setItem("bahjat_session_id", sessionId);
  }, [messages, sessionId]);

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    setIsLoading(true);
    setShowOptions(false);

    const newMessages = [
      ...messages,
      { id: Date.now().toString(), content: message, role: "user" as const },
    ];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message,
          sessionId,
          history: messages.map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content
          }))
        }),
      });

      const data = await response.json();
      
      if (data.response) {
        setMessages([
          ...newMessages,
          { 
            id: Date.now().toString(), 
            content: data.response,
            role: "bot" 
          }
        ]);
      } else if (data.error) {
        setMessages([
          ...newMessages,
          { 
            id: Date.now().toString(), 
            content: "Error: " + data.error,
            role: "bot" 
          }
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        { 
          id: Date.now().toString(), 
          content: "Error connecting to AI service.",
          role: "bot" 
        }
      ]);
    }

    setIsLoading(false);
  };

  const startNewChat = () => {
    setMessages([]);
    setSessionId(Date.now().toString());
    sessionStorage.removeItem("bahjat_session");
    sessionStorage.removeItem("bahjat_session_id");
    setShowOptions(true);
  };

  return (
    <div className="max-w-3xl mx-auto text-gray-800 dark:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bot className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-medium">AI Assistant</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-800">
          Powered by Gemini AI. Ask anything about Muhammad Bahjat!
        </p>
        <p className="text-xs text-red-800 dark:text-red-800 mt-1">
          Note: Using free API quota - responses may be unavailable if quota is exceeded
        </p>
      </motion.div>

      <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-lg p-4 md:p-6 mb-4 h-[500px] overflow-y-auto relative" ref={chatContainerRef}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-blue-500" : "bg-purple-500"
                }`}>
                  {message.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={`p-3 ${
                  message.role === "user" 
                    ? "bg-blue-500 text-white rounded-tl-2xl rounded-tr-none rounded-bl-2xl rounded-br-2xl" 
                    : "bg-gray-100 dark:bg-gray-700 rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
                }`}>
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mt-4"
          >
            {[
              "Tell me about your AI projects",
              "How many years of experience do you have?",
              "Tell me about Yourself",
              "Are You open to Relocate?",
              "How can I contact You?",
            ].map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(option)}
                className="bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-all text-sm font-medium flex items-center gap-2"
              >
                <Sparkles size={14} />
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 absolute bottom-4 left-4"
          >
            <Loader2 className="animate-spin" size={16} />
            <span className="text-sm">AI is thinking...</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
        <motion.input 
          whileFocus={{ scale: 1.01 }}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask about Bahjat..." 
          className="flex-grow px-4 py-3 rounded-xl border border-gray-400 dark:border-gray-800 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg 
          placeholder:text-gray-700 dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-800 shadow-lg"
        />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="bg-blue-500 text-white p-3 rounded-xl shadow-lg hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </motion.button>
        </form>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startNewChat} 
          className="w-full bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
        >
          <RotateCw size={16} />
          <span>Start New Chat</span>
        </motion.button>
      </div>
    </div>
  );
}
