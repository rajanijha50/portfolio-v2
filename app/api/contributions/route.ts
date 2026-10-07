import { NextResponse } from "next/server";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionResponse {
  username: string;
  totalContributions: number;
  contributions: ContributionDay[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "rajanijha50";
  const token = process.env.GITHUB_TOKEN;

  // 1. If GITHUB_TOKEN is available, query the official GitHub GraphQL API
  if (token) {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `;

      const ghRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Next.js-Portfolio",
        },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 86400 }, // Cache response for 24 hours
      });

      if (ghRes.ok) {
        const data = await ghRes.json();
        const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          const days: ContributionDay[] = [];
          const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
          };

          for (const week of calendar.weeks) {
            for (const day of week.contributionDays) {
              days.push({
                date: day.date,
                count: day.contributionCount,
                level: levelMap[day.contributionLevel] ?? 0,
              });
            }
          }

          return NextResponse.json({
            username,
            totalContributions: calendar.totalContributions,
            contributions: days,
          });
        }
      } else {
        console.warn(`GitHub GraphQL returned status: ${ghRes.status}`);
      }
    } catch (err) {
      console.warn("GitHub GraphQL fetch error, falling back to public endpoint:", err);
    }
  }

  // 2. Fallback: Community-maintained contribution API (Zero configuration required)
  try {
    const publicRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 } }
    );

    if (!publicRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch contribution data (${publicRes.status})` },
        { status: publicRes.status }
      );
    }

    const data = await publicRes.json();
    const contributions: ContributionDay[] = (data.contributions || []).map(
      (c: { date: string; count: number; level: number }) => ({
        date: c.date,
        count: c.count,
        level: Math.min(Math.max(c.level, 0), 4) as 0 | 1 | 2 | 3 | 4,
      })
    );

    return NextResponse.json({
      username,
      totalContributions:
        data.total?.lastYear ?? contributions.reduce((acc, c) => acc + c.count, 0),
      contributions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal error while fetching contribution data" },
      { status: 500 }
    );
  }
}
