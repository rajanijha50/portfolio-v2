import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://rajanijha50.vercel.app"),

  title: {
    default: "Rajani Ranjan Jha | Portfolio",
    template: "%s | Rajani Ranjan Jha",
  },

  description:
    "Portfolio of Rajani Ranjan Jha, Software Developer at IIT Patna specializing in Full Stack Development, AI, and modern web technologies.",

  keywords: [
    "Rajani Ranjan Jha",
    "Portfolio",
    "Software Developer",
    "Full Stack Developer",
    "AI Developer",
    "IIT Patna",
    "Next.js",
    "React",
    "TypeScript",
  ],

  authors: [{ name: "Rajani Ranjan Jha" }],
  creator: "Rajani Ranjan Jha",

  openGraph: {
    title: "Rajani Ranjan Jha | Portfolio",
    description:
      "Explore my portfolio showcasing projects, skills, and experience in Full Stack Development and AI.",
    url: "https://rajanijha50.vercel.app",
    siteName: "Rajani Ranjan Jha | Portfolio",
    images: [
      {
        url: "/rajani-og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Rajani Ranjan Jha Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajani Ranjan Jha | Portfolio",
    description:
      "Explore my portfolio showcasing projects, skills, and experience in Full Stack Development and AI.",
    images: ["/rajani-og-image.jpg"],
    creator: process.env.NEXT_PUBLIC_TWITTER, // Remove or replace if you don't use X
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={poppins.className}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
