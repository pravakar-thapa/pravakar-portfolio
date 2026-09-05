import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { Achievements } from "@/components/site/achievements";
import { Experience } from "@/components/site/experience";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-fg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
