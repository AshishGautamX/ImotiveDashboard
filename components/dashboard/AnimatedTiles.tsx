"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

type AnimatedTilesProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedTiles({ children, className = "" }: AnimatedTilesProps) {
  return (
    <motion.section
      aria-label="Dashboard tiles"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.section>
  );
}
