"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingElements = () => {
  const [elements, setElements] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
      
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-blue-500/20 blur-xl"
          initial={{ x: `${el.x}%`, y: `${el.y}%`, scale: 0 }}
          animate={{
            x: [`${el.x}%`, `${(el.x + 20) % 100}%`, `${el.x}%`],
            y: [`${el.y}%`, `${(el.y + 20) % 100}%`, `${el.y}%`],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: `${el.size}rem`,
            height: `${el.size}rem`,
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />
    </div>
  );
};
