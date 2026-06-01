"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
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
};

export function MotionTile({ children, className = "" }: MotionTileProps) {
  return (
    <motion.article
      variants={tileVariants}
      whileHover="hover"
      whileTap={{ scale: 1.01 }}
      className={`relative overflow-hidden rounded-2xl border border-accent/20 bg-bg-card ${className}`}
    >
      <motion.div
        variants={borderGlowVariants}
        className="pointer-events-none absolute inset-0 rounded-2xl border border-accent"
      />
      <div className="relative z-10">{children}</div>
    </motion.article>
  );
}
