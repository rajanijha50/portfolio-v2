import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { motion } from "motion/react";
export default function Footer() {
  const links = [
    {
      name: "GitHub",
      url: process.env.NEXT_PUBLIC_GITHUB,
      icon: <FaGithub className="w-5 h-5" />,
    },
    {
      name: "LeetCode",
      url: process.env.NEXT_PUBLIC_LEETCODE,
      icon: <SiLeetcode className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      url: process.env.NEXT_PUBLIC_LINKEDIN,
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    // {
    //   name: "Instagram",
    //   url: process.env.NEXT_PUBLIC_INSTAGRAM,
    //   icon: <FaInstagram className="w-5 h-5" />,
    // },
    {
      name: "Twitter",
      url: process.env.NEXT_PUBLIC_TWITTER,
      icon: <FaXTwitter className="w-5 h-5" />,
    },
    {
      name: "Email",
      url: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
      icon: <FiMail className="w-5 h-5" />,
    },
  ];
  return (
    <footer className="flex flex-col justify-center items-center gap-5">
      <div className="w-full h-20 flex justify-center items-center gap-5 text-center border-t border-border/50">
        {links.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
            title={link.name}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
      <span className="">
        &copy; {new Date().getFullYear()} - Rajani Ranjan Jha
      </span>
    </footer>
  );
}
