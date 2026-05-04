"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const variants = {
  up:    { hidden: { opacity: 0, y: 12,  filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
  left:  { hidden: { opacity: 0, x: -20, filter: "blur(4px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
  right: { hidden: { opacity: 0, x: 20,  filter: "blur(4px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
  none:  { hidden: { opacity: 0,         filter: "blur(4px)" }, visible: { opacity: 1,        filter: "blur(0px)" } },
};

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[direction]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ type: "spring", duration: 0.6, bounce: 0, delay }}
    >
      {children}
    </motion.div>
  );
}
