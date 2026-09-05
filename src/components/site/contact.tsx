import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { Reveal } from "@/components/site/reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border py-24 text-center md:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="page-wrap">
        <Reveal>
          <p className="mb-4 font-mono text-xs font-medium tracking-[0.18em] text-primary">
            07 / Get in touch
          </p>
          <h2
            id="contact-heading"
            className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-tight text-fg"
          >
            Let's build something.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-fg-muted md:text-lg">
            I'm open to software development opportunities and interesting
            projects. Feel free to reach out.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex min-h-11 items-center border-b border-border pb-1 text-lg font-medium text-fg transition-colors duration-150 hover:border-primary hover:text-primary"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-fg-muted">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 hover:text-fg"
            >
              GitHub
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 hover:text-fg"
            >
              LinkedIn
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
