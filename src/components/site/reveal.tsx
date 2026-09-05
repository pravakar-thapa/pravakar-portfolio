import { motion, type HTMLMotionProps } from "framer-motion";
import { easeOut } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay,
        ease: easeOut,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
