import { education, experience } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="page-wrap">
        <SectionHeading
          index="05"
          label="Experience"
          title="My experience."
          id="experience-heading"
        />

        <Reveal className="grid gap-8 border-t border-border py-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          <div>
            <h3 className="font-serif text-2xl text-fg">{experience.role}</h3>
            <p className="mt-2 text-sm text-fg-subtle">{experience.type}</p>
          </div>
          <ul className="space-y-4 text-fg-muted">
            {experience.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div id="education" className="scroll-mt-24">
          <SectionHeading
            index="06"
            label="Education"
            title="Education."
            className="mb-0 mt-8"
          />
          <Reveal className="mt-10 flex flex-col justify-between gap-4 border-t border-border py-10 sm:flex-row sm:items-start">
            <div>
              <h3 className="font-serif text-2xl text-fg">{education.degree}</h3>
              <p className="mt-2 text-fg-muted">{education.institution}</p>
              <p className="text-fg-muted">{education.university}</p>
            </div>
            <span className="font-mono text-sm text-fg-subtle">
              {education.year}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
