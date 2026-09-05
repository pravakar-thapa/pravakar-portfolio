import { profile } from "@/lib/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="page-wrap flex items-center justify-between gap-4 py-6 text-xs text-fg-subtle">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="min-h-11 inline-flex items-center hover:text-fg">
          Back to top
        </a>
      </div>
    </footer>
  );
}
