import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { easeOut } from "@/lib/motion";
import { Button } from "@/components/ui/button";

const stack = ["React.js", "Node.js", "Express.js", "MongoDB"];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: easeOut },
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-fg)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-fg)_5%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_92%)] opacity-40"
      />

      <div className="page-wrap relative grid items-center gap-10 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] md:gap-14 md:py-20 lg:min-h-[calc(100svh-4.5rem)]">
        <div>
          <motion.p
            className="mb-5 font-mono text-xs font-medium tracking-[0.2em] text-primary"
            {...fade(0)}
          >
            Software Developer
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="font-serif text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.94] tracking-tight text-fg"
            {...fade(0.08)}
          >
            Hi, I'm{" "}
            <em className="italic text-fg-muted">{profile.name}</em>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
            {...fade(0.16)}
          >
            I build full-stack web applications and user-focused solutions using
            React.js, Node.js, Express.js and MongoDB.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-3" {...fade(0.24)}>
            <Button asChild>
              <a href="#projects">
                View my work
                <ArrowDownRight />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ArrowUpRight />
              </a>
            </Button>
          </motion.div>

          <motion.p
            className="mt-8 flex items-center gap-2 text-sm text-fg-subtle"
            {...fade(0.32)}
          >
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </motion.p>
        </div>

        <motion.aside
          className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] md:p-8"
          aria-label="Current focus"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
        >
          <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle">
            Now
          </p>
          <p className="mt-3 font-serif text-2xl leading-snug text-fg">
            Shipping practical full-stack products.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
              <dt className="text-fg-subtle">Stack</dt>
              <dd className="text-right text-fg">{stack.join(" · ")}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
              <dt className="text-fg-subtle">Focus</dt>
              <dd className="text-right text-fg">APIs, auth, RBAC</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
              <dt className="text-fg-subtle">Open to</dt>
              <dd className="text-right text-fg">Software roles</dd>
            </div>
          </dl>
        </motion.aside>
      </div>
    </section>
  );
}
