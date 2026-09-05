import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200",
        scrolled || open
          ? "border-border bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="page-wrap flex h-16 items-center justify-between md:h-[4.5rem]">
        <a
          href="#top"
          className="font-serif text-xl tracking-tight text-fg"
          aria-label="Back to top"
        >
          {profile.shortName}
          <span className="text-primary">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors duration-150",
                active === link.href
                  ? "text-fg"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Contact</a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={open ? "close" : "open"}
                initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="inline-flex"
              >
                {open ? <X /> : <Menu />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-border bg-bg md:hidden"
        >
          <div className="page-wrap flex flex-col py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "flex min-h-11 items-center text-base",
                  active === link.href ? "text-fg" : "text-fg-muted",
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
