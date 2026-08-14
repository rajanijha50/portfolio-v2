import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rajani Ranjan Jha | Portfolio",
    short_name: "RRJ Portfolio",
    description:
      "Portfolio of Rajani Ranjan Jha, a Full Stack Developer and IIT Patna graduate specializing in modern web technologies, AI, and product engineering.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
