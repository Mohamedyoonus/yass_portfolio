import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const title = `${portfolio.name} — ${portfolio.role}`;

export const metadata: Metadata = {
  title,
  description: portfolio.bio,
  openGraph: { title, description: portfolio.bio, type: "website" },
  twitter: { card: "summary_large_image", title, description: portfolio.bio },
};

export const viewport: Viewport = {
  themeColor: "#07070d",
};

// Applies the saved theme before first paint (see docs: preventing-flash-before-hydration).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

// Without JavaScript, show everything that would otherwise animate in.
const noScriptCss = `<style>.reveal{opacity:1!important;translate:none!important}.reveal-group .project-card{opacity:1!important}</style>`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript dangerouslySetInnerHTML={{ __html: noScriptCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
