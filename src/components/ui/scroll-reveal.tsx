"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export type ScrollRevealVariant = 
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "fade";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  once = true,
  margin = "-80px",
  className,
  ...props
}: ScrollRevealProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? 40 : variant === "fade-down" ? -40 : 0,
      x: variant === "fade-left" ? 40 : variant === "fade-right" ? -40 : 0,
      scale: variant === "scale-up" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger container
interface ScrollRevealContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
}

export function ScrollRevealContainer({
  children,
  staggerDelay = 0.1,
  once = true,
  margin = "-80px",
  className,
  ...props
}: ScrollRevealContainerProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  duration?: number;
}

export function ScrollRevealItem({
  children,
  variant = "fade-up",
  duration = 0.5,
  className,
  ...props
}: ScrollRevealItemProps) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? 30 : variant === "fade-down" ? -30 : 0,
      x: variant === "fade-left" ? 30 : variant === "fade-right" ? -30 : 0,
      scale: variant === "scale-up" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
