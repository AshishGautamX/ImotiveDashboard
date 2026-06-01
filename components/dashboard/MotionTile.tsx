"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
    },
  },
  hover: {
    scale: 1.015,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const borderGlowVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

type MotionTileProps = {
  children: ReactNode;
  className?: string;
  background?: ReactNode;
};

export function MotionTile({ children, className = "", background }: MotionTileProps) {
  return (
    <motion.article
      variants={tileVariants}
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-xl shadow-lg transition-colors hover:bg-white/[0.03] ${className}`}
    >
      {background}
      <motion.div
        variants={borderGlowVariants}
        className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_24px_rgba(139,92,246,0.15)] ring-1 ring-accent/40"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.article>
  );
}
