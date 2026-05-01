"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children as any}
      </motion.div>
    </AnimatePresence>
  );
}

export function StepTransition({
  step,
  children,
  direction = 1,
}: {
  step: number;
  children: ReactNode;
  direction?: number;
}) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        initial={{ opacity: 0, x: direction * 32 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction * -32 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children as any}
      </motion.div>
    </AnimatePresence>
  );
}

// Legacy alias kept for layout.tsx
export function FormWrapper({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
