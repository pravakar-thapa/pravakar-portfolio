import { useEffect, useMemo, useState } from "react";
import {
  CACHE_KEY,
  CACHE_TTL_MS,
  GITHUB_REPOS_URL,
  type GithubRepo,
  type Project,
  collectTopics,
  fallbackProjects,
  mergeProjects,
  normalizeRepo,
  shouldInclude,
} from "@/lib/github";

type Status = "idle" | "loading" | "ready" | "error";

type CacheShape = {
  savedAt: number;
  repos: GithubRepo[];
};

function readCache(): { repos: GithubRepo[]; stale: boolean } | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (!parsed?.savedAt || !Array.isArray(parsed.repos)) return null;
    return {
      repos: parsed.repos,
      stale: Date.now() - parsed.savedAt > CACHE_TTL_MS,
    };
  } catch {
    return null;
  }
}

function writeCache(repos: GithubRepo[]) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), repos }),
    );
  } catch {
    /* quota / private mode */
  }
}

function toProjects(repos: GithubRepo[]) {
  return mergeProjects(repos.filter(shouldInclude).map(normalizeRepo));
}

export function useGithubProjects() {
  const seed = useMemo(() => mergeProjects(fallbackProjects()), []);
  const [featured, setFeatured] = useState<Project[]>(seed.featured);
  const [projects, setProjects] = useState<Project[]>(seed.rest);
  const [all, setAll] = useState<Project[]>(seed.all);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    function apply(list: GithubRepo[]) {
      const merged = toProjects(list);
      setFeatured(merged.featured);
      setProjects(merged.rest);
      setAll(merged.all);
    }

    async function fetchRepos() {
      const response = await fetch(GITHUB_REPOS_URL, {
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (response.status === 403 || response.status === 429) {
        throw new Error(
          "GitHub rate limit reached. Shipped projects are still listed.",
        );
      }
      if (!response.ok) {
        throw new Error("Could not load GitHub repositories.");
      }

      const repos = (await response.json()) as GithubRepo[];
      const list = Array.isArray(repos) ? repos : [];
      writeCache(list);
      return list;
    }

    async function load() {
      const cached = readCache();
      if (cached) {
        apply(cached.repos);
        setStatus("ready");
        setError("");
        setLive(true);
        if (!cached.stale) return;
      } else {
        setStatus("loading");
      }

      try {
        const list = await fetchRepos();
        apply(list);
        setStatus("ready");
        setError("");
        setLive(true);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!cached) {
          apply([]);
          setStatus("error");
          setLive(false);
        }
        setError(
          err instanceof Error
            ? err.message
            : "Could not load GitHub repositories.",
        );
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  const topics = useMemo(() => collectTopics(all), [all]);

  return { featured, projects, all, topics, status, error, live };
}
