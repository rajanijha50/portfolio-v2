"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { SiGithub } from "react-icons/si";
import { FiExternalLink, FiCalendar, FiZap, FiAward } from "react-icons/fi";

type DayData = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ApiResponse = {
  username: string;
  totalContributions: number;
  contributions: DayData[];
};

// Heatmap colors for levels 0 to 4 using the red palette from globals.css (--primary)
const levelColorClasses = {
  0: "bg-muted/40 border border-border/20",
  1: "bg-primary/20 border border-primary/30",
  2: "bg-primary/50 border border-primary/60",
  3: "bg-primary/80",
  4: "bg-primary shadow-[0_0_8px_rgba(255,0,0,0.5)]",
};

export default function GithubHeatmap() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);

  const username = "rajanijha50";
  const githubProfileUrl =
    process.env.NEXT_PUBLIC_GITHUB || `https://github.com/${username}`;

  useEffect(() => {
    async function loadContributions() {
      try {
        setLoading(true);
        const res = await fetch(`/api/contributions?username=${username}`);
        if (!res.ok) throw new Error("Failed to load GitHub activity");
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error fetching activity");
      } finally {
        setLoading(false);
      }
    }
    loadContributions();
  }, [username]);

  // Organize days into 7-day columns (weeks) and compute stats
  const { weeks, monthLabels, stats } = useMemo(() => {
    if (!data?.contributions?.length) {
      return {
        weeks: [],
        monthLabels: [],
        stats: { total: 0, streak: 0, maxDay: 0 },
      };
    }

    const weeksList: DayData[][] = [];
    let currentWeek: DayData[] = [];
    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = "";
    let currentStreak = 0;
    let maxStreak = 0;
    let maxDayCount = 0;

    data.contributions.forEach((day, index) => {
      // Calculate active streaks and highest volume day
      if (day.count > 0) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
      if (day.count > maxDayCount) maxDayCount = day.count;

      const dateObj = new Date(day.date);
      const monthName = dateObj.toLocaleString("en-US", { month: "short" });

      if (monthName !== lastMonth) {
        months.push({ label: monthName, weekIndex: weeksList.length });
        lastMonth = monthName;
      }

      currentWeek.push(day);
      if (currentWeek.length === 7 || index === data.contributions.length - 1) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    });

    return {
      weeks: weeksList,
      monthLabels: months,
      stats: {
        total: data.totalContributions,
        streak: maxStreak,
        maxDay: maxDayCount,
      },
    };
  }, [data]);

  return (
    <section id="activity" className="py-20 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <SiGithub className="text-primary text-3xl md:text-4xl" />
          GitHub Activity
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm md:text-base">
          A live snapshot of my open-source commits, pull requests, and repository contributions over the last year.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Metric summary badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card/70 backdrop-blur-sm border border-border p-4 rounded-xl flex items-center gap-4"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <FiCalendar className="text-xl" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Total Contributions
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats.total}
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card/70 backdrop-blur-sm border border-border p-4 rounded-xl flex items-center gap-4"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <FiZap className="text-xl" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Best Streak
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {loading ? "..." : `${stats.streak} days`}
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-card/70 backdrop-blur-sm border border-border p-4 rounded-xl flex items-center gap-4"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <FiAward className="text-xl" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Max Day Output
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {loading ? "..." : `${stats.maxDay} contributions`}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Heatmap Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden"
        >
          {loading ? (
            <div className="h-44 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <p className="text-xs text-muted-foreground">Fetching GitHub contributions...</p>
            </div>
          ) : error ? (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4">
              <p className="text-destructive text-sm font-medium mb-2">{error}</p>
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary underline inline-flex items-center gap-1"
              >
                View profile directly on GitHub <FiExternalLink />
              </a>
            </div>
          ) : (
            <div>
              {/* Tooltip & Profile Indicator Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-border/50 text-xs">
                <span className="text-muted-foreground font-medium transition-all duration-300 ">
                  {hoveredDay ? (
                    <span className="text-foreground font-semibold ">
                      {hoveredDay.count} contribution{hoveredDay.count !== 1 ? "s" : ""} on{" "}
                      {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  ) : (
                    "Hover over cells for activity details"
                  )}
                </span>
                <a
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1 font-medium transition-colors"
                >
                  @{username} <FiExternalLink className="text-xs" />
                </a>
              </div>

              {/* Scrollable Heatmap Grid */}
              <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20">
                <div className="min-w-[760px]">
                  {/* Month labels */}
                  <div className="flex text-[11px] text-muted-foreground font-medium mb-1.5 pl-6 relative h-4">
                    {monthLabels.map((m, i) => (
                      <span
                        key={`${m.label}-${i}`}
                        className="absolute select-none"
                        style={{ left: `${m.weekIndex * 14 + 24}px` }}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>

                  {/* Day labels + Week Columns */}
                  <div className="flex gap-1">
                    <div className="flex flex-col justify-between text-[9px] text-muted-foreground pr-2 py-0.5 select-none w-5 leading-none">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>

                    <div className="flex gap-[3px]">
                      {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {week.map((day) => (
                            <div
                              key={day.date}
                              onMouseEnter={() => setHoveredDay(day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              className={`w-3 h-3 rounded-[2.5px] cursor-pointer transition-all duration-150 hover:scale-125 ${
                                levelColorClasses[day.level]
                              }`}
                              title={`${day.count} contributions on ${day.date}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend Footer */}
                  <div className="flex items-center justify-end gap-2 mt-4 text-[11px] text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-[3px] items-center">
                      <div className={`w-3 h-3 rounded-[2px] ${levelColorClasses[0]}`} />
                      <div className={`w-3 h-3 rounded-[2px] ${levelColorClasses[1]}`} />
                      <div className={`w-3 h-3 rounded-[2px] ${levelColorClasses[2]}`} />
                      <div className={`w-3 h-3 rounded-[2px] ${levelColorClasses[3]}`} />
                      <div className={`w-3 h-3 rounded-[2px] ${levelColorClasses[4]}`} />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
