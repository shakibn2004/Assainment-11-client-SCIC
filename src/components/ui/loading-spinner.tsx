"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export function LoadingSpinner({ message = "Consulting Agentic AI...", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
        {/* Pulsing Outer Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Outer Rotating Dash Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 dark:border-primary/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner Counter-Rotating Gradient Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-t-primary border-r-transparent border-b-primary/40 border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pulsing Core Icon */}
        <motion.div
          className="relative z-10 w-12 h-12 rounded-full bg-background dark:bg-card border border-border flex items-center justify-center shadow-md"
          animate={{
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Compass className="w-6 h-6 text-primary animate-pulse" />
        </motion.div>
      </div>

      {/* Pulsing Status Message */}
      <motion.p
        className="text-sm font-semibold text-muted-foreground tracking-wider uppercase"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {message}
      </motion.p>
    </div>
  );
}
