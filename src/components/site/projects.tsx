import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { formatTopic } from "@/lib/utils";
import { useGithubProjects } from "@/hooks/use-github-projects";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectCard } from "@/components/site/project-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Filter = "all" | "featured" | string;

export function Projects() {
  const { featured, projects, all, topics, status, error, live } =
    useGithubProjects();
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo(() => {
    const items: { id: Filter; label: string }[] = [
      { id: "all", label: "All" },
      { id: "featured", label: "Featured" },
      ...topics.map((topic) => ({ id: topic, label: formatTopic(topic) })),
    ];
    return items;
  }, [topics]);

  const visible = useMemo(() => {
    if (filter === "all") return all;
    if (filter === "featured") return all.filter((project) => project.featured);
    return all.filter((project) => project.topics.includes(filter));
  }, [all, filter]);

  const featuredVisible = visible.filter((project) => project.featured);
  const restVisible = visible.filter((project) => !project.featured);
  const loading = status === "loading" && all.length === 0;

  return (
    <section
      id="projects"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="page-wrap">
        <SectionHeading
          index="03"
          label="Selected work"
          title="Projects I've built."
          id="projects-heading"
          aside={
            <Button asChild variant="ghost">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub profile
                <ArrowUpRight />
              </a>
            </Button>
          }
        />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-fg-muted">
            {live
              ? "Live from GitHub — new public repos appear here automatically. Add topic featured to pin, hidden to skip."
              : "Showing shipped work. GitHub sync will fill in the rest of the public repos."}
          </p>
          {live ? (
            <p className="font-mono text-xs tracking-wide text-primary">
              Synced · {all.length} repos
            </p>
          ) : null}
        </div>

        {filters.length > 2 ? (
          <div
            className="mb-10 flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Filter projects by GitHub topic"
          >
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={cn(
                  "h-11 shrink-0 rounded-full px-4 text-sm transition-colors duration-150",
                  filter === item.id
                    ? "bg-primary text-primary-fg"
                    : "bg-surface text-fg-muted shadow-[var(--shadow-border)] hover:text-fg",
                )}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2" role="status">
            <Skeleton className="h-80 rounded-xl" />
            <Skeleton className="h-80 rounded-xl" />
            <span className="sr-only">Loading repositories</span>
          </div>
        ) : null}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div layout className="space-y-5">
            {featuredVisible.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}

            {restVisible.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {restVisible.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {!loading && visible.length === 0 ? (
          <p className="text-sm text-fg-muted" role="status">
            No repositories match this topic yet.
          </p>
        ) : null}

        {status === "error" && error ? (
          <p className="mt-6 text-sm text-fg-muted" role="status">
            {error}
          </p>
        ) : null}

        {projects.length === 0 && featured.length === 0 && status === "ready" ? (
          <p className="mt-6 text-sm text-fg-muted" role="status">
            No public repositories yet. Push a project to GitHub and it will
            show up here.
          </p>
        ) : null}
      </div>
    </section>
  );
}
