import { skillGroups } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="page-wrap">
        <SectionHeading
          index="02"
          label="Technical skills"
          title="Technologies I work with."
          id="skills-heading"
        />

        <Reveal className="grid overflow-hidden rounded-xl shadow-[var(--shadow-border)] sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="border-b border-border bg-bg p-6 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <h3 className="mb-4 text-sm font-medium text-fg">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
