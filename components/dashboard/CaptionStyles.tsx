"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const CAPTION_STYLES = [
  {
    id: "vibrant-yellow",
    name: "Yellow Pop",
    description: "Big, bold and attention-grabbing",
    style: {
      color: "#FFD700",
      textShadow: "4px 4px 0px #000",
      fontWeight: "900",
      textTransform: "uppercase" as const,
      fontFamily: "Inter, sans-serif",
    },
    animation: {
      initial: { scale: 0.5, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  },
  {
    id: "neon-glow",
    name: "Cyber Neon",
    description: "Futuristic glow with neon accents",
    style: {
      color: "#fff",
      textShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF",
      fontWeight: "700",
      fontFamily: "monospace",
    },
    animation: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.3 }
    }
  },
  {
    id: "classic-white",
    name: "Classic",
    description: "Clean, professional white text",
    style: {
      color: "#FFFFFF",
      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
      fontWeight: "600",
      fontFamily: "Inter, sans-serif",
    },
    animation: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 }
    }
  },
  {
    id: "retro-block",
    name: "Retro Block",
    description: "3D block style with deep shadows",
    style: {
      color: "#FFFFFF",
      textShadow: "1px 1px #000, 2px 2px #000, 3px 3px #000, 4px 4px #000",
      fontWeight: "800",
      textTransform: "uppercase" as const,
    },
    animation: {
      initial: { scale: 1.5, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.2 }
    }
  },
  {
    id: "minimal-modern",
    name: "Minimal",
    description: "Sleek and thin modern typography",
    style: {
      color: "#FFFFFF",
      letterSpacing: "0.2em",
      fontWeight: "300",
      textTransform: "lowercase" as const,
    },
    animation: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8 }
    }
  },
  {
    id: "gradient-pulse",
    name: "Graident Pulse",
    description: "Animated colorful gradient text",
    style: {
      background: "linear-gradient(to right, #f472b6, #818cf8, #34d399)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "800",
    },
    animation: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 }
    }
  }
];

interface CaptionPreviewProps {
  styleId: string;
  text?: string;
  className?: string;
}

export function CaptionPreview({ styleId, text = "Amazing AI Video!", className }: CaptionPreviewProps) {
  const selectedStyle = CAPTION_STYLES.find(s => s.id === styleId) || CAPTION_STYLES[0];
  const [key, setKey] = useState(0);

  // Re-trigger animation periodically for preview
  useEffect(() => {
    const timer = setInterval(() => {
      setKey(prev => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={selectedStyle.animation.initial}
          animate={selectedStyle.animation.animate}
          exit={{ opacity: 0 }}
          transition={selectedStyle.animation.transition as any}
          style={selectedStyle.style as any}
          className="text-center text-2xl px-4 select-none drop-shadow-lg"
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
