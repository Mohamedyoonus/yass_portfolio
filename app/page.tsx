import { Effects } from "@/components/effects";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { About, Contact, Experience, Footer, Marquee, Skills, Work } from "@/components/sections";
import { portfolio } from "@/data/portfolio";

const initials = portfolio.name
  .split(/\s+/)
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export default function Home() {
  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="bg-grid" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Nav logo={portfolio.logo} initials={initials} />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <Effects />
    </>
  );
}
