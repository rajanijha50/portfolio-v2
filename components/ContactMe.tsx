//ContactMe.tsx

import React, { useState } from "react";
import { motion } from "motion/react";
import { FiSend, FiCheckCircle, FiAlertCircle, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";

const ContactMe = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  
  type StatusType = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<StatusType>("idle");
  const [message, setMessage] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !desc.trim()) return;

    setStatus("loading");
    setMessage("Sending your message...");

    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", desc);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Thank you! Your message has been sent.");
        setName("");
        setEmail("");
        setDesc("");
        
        // Reset status after a few seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log("Error submitting form", error);
      setStatus("error");
      setMessage("Failed to send message. Please check your connection.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-linear-to-b from-transparent to-black/5 dark:to-white/5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-md h-md bg-indigo-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ">
            Let's <span className="text-primary font-bold">Connect</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind, a question, or just want to say hi? I'd love to hear from you. Drop a message below!
          </p>
        </motion.div>

        <motion.div 
          className="mx-auto max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <form 
            onSubmit={handleFormSubmit} 
            className="p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-border dark:border-border"
          >
            <motion.div variants={{itemVariants}} className="mb-6 relative group">
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 ml-1">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiUser size={18} />
                </div>
                <input 
                  id="name" 
                  type="text" 
                  placeholder="Rajani Ranjan Jha" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  disabled={status === "loading"}
                />
              </div>
            </motion.div>

            <motion.div variants={{itemVariants}} className="mb-6 relative group">
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 ml-1">
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiMail size={18} />
                </div>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="rajanijha50@gmail.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  disabled={status === "loading"}
                />
              </div>
            </motion.div>

            <motion.div variants={{itemVariants}} className="mb-8 relative group">
              <label htmlFor="desc" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 ml-1">
                Message
              </label>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiMessageSquare size={18} />
                </div>
                <textarea 
                  id="desc" 
                  placeholder="Hello, I'd like to talk about..." 
                  rows={5}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 resize-none"
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                  required 
                  disabled={status === "loading"}
                />
              </div>
            </motion.div>

            <motion.div variants={{itemVariants}} className="flex flex-col items-center">
              <motion.button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full relative overflow-hidden flex items-center justify-center gap-2 py-4 px-8 rounded-2xl text-white font-semibold transition-all duration-300 shadow-md ${
                  status === "success" 
                    ? "bg-green-500 hover:bg-green-600 shadow-green-500/30" 
                    : status === "error"
                    ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                    : "bg-primary hover:bg-primary/90 shadow-primary/30"
                } disabled:opacity-80 disabled:cursor-not-allowed`}
              >
                {status === "idle" && (
                  <>
                    <span>Send Message</span>
                    <FiSend size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {status === "loading" && (
                  <>
                    <BiLoaderAlt size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                )}
                {status === "success" && (
                  <>
                    <FiCheckCircle size={18} />
                    <span>Sent Successfully</span>
                  </>
                )}
                {status === "error" && (
                  <>
                    <FiAlertCircle size={18} />
                    <span>Try Again</span>
                  </>
                )}
              </motion.button>
              
              {message && status !== "idle" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 ${
                    status === "success" 
                      ? "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/20" 
                      : status === "error"
                      ? "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-900/20"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {status === "success" ? <FiCheckCircle size={16} /> : status === "error" ? <FiAlertCircle size={16} /> : null}
                  {message}
                </motion.div>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;