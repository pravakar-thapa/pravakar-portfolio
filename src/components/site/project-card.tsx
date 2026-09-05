import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import type { Project } from "@/lib/github";
import { easeOut } from "@/lib/motion";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: Project;
  index?: number;
  featured?: boolean;
};

function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="relative flex min-h-44 flex-col justify-between overflow-hidden bg-elevated p-5 md:min-h-52 md:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-fg)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-fg)_6%,transparent)_1px,transparent_1px)] bg-[size:28px_28px] opacity-50"
      />
      <p className="relative font-mono text-xs tracking-[0.16em] text-primary">
        {project.language || "Repository"}
      </p>
      <div className="relative">
        <p className="font-serif text-2xl leading-tight tracking-tight text-fg md:text-3xl">
          {project.slug}
        </p>
        {project.live ? (
          <p className="mt-2 truncate text-xs text-fg-subtle">
            {project.live.replace(/^https:\/\//, "")}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
  featured = false,
}: ProjectCardProps) {
  const topics = project.topics.filter(
    (topic) => topic !== "featured" && topic !== "portfolio" && topic !== "hidden",
  );

  return (
    <motion.article
      className={
        featured
          ? "grid overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] lg:grid-cols-2"
          : "flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
      }
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: easeOut }}
    >
      <ProjectCover project={project} />

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between gap-3 font-mono text-xs tracking-[0.14em] text-fg-subtle">
          <span>
            {featured
              ? `Featured${project.number ? ` · ${project.number}` : ""}`
              : project.language || "Project"}
          </span>
          {project.updatedAt ? (
            <span>Updated {formatDate(project.updatedAt)}</span>
          ) : null}
        </div>

        <h3 className="font-serif text-2xl tracking-tight text-fg md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted md:text-base">
          {project.description}
        </p>

        {project.features.length > 0 ? (
          <ul className="mt-5 space-y-1.5 text-sm text-fg-muted">
            {project.features.slice(0, featured ? 6 : 4).map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="text-fg-subtle" aria-hidden="true">
                  →
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {project.tech.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        ) : null}

        {topics.length > 0 ? (
          <p className="mt-3 font-mono text-xs tracking-wide text-fg-subtle">
            Topics · {topics.join(" · ")}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <p className="flex items-center gap-3 text-xs text-fg-subtle tabular-nums">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" aria-hidden="true" />
              {project.stars}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork className="size-3.5" aria-hidden="true" />
              {project.forks}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {project.live ? (
              <Button asChild size="sm">
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  Live demo
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}
            <Button asChild variant="outline" size="sm">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                Source
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
