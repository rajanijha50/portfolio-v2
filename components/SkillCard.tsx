"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

type Skill = {
  name: string;
  category: string;
  level: number;
  url?: string;
  icon: React.ReactNode;
};

const SkillCard = ({ SkillData }: { SkillData: Skill[] }) => {
  // Group skills by category
  const categories = Array.from(new Set(SkillData.map((s) => s.category)));
  const [currentSkills, setCurrentSkills] = useState(
    SkillData.filter((s) => s.category === categories[0]),
  );

  const handleCategoryChange = (category: string) => {
    setCurrentSkills(SkillData.filter((s) => s.category === category));
  };

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Skills & Technologies
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-12 flex flex-col">
        <div className="flex flex-1 flex-wrap space-x-2 justify-center items-center">
          {categories.map((category, catIdx) => (
            <h3
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`text-md font-semibold mb-6 capitalize text-muted-foreground border border-border px-3 py-2 rounded-full inline-block cursor-default hover:bg-primary/10 transition-all duration-200 hover:scale-105 ${currentSkills[catIdx]?.category === category ? "bg-primary/10" : ""}`}
            >
              {category}
            </h3>
          ))}
        </div>
          <div className="md:w-4/5 flex justify-center flex-wrap gap-4 mx-auto">
            {currentSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: (idx % 5) * 0.05 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)",
                }}
                className="group bg-card px-4 py-3 rounded-xl border border-border flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors cursor-default"
              >
                <div className="text-xl text-primary/70 group-hover:text-primary transition-colors flex items-center justify-center">
                  {skill.icon}
                </div>
                <span className="font-medium capitalize">{skill.name}</span>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default SkillCard;
