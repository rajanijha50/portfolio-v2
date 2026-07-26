"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import CertificateCard from "@/components/CertificateCard";
import ContactMe from "@/components/ContactMe";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiRedux,
  SiExpress,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiBootstrap,
  SiVite,
  SiStrapi,
  SiWordpress,
  SiVercel,
  SiNetlify,
  SiRender,
  SiFastapi,
  SiFoodpanda,
  SiGit,
  SiPostman,
  SiSqlite,
  SiGithub,
  SiNodedotjs,
} from "react-icons/si";
import Footer from "@/components/Footer";

// Define structured data types
type Skill = {
  name: string;
  category:
    | "programming language"
    | "frontend"
    | "backend"
    // | "bundler"
    // | "Content Management System"
    | "deployment"
    | "other";
  level: number;
  url?: string;
  icon: React.ReactNode;
};

type Project = {
  mediaUrl?: string;
  title: string;
  description: string;
  githubUrl: string;
  level: "basic" | "intermediate" | "advanced";
  liveUrl?: string;
};

type Certificate = {
  mediaUrl?: string;
  name: string;
  description: string;
};

export default function Home() {
  const skills: Skill[] = [
    { name: "HTML", category: "frontend", level: 95, icon: <SiHtml5 /> },
    { name: "CSS", category: "frontend", level: 95, icon: <SiCss /> },
    {
      name: "reactJS",
      category: "frontend",
      level: 60,
      icon: <SiReact />,
    },
    {
      name: "nextJS",
      category: "frontend",
      level: 75,
      icon: <SiNextdotjs />,
    },
    {
      name: "redux toolkit",
      category: "frontend",
      level: 60,
      icon: <SiRedux />,
    },
    {
      name: "zustand",
      category: "frontend",
      level: 60,
      icon: <SiFoodpanda />,
    },
    {
      name: "tailwind CSS",
      category: "frontend",
      level: 90,
      icon: <SiTailwindcss />,
    },
    {
      name: "bootstrap",
      category: "frontend",
      level: 80,
      icon: <SiBootstrap />,
    },
    {
      name: "nodeJS",
      category: "backend",
      level: 80,
      icon: <SiNodedotjs />,
    },
    {
      name: "expressJS",
      category: "backend",
      level: 80,
      icon: <SiExpress />,
    },
    {
      name: "fastAPI",
      category: "backend",
      level: 80,
      icon: <SiFastapi />,
    },
    { name: "mongoDB", category: "backend", level: 75, icon: <SiMongodb /> },
    { name: "mySQL", category: "backend", level: 60, icon: <SiMysql /> },
    { name: "postgreSQL", category: "backend", level: 10, icon: <SiPostgresql /> },
    {
      name: "javascript",
      category: "programming language",
      level: 70,
      icon: <SiJavascript />,
    },
    {
      name: "typescript",
      category: "programming language",
      level: 50,
      icon: <SiTypescript />,
    },
    { name: "python", category: "programming language", level: 80, icon: <SiPython /> },
    { name: "vercel", category: "deployment", level: 95, icon: <SiVercel /> },
    { name: "netlify", category: "deployment", level: 95, icon: <SiNetlify /> },
    { name: "render", category: "deployment", level: 95, icon: <SiRender /> },
    { name: "git", category: "other", level: 60, icon: <SiGit /> },
    { name: "github", category: "other", level: 60, icon: <SiGithub /> },
    { name: "postman", category: "other", level: 60, icon: <SiPostman /> },

  ];

  const projects: Project[] = [
    // {
    //   title: "Chat Z",
    //   description:
    //     "A modern, real-time chat application built with Next.js 15, featuring seamless messaging, user authentication, and real-time communication powered by Socket.IO.",
    //   githubUrl: "https://github.com/rajanijha50/chat-app",
    //   level: "advanced",
    // },
    {
      title: "Web Hunter",
      description:
        "Web Hunter is a curated web directory with AI-assisted bulk curation via Groq + Google Sheets, fuzzy search, and a React Query-powered favorites system.",
      githubUrl: "https://github.com/rajanijha50/web-hunter",
      liveUrl: "https://webhunter.space/",
      level: "advanced",
    },
    {
      title: "Daily Dock",
      description:
        "Daily Dock is a modern, premium, and unified personal productivity dashboard and workspace. It integrates a Pomodoro timer, Kanban todo board, daily journaling, note-taking, real-time weather information, and login streak tracking into a single, cohesive experience.",
      githubUrl: "https://github.com/rajanijha50/daily-dock",
      liveUrl: "https://daily-dock24.vercel.app/",
      level: "advanced",
    },
    {
      title: "ADIS",
      description:
        "ADIS - Advanced Desktop Intelligence System, is a voice based assistant to automate your desktop. opening apps, automating browsers by just your voice command.",
      githubUrl: "https://github.com/rajanijha50/ADIS",
      level: "advanced",
    },
    {
      title: "Movie Master",
      description:
        "Movie Master is a modern web application designed for movie enthusiasts to discover, track, and review their favorite movies and TV shows. Built with Next.js and Tailwind CSS, it offers a sleek, responsive interface with dark mode support.",
      githubUrl: "https://github.com/rajanijha50/movie-master",
      liveUrl: "https://moviemaster11.vercel.app/",
      level: "advanced",
    },
    {
      title: "News App",
      description:
        "A modern news application built with Next.js that fetches and displays the latest news headlines from various categories using the NewsAPI.",
      githubUrl: "https://github.com/rajanijha50/news-app",
      level: "intermediate",
    },
    {
      title: "Quiz App",
      description:
        "An interactive quiz application built with React that leverages AI to generate dynamic questions and provide explanations.",
      githubUrl: "https://github.com/rajanijha50/quiz-app",
      level: "intermediate",
    },
    {
      title: "GIF App",
      description:
        "A dynamic web application for discovering and sharing GIFs, built with React, TypeScript, and Vite. This project demonstrates modern frontend development practices and integration with third-party APIs.",
      githubUrl: "https://github.com/rajanijha50/gif-app",
      level: "intermediate",
    },
    {
      title: "Weather App",
      description:
        "Built using React and Vite. Provides users with current weather information and forecasts based on city search or current location.",
      githubUrl: "https://github.com/rajanijha50/weather-app",
      level: "intermediate",
    },
    {
      title: "Todo App",
      description:
        "A full-stack Todo application designed to demonstrate modern web development practices. This project is split into a client-side frontend and a server-side backend.",
      githubUrl: "https://github.com/rajanijha50/todo-app",
      level: "intermediate",
    },
    {
      title: "Unit Converter",
      description:
        "A simple unit converter built with HTML, CSS, and JavaScript. This project demonstrates basic web development concepts and the use of the browser's local storage to store converted units.",
      githubUrl: "https://github.com/rajanijha50/unit-converter",
      level: "basic",
    },
    {
      title: "URL shortner",
      description:
        "A URL shortening service built with HTML, CSS, and JavaScript. This project demonstrates basic web development concepts and the use of the browser's local storage to store shortened URLs.",
      githubUrl: "https://github.com/rajanijha50",
      level: "basic",
    },
    {
      title: "Password Generator",
      description:
        "A simple password generator built with HTML, CSS, and JavaScript. This project demonstrates basic web development concepts and the use of the browser's crypto API to generate random passwords.",
      githubUrl: "https://github.com/rajanijha50",
      level: "basic",
    },
    {
      title: "QR-code Generator",
      description:
        "A simple QR code generator built with HTML, CSS, and JavaScript. This project demonstrates basic web development concepts and the use of the browser's canvas API to generate QR codes.",
      githubUrl: "https://github.com/rajanijha50",
      level: "basic",
    },
  ];

  const certificates: Certificate[] = [
    
    {
      name: "GUVI Full Stack Development Course",
      description:
        "Completed a comprehensive full-stack development self-paced learning program at GUVI, covering various technologies and tools used in modern web development.",
    },
    {
      name: "GUVI Full Stack Development Internship",
      description:
        "Completed a full-stack development virtual internship at GUVI, gaining hands-on experience in building modern web applications.",
    },
  ];

  return (
    <main className="font-poppins min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-all duration-300 ease-in-out">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 space-y-24 pb-24">
        <Hero />
        <SkillCard SkillData={skills} />
        <ProjectCard ProjectData={projects} />
        <CertificateCard CertificateData={certificates} />
        <ContactMe />
        <Footer/>
      </div>
    </main>
  );
}
