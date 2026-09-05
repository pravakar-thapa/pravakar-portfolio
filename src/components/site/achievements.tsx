import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { achievements } from "@/lib/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

function CountUp({
  value,
  suffix,
}: {
  value: number | string;
  suffix: string;
}) {
  const reduce = useReducedMotion();
  const animate = typeof value === "number" && value <= 100 && !reduce;
  const [display, setDisplay] = useState<number | string>(animate ? 0 : value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!animate || typeof value !== "number") return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animate, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="achievements-heading"
    >
      <div className="page-wrap">
        <SectionHeading
          index="04"
          label="Achievements"
          title="What I've accomplished."
          id="achievements-heading"
        />

        <Reveal className="grid overflow-hidden rounded-xl shadow-[var(--shadow-border)] sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item) => (
            <div
              key={item.label}
              className="border-b border-border bg-bg p-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="font-serif text-4xl tracking-tight text-fg">
                <CountUp value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {item.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
