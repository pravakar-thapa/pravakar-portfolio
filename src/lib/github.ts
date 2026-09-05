import {
  CONTROL_TOPICS,
  GITHUB_TOPICS,
  SKIP_REPOS,
  profile,
  projectEnrichment,
} from "@/lib/portfolio";
import { formatTopic, titleFromSlug } from "@/lib/utils";

export type GithubRepo = {
  id: number;
  name: string;
  fork: boolean;
  private: boolean;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  topics?: string[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  live: string;
  github: string;
  stars: number;
  forks: number;
  updatedAt: string | null;
  language: string | null;
  topics: string[];
  featured: boolean;
  number: string;
  source: "github" | "fallback";
  preview: string;
};

export const GITHUB_REPOS_URL = `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=updated&type=owner`;
export const CACHE_KEY = `gh-repos:${profile.githubUser}:v1`;
export const CACHE_TTL_MS = 30 * 60 * 1000;

function previewFor(slug: string) {
  return `https://opengraph.githubassets.com/1/${profile.githubUser}/${slug}`;
}

function withPreview(project: Project): Project {
  return project.preview ? project : { ...project, preview: previewFor(project.slug) };
}

export function normalizeRepo(repo: GithubRepo): Project {
  const slug = repo.name;
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  const extra = projectEnrichment[slug] ?? {};
  const topicTech = topics
    .filter((topic) => !CONTROL_TOPICS.has(topic))
    .map(formatTopic);

  return {
    id: repo.id ? `gh-${repo.id}` : slug,
    slug,
    title: extra.title || titleFromSlug(slug),
    description:
      extra.description || repo.description || "Public repository from GitHub.",
    tech:
      extra.tech && extra.tech.length
        ? extra.tech
        : topicTech.length
          ? topicTech
          : repo.language
            ? [repo.language]
            : [],
    features: extra.features ?? [],
    live: extra.live || repo.homepage || "",
    github: repo.html_url || `https://github.com/${profile.githubUser}/${slug}`,
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    updatedAt: repo.updated_at || null,
    language: repo.language || null,
    topics,
    featured: Boolean(extra.featured || topics.includes(GITHUB_TOPICS.featured)),
    number: extra.number || "",
    source: "github",
    preview: previewFor(slug),
  };
}

export function shouldInclude(repo: GithubRepo) {
  if (!repo || repo.fork || repo.private) return false;
  if (SKIP_REPOS.has(repo.name)) return false;
  const topics = repo.topics || [];
  if (topics.includes(GITHUB_TOPICS.hidden)) return false;
  return true;
}

export function fallbackProjects(): Project[] {
  return Object.entries(projectEnrichment).map(([slug, data]) =>
    withPreview({
      id: slug,
      slug,
      title: data.title || titleFromSlug(slug),
      description: data.description || "Public repository from GitHub.",
      tech: data.tech ?? [],
      features: data.features ?? [],
      live: data.live ?? "",
      github: `https://github.com/${profile.githubUser}/${slug}`,
      stars: 0,
      forks: 0,
      updatedAt: null,
      language: null,
      topics: [GITHUB_TOPICS.include],
      featured: Boolean(data.featured),
      number: data.number || "",
      source: "fallback",
      preview: previewFor(slug),
    }),
  );
}

export function mergeProjects(fromGithub: Project[]) {
  const bySlug = new Map(fromGithub.map((project) => [project.slug, project]));

  for (const project of fallbackProjects()) {
    if (!bySlug.has(project.slug)) {
      bySlug.set(project.slug, project);
    }
  }

  const all = Array.from(bySlug.values()).map(withPreview);
  const featured = all
    .filter((project) => project.featured)
    .sort((a, b) => String(a.number).localeCompare(String(b.number)));
  const rest = all
    .filter((project) => !project.featured)
    .sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });

  return { featured, rest, all: [...featured, ...rest] };
}

export function collectTopics(projects: Project[]) {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const topic of project.topics) {
      if (CONTROL_TOPICS.has(topic)) continue;
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([topic]) => topic);
}
