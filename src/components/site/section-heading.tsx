import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  id?: string;
  className?: string;
  aside?: ReactNode;
};

export function SectionHeading({
  index,
  label,
  title,
  id,
  className,
  aside,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-primary">
          {index} / {label}
        </p>
        <h2
          id={id}
          className="font-serif text-3xl leading-tight tracking-tight text-fg md:text-5xl"
        >
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
