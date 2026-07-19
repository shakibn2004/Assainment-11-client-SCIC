"use client";

import { motion, Variants } from "framer-motion";
import { Navigation, Globe, Shield } from "lucide-react";

const features = [
  {
    title: "Smart Itineraries",
    description: "Dynamic routes that adapt to weather, budget, and local events automatically. No more rigid plans.",
    icon: <Navigation className="w-10 h-10 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderHover: "group-hover:border-cyan-500/50",
  },
  {
    title: "Global Context",
    description: "Our Agentic AI understands cultural nuances and suggests off-the-beaten-path gems you won't find anywhere else.",
    icon: <Globe className="w-10 h-10 text-indigo-400" />,
    gradient: "from-indigo-500/20 to-purple-500/20",
    borderHover: "group-hover:border-indigo-500/50",
  },
  {
    title: "Secure & Reliable",
    description: "Trusted recommendations and verified destinations for a seamless journey. We prioritize your safety.",
    icon: <Shield className="w-10 h-10 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderHover: "group-hover:border-emerald-500/50",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

export function AnimatedFeatures() {
  return (
    <div className="py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 shadow-sm backdrop-blur-sm transition-colors ${feature.borderHover}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${feature.gradient}`} />
            
            <div className="relative z-10">
              <motion.div 
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/80 backdrop-blur-md shadow-inner"
                whileHover={{ rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="mb-3 text-2xl font-bold tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
            
            {/* Ambient background glow for the card */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/20" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/20" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
